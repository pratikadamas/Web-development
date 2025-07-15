document.addEventListener('DOMContentLoaded', function () {
    const todoinput = document.getElementById("task");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const todolist = document.getElementById("taskList");

    // Load tasks from localStorage
    let task = JSON.parse(localStorage.getItem('task')) || [];

    // Render all tasks
    task.forEach(element => renderTasks(element));

    // Add task button click
    addTaskBtn.addEventListener('click', () => {
        const getask = todoinput.value.trim();
        if (getask === "") {
            alert("Please enter a task");
            return;
        }

        const newtask = {
            id: Date.now(),
            name: getask,
            completed: false
        };

        task.push(newtask);
        storeTask();
        renderTasks(newtask); //  Show task immediately
        todoinput.value = ""; // Clear input field
    });

    // Render one task
    function renderTasks(taskObj) {
        const li = document.createElement('li');
        li.setAttribute('data-id', taskObj.id);
        li.innerHTML = `
           <span class="task-name">${taskObj.name}</span>

            <button class="delete-btn">Delete</button>
        `;

        // Delete button
        li.querySelector('.delete-btn').addEventListener('click', function () {
            li.remove();

            // Update the global array correctly
            task = task.filter(t => t.id !== taskObj.id);

            storeTask();
        });

        todolist.appendChild(li);
    }

    function storeTask() {
        localStorage.setItem("task", JSON.stringify(task));
    }
});
