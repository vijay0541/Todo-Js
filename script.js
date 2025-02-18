const inputText = document.getElementById("todo-input");
const taskList = document.getElementById("task-to-add");
let items = []; 

// Load tasks from localStorage when the page loads or when when we open the origin in new tab
function loadTasks() {
    // Check if there are saved tasks in localStorage
    const storedItems = localStorage.getItem('tasks');
    if (storedItems) {
        // Parse the stored tasks and assign them to the 'items' array to get actual object
        items = JSON.parse(storedItems);
        // Update the task list display from local storage
        updateTaskList();
    }
}

// Save tasks to localStorage
function saveTasks() {
    // Convert the 'items' array into a string and store it in localStorage
    localStorage.setItem('tasks', JSON.stringify(items));
}

function addTask() {
    const val = inputText.value;
    if (val !== "") {
        inputText.value = ""; 
        const existingItem = items.find(item => item.name === val);
        if (existingItem) {
            existingItem.count++;
        } else {
            items.push({ name: val, count: 1 });
        }
        saveTasks();
        updateTaskList();
    }
}

function deleteItem(removedTask) {

    const existingItem = items.find(item => item.name === removedTask);

    if (existingItem) {
        if (existingItem.count >= 2) {
            existingItem.count--;
        } else {
            const index = items.findIndex(item => item.name === removedTask);
            if (index !== -1) {
                items.splice(index, 1);
            }
        }
        saveTasks(); 
    }
    updateTaskList();
}

function updateTaskList() {
    taskList.innerHTML = ''; // for re-rendering the task when update the items array
    items.forEach(item => {
        let newLi = document.createElement("li");
        newLi.textContent = `${item.name} - ${item.count}`;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "✅";

        deleteBtn.onclick = function () {
            deleteItem(item.name);
        };

        newLi.appendChild(deleteBtn);
        taskList.appendChild(newLi);
    });
}

// Call loadTasks to populate the task list when the page loads
window.onload = loadTasks;  // When the window is loaded, load tasks from localStorage
