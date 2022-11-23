// New Tasks
const newTaskInput = document.querySelector('#new-task');
const newTaskPriority = document.querySelector('#new-priority');
const addTaskBtn = document.querySelector('#button-addon2');

// Display tasks
const taskList = document.querySelector('#tasklist');

// New Task event listener
addTaskBtn.addEventListener('click', () => {
    const priority = newTaskPriority.parentElement.firstElementChild.textContent;
    const task = newTaskInput.value;
    const timestamp = new Date();
    const time = `${timestamp.getHours()}:${timestamp.getMinutes()}`;
    const date = `${timestamp.getDate()}/${timestamp.getMonth()}/${timestamp.getFullYear()}`
    if (task === '') {
        alert('Enter a task!');
        return;
    }
    const tasks = getTasks();
    const newTask = {
        task: task,
        time: time,
        date: date,
        priority: priority
    };
    tasks.unshift(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    DisplayTasks();
    newTaskInput.value = ''
})

// Set new Priority
newTaskPriority.addEventListener('click', (e) => {
    const target = e.target.parentElement.parentElement.parentElement.firstElementChild;
    target.textContent = e.target.textContent;
})

// Get and return tasks from localstorage
function getTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks === null) {
        tasks = [];
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    return tasks;
}

// Displays all the tasks on the tasklist
function DisplayTasks() {
    const tasks = getTasks();
    taskList.innerHTML = ''
    tasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';
        taskItem.innerHTML = `<p class="task">${task.task}</p>`;
        const timestamp = document.createElement('div');
        timestamp.className = "timestamp"
        timestamp.innerHTML = `<p class="time">${task.time}</p><p class="date">${task.date}</p>`
        taskItem.appendChild(timestamp);
        taskList.appendChild(taskItem);
   })
}

DisplayTasks()