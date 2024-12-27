window.addEventListener("DOMContentLoaded", initEvents);

function initEvents() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || []; 
    const addBtn = document.querySelector("#add-task");
    const taskContent = document.querySelector("#input-task");
    const taskList = document.querySelector("#task-list");

    const addTask = (e) => {
        e.preventDefault();
        const taskText = taskContent.value.trim();
        if (taskText) {
            const task = { id: Date.now(), text: taskText }; 
            tasks.push(task); 
            createTask(task); 
            taskContent.value = ""; 
            updateList(); 
        }
    };

    
    const createTask = (task) => {
        let li = document.createElement("li");
        li.className = "task";
        li.dataset.id = task.id; 
        li.innerHTML = `
            <div id="task-content">
                <input type="checkbox">
                <p>${task.text}</p>
            </div>
            <div id="operations">
                <i class="ri-edit-line edit"></i>
                <i class="ri-delete-bin-fill delete"></i>
            </div>`;
        taskList.appendChild(li);
    };

    
    const deleteTask = (e) => {
        const taskId = e.target.closest("li").dataset.id; 
        const taskIndex = tasks.findIndex(task => task.id === taskId); 
        tasks.splice(taskIndex, 1); 
        e.target.closest("li").remove(); 
        updateList(); 
    };

    
    const editTask = (e) => {
        const taskId = e.target.closest("li").dataset.id; 
        const task = tasks.find(task => task.id == taskId); 
        taskContent.value = task.text; 
        deleteTask(e);
    };

    
    addBtn.addEventListener("click", addTask);

    
    taskList.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete")) {
            deleteTask(e);
        } else if (e.target.classList.contains("edit")) {
            editTask(e);
        }
    });

    
    const updateList = () => {
        saveTasks(); 
    };

    
    const saveTasks = () => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    
    const loadTasks = () => {
        tasks.forEach((task) => {
            createTask(task); 
        });
    };

    loadTasks();
}
