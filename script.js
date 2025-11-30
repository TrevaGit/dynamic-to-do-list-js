document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // false = don't save again
    }

    // Add a new task
    function addTask(taskText = null, save = true) {
        // Get task text from input if not passed in
        const text = taskText !== null ? taskText : taskInput.value.trim();

        if (text === "") {
            alert("Please enter a task.");
            return;
        }

        // Create list item
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(text)); // text node instead of textContent

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';
        removeBtn.onclick = () => {
            taskList.removeChild(li);
            if (save) {
                removeFromLocalStorage(text);
            }
        };

        // Append button and list item
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Save to localStorage
        if (save) {
            const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            tasks.push(text);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        // Clear input field
        taskInput.value = '';
    }

    // Remove task from localStorage
    function removeFromLocalStorage(taskText) {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const index = tasks.indexOf(taskText);
        if (index > -1) {
            tasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }

    // Event listeners
    addButton.addEventListener('click', () => addTask());
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load tasks on page load
    loadTasks();
});
