// New Tasks
const newTaskInput = document.querySelector('#new-task');
const newTaskPriority = document.querySelector('#new-priority');
const addTaskBtn = document.querySelector('#button-addon2');

// Searching
const searchBar = document.querySelector('#search');

// Display tasks
const taskList = document.querySelector('#tasklist');

DisplayTasks()

// New Task event listener
addTaskBtn.addEventListener('click', () => {
    const priority = newTaskPriority.parentElement.firstElementChild.textContent;
    const task = newTaskInput.value;
    const timestamp = new Date();
    const time = `${timestamp.getHours()}:${timestamp.getMinutes()}`;
    const date = `${timestamp.getDate()}/${timestamp.getMonth()}/${timestamp.getFullYear()}`
    const id = timestamp.getTime()
    if (task === '') {
        alert('Enter a task!');
        return;
    }
    const tasks = getTasks();
    const newTask = {
        task: task,
        time: time,
        date: date,
        priority: priority,
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
    if (tasks.length === 0) {
        taskList.innerHTML = "<h2 class='message'>No tasks due</h2>";
        return;
    }
    taskList.innerHTML = ''
    tasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';
        taskItem.innerHTML = `<p class="task"><img src="media/delete.png" alt="delete task" class="small-icon delete-btn" onclick="deleteTask(this)"><img src="media/edit.png" alt="edit task" class="small-icon edit-btn" onclick="editTask(this)"><span class="task-span">${task.task}</span></p>`;
        const timestamp = document.createElement('div');
        timestamp.className = "timestamp"
        timestamp.innerHTML = `<p class="time">${task.time}</p><p class="date">${task.date}</p>`
        taskItem.appendChild(timestamp);
        taskList.appendChild(taskItem);
    })
}

// delete task
function deleteTask(element) {
    const tasks = getTasks();
    let deleteIndex;
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].task === element.parentElement.textContent) {
            deleteIndex = i
        }
    }
    tasks.splice(deleteIndex, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    DisplayTasks()
}


// Make task editable and update localstorage
function editTask(element) {
    const para = element.parentElement.children[2];
    const oldText = para.textContent;
    para.contentEditable = true;
    para.focus()
    const tickBtn = document.createElement('img');
    tickBtn.src = 'media/tick.png';
    tickBtn.className = 'small-icon'
    para.parentNode.insertBefore(tickBtn, para)
    tickBtn.addEventListener('click', () => {
        para.contentEditable = false;
        para.parentElement.removeChild(tickBtn)

        const tasks = getTasks();
        let index;
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].task === oldText) {
                index = i;
            }
        }
        tasks[index].task = para.textContent;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    })

}


// Search event
searchBar.addEventListener('keyup', ()=>{
    const searchTerm = searchBar.value;
    const listItems = document.querySelectorAll('.task-item');
    // if(searchTerm !== ''){
        listItems.forEach(item=>{
            if(!item.textContent.includes(searchTerm)){
                item.style.display = 'none';
            }else {
                item.style.display = 'flex'
            }
        })
    // }
})