const inputText = document.getElementById("todo-input");
const taskList = document.getElementById("task-to-add");
const items = []; 

function addTask() {
    const val = inputText.value;
    if (val !== "") {
        let newLi = document.createElement("li");
        newLi.textContent = val;
        inputText.value = ""; 

        const existingItem = items.find(item => item.name === val);

        if (existingItem) {
            existingItem.count++;
        } else {
            items.push({ name: val, count: 1 });
        }

        updateTaskList();
    }
}

function processItem(removedTask) {
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
    }
    updateTaskList();
}

function updateTaskList() {
    taskList.innerHTML = ''; 
    items.forEach(item => {
        let newLi = document.createElement("li");
        newLi.textContent = `${item.name} - ${item.count}`;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "✅";

        deleteBtn.onclick = function () {
            processItem(item.name);
        };

        newLi.appendChild(deleteBtn);
        taskList.appendChild(newLi);
    });
}

