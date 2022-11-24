// New Tasks
const newTaskInput = document.querySelector('#new-task');
const newTaskPriority = document.querySelector('#new-priority');
const addTaskBtn = document.querySelector('#button-addon2');

// Searching
const searchBar = document.querySelector('#search');

// Display tasks
const taskList = document.querySelector('#tasklist');

// delete tag
const tagDelBtn = document.querySelector('.tags')

DisplayTasks()

// New Task event listener - add task to localStorage
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
        timestamp.innerHTML = `<p class="time">${task.time}</p><p class="date">${task.date}</p><div class="priority-div ${task.priority}">${task.priority.charAt(0)}</div>`
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
    element.disabled = true;
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

// search tags variables
const searchTags = [];
const tags = document.querySelector('.search-tags');
const selectedTagsDiv = document.querySelector('.tags');

// Search event
searchBar.addEventListener('keyup', () => {
    const searchTerm = searchBar.value;
    const listItems = document.querySelectorAll('.task-item');
    listItems.forEach(item => {
        if (!item.textContent.includes(searchTerm)) {
            item.style.display = 'none';
        } else {
            item.style.display = 'flex'
        }
    })
})

// search tags click
tags.addEventListener('click', (e) => {
    if (!searchTags.includes(e.target.textContent)) {
        searchTags.push(e.target.textContent)
    }
    checkTags()
})

// delete tags click
tagDelBtn.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-close')) {
        const delIndex = searchTags.indexOf(e.target.parentElement.textContent)
        searchTags.splice(delIndex, 1);
        checkTags()
    }
})

// display selected tags using searchTags array
function displaySelectedTags(tags) {
    selectedTagsDiv.innerHTML = ''
    tags.forEach(tag => {
        if (tag === 'Low') selectedTagsDiv.innerHTML += "<span class='badge text-bg-secondary me-1'>Low<button type='button' class='btn-close ms-2 btn-close-white' aria-label='Close'></button></span>"
        else if (tag === 'Medium') selectedTagsDiv.innerHTML += "<span class='badge text-bg-primary me-1'>Medium<button type='button' class='btn-close ms-2 btn-close-white' aria-label='Close'></button></span>"
        else selectedTagsDiv.innerHTML += "<span class='badge text-bg-danger me-1'>Top<button type='button' class='btn-close ms-2 btn-close-white' aria-label='Close'></button></span>"
    })
}

function checkTags() {
    const listItems = document.querySelectorAll('.task-item');
    displaySelectedTags(searchTags);
    if (searchTags.length === 0) {
        DisplayTasks()
        return;
    }
    listItems.forEach(item => {
        let itemTag = (item.querySelector('.timestamp').querySelector('.priority-div').textContent);
        if (itemTag === 'L') itemTag = itemTag.concat('ow');
        else if (itemTag === 'M') itemTag = itemTag.concat('edium');
        else if (itemTag === 'T') itemTag = itemTag.concat('op');
        if (!searchTags.includes(itemTag)) {
            item.style.display = 'none';
        } else item.style.display = 'flex'
    })
}
