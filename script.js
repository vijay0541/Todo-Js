const inputText = document.getElementById("todo-input");

function addTask() {
    const val = inputText.value;
    if (val !== "") {
        let newUl = document.createElement("li");
        newUl.textContent = val;
        inputText.value = "";

        const deleteBtn = document.createElement("button");
        
        deleteBtn.textContent = "✅";

        deleteBtn.onclick = function () {
            newUl.remove();
        };
        newUl.appendChild(deleteBtn);

        let parent = document.getElementById("task-to-add");
        parent.appendChild(newUl);
    }
}
