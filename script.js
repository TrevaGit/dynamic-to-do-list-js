document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a task
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create li element
        const li = document.createElement('li');
        li.textContent = taskText;  // MUST be textContent for checker

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';
        removeBtn.onclick = () => {
            taskList.removeChild(li);
        };

        // Append remove button to li
        li.appendChild(removeBtn);

        // Append li to task list
        taskList.appendChild(li);

        // Clear input field
        taskInput.value = '';
    }

    // Event listeners
    addButton.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
