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
    if(task === '') {
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
})

// Set new Priority
newTaskPriority.addEventListener('click', (e) => {
    console.log(e.target)
    console.log(e.target.parentElement.parentElement.parentElement.firstElementChild)
    const target = e.target.parentElement.parentElement.parentElement.firstElementChild;
    target.textContent = e.target.textContent;
})

// Get and return tasks from localstorage
function getTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    if(tasks === null) {
        tasks = [];
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    return tasks;
}

function DisplayTasks() {
    const tasks = getTasks();
    
}