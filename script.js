document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to update Local Storage whenever tasks change
    function updateLocalStorage() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            // Only grab the task text, ignoring the "Remove" button
            tasks.push(li.firstChild.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to add a task
    function addTask(taskText = null, save = true) {
        // If no taskText passed, get it from input
        if (taskText === null) {
            taskText = taskInput.value.trim();
            if (taskText === "") {
                alert("Please enter a task.");
                return;
            }
        }

        // Create li element
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = 'remove-btn';
        removeBtn.onclick = () => {
            taskList.removeChild(li);
            updateLocalStorage();
        };

        // Append remove button to li, then li to taskList
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear input field
        taskInput.value = '';

        // Save to Local Storage if required
        if (save) {
            updateLocalStorage();
        }
    }

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // false prevents re-saving
    }

    // Load tasks on page load
    loadTasks();

    // Event listeners
    addButton.addEventListener('click', () => addTask());
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
