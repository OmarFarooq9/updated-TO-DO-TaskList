window.addEventListener('load', () => {
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const list_el = document.querySelector("#tasks"); // Task variable for input is declared

    // Load tasks from local storage when the page is reloaded
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Function to save tasks on local storage(save on refresh)
    function saveTasksToLocalStorage() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // This is to render tasks
    function renderTasks() {
        list_el.innerHTML = "";

        tasks.forEach(function (task, index) {
            const task_el = document.createElement('div');
            task_el.classList.add('task');
            if (task.completed) {
                task_el.classList.add('completed');
            }

            const task_content_el = document.createElement('div');
            task_content_el.classList.add('content');

            task_el.appendChild(task_content_el);

            const task_input_el = document.createElement('input');
            task_input_el.classList.add('text');
            task_input_el.type = 'text';
            task_input_el.value = task.text;
            task_input_el.setAttribute('readonly', 'readonly');

            task_content_el.appendChild(task_input_el);

            const task_actions_el = document.createElement('div');
            task_actions_el.classList.add('actions');
            
            const task_edit_el = document.createElement('button');
            task_edit_el.classList.add('edit');
            task_edit_el.innerText = 'Edit';

            const task_delete_el = document.createElement('button');
            task_delete_el.classList.add('delete');
            task_delete_el.innerText = 'Delete';

            const task_done_el = document.createElement('button');
            task_done_el.classList.add('Incomplete');
            task_done_el.innerText = task.completed ? 'Completed' : 'Incomplete'; // to set button text based on completion status

            task_actions_el.appendChild(task_edit_el);
            task_actions_el.appendChild(task_delete_el);
            task_actions_el.appendChild(task_done_el);

            task_el.appendChild(task_actions_el);

            list_el.appendChild(task_el);
        });
    }

    // Rendering of tasks
    renderTasks();

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const taskText = input.value.trim();

        if (taskText !== "") {
            const newTask = { text: taskText, completed: false };
            tasks.push(newTask);
            saveTasksToLocalStorage();
            input.value = '';
            renderTasks();
        } else {
            alert("Task cannot be empty.");
        }
    });

    // To handle edit, delete, and Done button func
    list_el.addEventListener('click', (e) => {
        const target = e.target;

        if (target.classList.contains('edit')) {
            // Handle edit action
            const task_el = target.closest('.task');
            const task_input_el = task_el.querySelector('.text');

            if (target.innerText.toLowerCase() == "edit") {
                target.innerText = "Save";
                task_input_el.removeAttribute("readonly");
                task_input_el.focus();
            } else {
                target.innerText = "Edit";
                task_input_el.setAttribute("readonly", "readonly");
                const taskIndex = Array.from(list_el.children).indexOf(task_el);
                tasks[taskIndex].text = task_input_el.value;
                saveTasksToLocalStorage();
            }
        } else if (target.classList.contains('delete')) {
            // Handle delete action
            const task_el = target.closest('.task');
            const taskIndex = Array.from(list_el.children).indexOf(task_el);
            tasks.splice(taskIndex, 1);
            saveTasksToLocalStorage();
            task_el.remove();
        } else if (target.classList.contains('Incomplete')) {
            // Handle done/undone func
            const task_el = target.closest('.task');
            const taskIndex = Array.from(list_el.children).indexOf(task_el);
            tasks[taskIndex].completed = !tasks[taskIndex].completed;
            saveTasksToLocalStorage();
            renderTasks();
        }
    });
});
