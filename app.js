const timeRunOut = document.getElementById('noTime');
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
    taskInput.value = "";
  } else if(taskInput.value !== "" && required.style.display != "none" && timeInput !== "") {
    required.style.display = "none";
    let taskItem = taskItemMaker(taskInput.value, Number(timeInput.value));
    taskList.appendChild(taskItem);
    taskInput.value = "";
    timeInput.value = "";
  } else if(timeInput.value === "" && taskInput !== "") {
    let taskItem = taskItemMaker(taskInput.value);
    taskList.appendChild(taskItem);
    taskInput.value = "";
  } else {
    let taskItem = taskItemMaker(taskInput.value, Number(timeInput.value));
    taskList.appendChild(taskItem);
    taskInput.value = "";
    timeInput.value = "";
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
    let options = '<input type="number" name="" id="time2" placeholder="specify time in minute"><button id="addTime" onclick="timeAdder(Number(document.getElementById(\'time2\').value), this)">add time</button> <button class="delete" onclick="deleteTask(this)">delete</button>';
    return options;
  } else {
    let options = `<span class="timer">${timeValue}:00</span>
    <button class="start" onclick="timeStart(this)">start</button>
    <button class="delete" onclick="deleteTask(this)">delete</button>`
    return options;
  }
}

function timeAdder(time2Value, id) {
  let taskItem = id.parentElement.parentElement;
  let oldOptions = id.parentElement;
  let newOptions = document.createElement('div');
  newOptions.className = "options";
  newOptions.innerHTML = optionsMaker(time2Value);
  taskItem.replaceChild(newOptions, oldOptions);
}

function timeStart(id) {
  let timer = id.previousElementSibling;
  let time = id.previousElementSibling.innerText;
  let totalMinutes, totalSeconds;
  if(time.length === 4) {
    totalMinutes = Number(time.charAt(0));
    totalSeconds = totalMinutes * 60;
  } else {
    totalMinutes = Number(time.slice(0, 2));
    totalSeconds = totalMinutes * 60;
  }
  let countDown = setInterval(function() {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    timer.innerText = `${minutes}:${seconds}`;
    if(timer.innerText === "0:30"){
      timeRunOut.style.display = "block"
      setTimeout(function(){
      timeRunOut.style.display = "none"
      }, 5000)
    } else if(timer.innerText === "0:00") {
      clearInterval(countDown);
    }
    totalSeconds--;
  }, 1000);
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