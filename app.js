const taskInput = document.getElementById('taskName');
const timeInput = document.getElementById('time');
const required = document.getElementById('required');
const addTask = document.getElementById('addTask');
const taskList = document.getElementById('taskList');
const clearBtn = document.getElementById('clear');

addTask.addEventListener("click", taskAdder);

function taskAdder(){
  if(taskInput.value === "") {
    required.style.display = "block";
  } else if(taskInput.value !== "" && required.style.display !== "none" && timeInput.value === "") {   
    required.style.display = "none";
    let taskItem = taskItemMaker(taskInput.value);
    taskList.appendChild(taskItem);
  } else if(taskInput.value !== "" && required.style.display != "none" && timeInput !== "") {
    required.style.display = "none";
    let taskItem = taskItemMaker(taskInput.value, Number(timeInput.value));
    taskList.appendChild(taskItem);
  } else if(timeInput.value === "" && taskInput !== "") {
    let taskItem = taskItemMaker(taskInput.value);
    taskList.appendChild(taskItem);
  } else {
    let taskItem = taskItemMaker(taskInput.value, Number(timeInput.value));
    taskList.appendChild(taskItem);
  }
}

function taskItemMaker(taskValue, timeValue = "0") {
  let taskItemCreate = document.createElement('div');
  taskItemCreate.className = "taskItem";
  let task = document.createElement('p');
  task.className = "item";
  task.appendChild(document.createTextNode(taskValue));
  taskItemCreate.appendChild(task);
  let options = document.createElement('div');
  options.className = "options";
  options.innerHTML = optionsMaker(timeValue);
  taskItemCreate.appendChild(options);
  return taskItemCreate;
}

function optionsMaker(timeValue) {
  if(timeValue === "0") {
    let options = '<input type="number" name="" id="time2" placeholder="specify time in minute"><button id="addTime" onclick="timeAdder(document.getElementById("time2").value)">add time</button>'
    return options;
  } else {
    let options = `<span class="timer">${timeValue}:00</span>
    <button class="start" onclick="timeStart">start</button>
    <button class="delete" conclick="deleteTask(e)">delete</button>`
    return options;
  }
}

function timeAdder(time2Value) {

}

function timeStart() {

}

function deleteTask(id) {
  id.parentElement.parentElement.remove();
}

clearBtn.addEventListener('click', clearAll);
function clearAll(){
  let taskItems = document.querySelectorAll('.taskItem')
  taskItems.forEach(function(item) {
    item.remove();
  })
}