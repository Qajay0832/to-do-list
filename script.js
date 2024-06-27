let task = document.getElementById("itemName");
let date = document.getElementById("deadline");
let priority = document.getElementById("priority");
let addBtn = document.getElementById("addItem");
let todayDiv = document.getElementById("today");
let futureDiv = document.getElementById("future");
let completedDiv = document.getElementById("completed");



let todayList = [];
let futureList = [];
let completedList = [];
window.addEventListener('load', function(){
    getLocal();
    showToDo();
});
function getLocal() {
    let todosList = JSON.parse(localStorage.getItem("todos"));
    if (todosList) {
        todayList = todosList.today;
        futureList = todosList.future;
        completedList = todosList.completed;
    }

}
function storeLocal() {
    localStorage.setItem("todos", JSON.stringify({ today: todayList, future: futureList, completed: completedList }))
}
function showToDo() {
    todayDiv.innerHTML = "";
    futureDiv.innerHTML = "";
    completedDiv.innerHTML = "";
    todayList.forEach((ele, index) => {
        todayDiv.innerHTML +=
            `<div class="todo">
    <p style="width:30%">${index + 1}.${ele.name}</p>
    <p style="width:20%">${ele.date}</p>
    <p style="width:10%">${ele.priority}</p>
    <div style="width:10%">
    <img src="./assets/Done.png" alt="Done" class="imgBtn" onclick="donetask(${index},'today')"/>
    <img src="./assets/Delete.png" alt="Delete" class="imgBtn" onclick="deletetask(${index},'today')"/>
    </div>
</div>`
    });
    futureList.forEach((ele, index) => {
        futureDiv.innerHTML +=
            `<div class="todo">
    <p style="width:30%">${index + 1}.${ele.name}</p>
    <p style="width:20%">${ele.date}</p>
    <p style="width:10%">${ele.priority}</p>
    <div style="width:10%">
    <img src="./assets/Done.png" alt="Done" class="imgBtn" onclick="donetask(${index},'future')"/>
    <img src="./assets/Delete.png" alt="Delete" class="imgBtn" onclick="deletetask(${index},'future')"/>
    </div>
</div>`
    });
    completedList.forEach((ele, index) => {
        completedDiv.innerHTML +=
            `<div class="todo">
                <p style="width:30%">${index + 1}.${ele.name}</p>
                <p style="width:20%">${ele.date}</p>
                <p style="width:10%">${ele.priority}</p>
                <div style="width:10%">
                <img src="./assets/Delete.png" alt="Delete" class="imgBtn" onclick="deletetask(${index},'completed')"/>
                </div>
            </div>`
    })
}
function byPriority(listType, tempTask) {
    if (listType.length == 0) {
        listType.push(tempTask);
    }
    else {
        for (let i = 0; i < listType.length; i++) {
            if (tempTask.priority == 'high' && (listType[i].priority == 'medium' || i == listType.length - 1)) {
                if ((i == listType.length - 1 && listType[i].priority == 'medium') || listType[i].priority == 'medium'|| listType[i].priority == 'low') {
                    listType.splice(i, 0, tempTask);
                }
                else {
                    listType.push(tempTask);
                }
                break;
            }
            else if (tempTask.priority == 'medium' && (listType[i].priority == 'low' || i == listType.length - 1)) {
                if ((i == listType.length - 1 && listType[i].priority == 'low') || listType[i].priority == 'low') {
                    listType.splice(i, 0, tempTask);
                }
                else {
                    listType.push(tempTask);
                }
                break;
            }
            else if (tempTask.priority == 'low') {
                listType.push(tempTask);
                break;
            }
        }
    }
}
function donetask(i, type) {
    if (type == "today") {
        todayList[i].completed = true;
        byPriority(completedList, todayList[i])
        todayList.splice(i, 1)
    }
    else {
        futureList[i].completed = true;
        byPriority(completedList, futureList[i])
        futureList.splice(i, 1)
    }
    storeLocal();
    showToDo();
}
function deletetask(i, type) {
    if (type == "today") {
        todayList.splice(i, 1)
    }
    else if (type == "future") {
        futureList.splice(i, 1)
    }
    else {
        completedList.splice(i, 1)
    }
    storeLocal();
    showToDo();
}
function addToDo() {
    let todayDate = new Date().toLocaleDateString();
    let taskDate = new Date(date.value).toLocaleDateString();
    if (taskDate == "Invalid Date" || !task.value) {
        alert("Please Enter All The Details")
    }
    else if (taskDate < todayDate) {
        alert("You Can not Enter past Date")
    }
    else {
        let tempTask = { name: `${task.value}`, date: `${taskDate}`, priority: `${priority.value}`, completed: false }
        if (taskDate == todayDate) {
            byPriority(todayList, tempTask);
        }
        else if (taskDate > todayDate) {
            byPriority(futureList, tempTask)
        }
    }
    storeLocal();
    showToDo();
}

addBtn.addEventListener("click", addToDo)
