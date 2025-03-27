const inputText = document.getElementById("todo-input");
const taskList = document.getElementById("task-to-add");
let items = []; 

function loadTasks() {
    const storedItems = localStorage.getItem('tasks');
    if (storedItems) {
        items = JSON.parse(storedItems); 
        items.forEach((task, index) => {
            addItems(task.name, index); 
        });
    }
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(items));
}

function addItems(newTask, id){
    const list = document.getElementById("task-to-add");
    let newLi = document.createElement("li");
    newLi.textContent = `${newTask}`;
        
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.onclick = function () {
        deleteItem(newLi, newTask); 
    }
    newLi.appendChild(deleteBtn);
    list.appendChild(newLi);
}

function addTask() {
    const val = inputText.value;
    if (val !== "") {
        inputText.value = ""; 
        items.push({ name: val });
        saveTasks();
        addItems(val, items.length - 1); 
    }
}

function deleteItem(taskElement, taskName) {
    taskList.removeChild(taskElement);
    items = items.filter(item => item.name !== taskName); 
    saveTasks();
}

loadTasks();
