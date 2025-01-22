const objArr = JSON.parse(localStorage.getItem("tasks")) || [];

function addTask() {
    let text = document.getElementById('taskInput').value.trim();
    document.getElementById("count").textContent="";
    if (text === "") {
        alert("Task cannot be empty! Please enter a valid task.");
        return;
    }

    objArr.push({
        property: text,
        id: objArr.length + 1,
        completed: false
    });

    saveTasks();
    loadTask();
    document.getElementById('taskInput').value = "";
}

function loadTask() {
    document.getElementById("count").innerHTML="Tasks to do "+objArr.length;

    let task = document.getElementById('taskList');
    task.innerHTML = "";

    objArr.forEach((item, index) => {
        const listItem = document.createElement('li');

        const taskText = document.createElement('span');
        taskText.textContent =  item.property;
        taskText.style.textDecoration = item.completed ? 'line-through' : 'none';


        const checkImg = document.createElement('img');
        checkImg.src = item.completed ? "./img/Check.svg" : "./img/Check.svg";
        checkImg.style.width = "40px";
        checkImg.style.cursor = "pointer";

        checkImg.addEventListener('click', () => {
            item.completed = !item.completed;
            taskText.style.textDecoration = item.completed ? 'line-through' : 'none';
            checkImg.src = item.completed ? "./img/Check.svg" : "./img/Check.svg";
            const count =objArr.length;
            console.log(count);
            document.getElementById("count").innerHTML = item.completed ? "Tasks to do " + (count - 1) : "Tasks to do " + objArr.length;
            saveTasks();
        });




        const button = document.createElement('button');
        const img = document.createElement('img');
        img.src = "./img/bin.svg";
        img.style.width = "40px";
        button.appendChild(img);


        button.addEventListener('click', () => {

            deleteItem(index,listItem);


        })
        const container = document.createElement('div');
        const buttonsDiv = document.createElement("div");
        buttonsDiv.appendChild(checkImg);
        container.id = "contentText";
        container.appendChild(taskText);
        buttonsDiv.appendChild(button);
        container.appendChild(buttonsDiv);
        listItem.appendChild(container);

        task.appendChild(listItem);
    });
}



function deleteItem(index,listItem) {
    listItem.classList.add("fade");

   setTimeout(() => {
       objArr.splice(index, 1);
       saveTasks();
       loadTask();
   },500)
}

function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(objArr));


}

document.addEventListener("DOMContentLoaded", () => {
    loadTask();
});
