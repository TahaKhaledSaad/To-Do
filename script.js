let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let remove = document.querySelector(".remove");
let tasksDiv = document.querySelector(".tasks");
let tasksCount = document.querySelector(".tasks-count span");
let tasksCompleted = document.querySelector(".tasks-completed span");
let arabicDir = document.querySelector(".rtl-dir");

// Empty Array To Store The Tasks
let arrayOfTasks = [];

// Check If There is Tasks In Local Storage --> To Keep Old Values In Local Storage
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
  // console.log(arrayOfTasks);
}

// Trigger Git Data From Local Storage Function
getDataFromLocalStorage();

// Trigger Calculate Tasks And Completed
calculateTasks();

// Trigger Arabic Dirction Function
arabicDirection();

// Click On Add Task
submit.addEventListener("click", () => {
  if (input.value == "") {
    // Alert To Enter The Task
    window.alert("ادخـِــل أســم المهمــة");
  }
  if (input.value !== "") {
    // [1] Add Task To Array Of Tasks
    addTaskToArray(input.value);
    // [2] Empty Input Field
    input.value = "";
    // [3] Focus On Field
    input.focus();
    // [4]
    calculateTasks();
  }
});

// Click On Task Element
tasksDiv.addEventListener("click", (e) => {
  // Delete Button
  if (e.target.classList.contains("del")) {
    // Remove Element -Task- From Local Storage
    deleteTaskById(e.target.parentElement.getAttribute("data-id"));
    // Remove Element -Task- From Page
    e.target.parentElement.remove();
    // Calculate Tasks
    calculateTasks();
  }
  // Task Element -Done-
  if (e.target.classList.contains("task")) {
    // Toggle Completed -Done- For The Task
    toggleStatusTaskWith(e.target.getAttribute("data-id"));
    // Toggle Done Class
    e.target.classList.toggle("done");
    // Calculate Completed
    calculateTasks();
    // For Testing
    // console.log(e.target.getAttribute("data-id"));
  }
});

// Remove All Tasks Form Page And Local Storage
remove.addEventListener("click", () => {
  // [1] Remove From Local Storage
  window.localStorage.removeItem("tasks");
  // [2] Remove From Page
  tasksDiv.innerHTML = "";
  // [3] Reload the current page
  window.location.reload();
});

// Function 1:
function addTaskToArray(taskText) {
  // [1] Task Data
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  // [2] Push Task To Array Of Tasks
  arrayOfTasks.push(task);
  // [3] Add Tasks To Page
  addElementsToPageFrom(arrayOfTasks);
  // [3] Add Tasks To Local Storage
  addDataToLocalStorageFrom(arrayOfTasks);
}

// Function 2:
function addElementsToPageFrom(arr) {
  // [1] Empty The Tasks Div --> To Keep Not Repeat
  tasksDiv.innerHTML = "";
  // [2] Looping On Array Of Tasks
  arr.forEach((task) => {
    // [2.1] Create Main Div
    let div = document.createElement("div");
    div.className = "task";
    // [2.2] Check If Task is Done
    if (task.completed == true) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    // [2.3] Create Delete Button
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));
    div.appendChild(span);
    // [2.4] Add Task To Tasks Div
    tasksDiv.appendChild(div);
  });
}

// Function 3:
function addDataToLocalStorageFrom(arr) {
  window.localStorage.setItem("tasks", JSON.stringify(arr));
}

// Function 4:
function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPageFrom(tasks);
  }
}

// Function 5:
function deleteTaskById(taskId) {
  // For Explain Only
  // for (let i = 0; i < arrayOfTasks.length; i++) {
  //   console.log(`${arrayOfTasks[i].id} === ${taskId}`);
  // }
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addDataToLocalStorageFrom(arrayOfTasks);
}

// Function 6:
function toggleStatusTaskWith(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    // Check id
    if (arrayOfTasks[i].id == taskId) {
      // Check Completed Or Not
      if (arrayOfTasks[i].completed == false) {
        // Completed -done-
        arrayOfTasks[i].completed = true;
      } else {
        // Not Completed
        arrayOfTasks[i].completed = false;
      }
    }
  }
  addDataToLocalStorageFrom(arrayOfTasks);
}

// Function 7:
function calculateTasks() {
  // [1] Calculate All Tasks
  tasksCount.innerHTML = arrayOfTasks.length; // Way [1]
  tasksCount.innerHTML = document.querySelectorAll(".task").length; // Way [2]
  // [2] Calculate Completed Tasks
  tasksCompleted.innerHTML = document.querySelectorAll(".done").length;
}

// Function 8:
function arabicDirection() {
  // [1] Check If There Is Value in Local Storage From The Past
  window.localStorage.getItem("langVar")
    ? (rtl = window.localStorage.getItem("langVar"))
    : (rtl = false);
  // [2] Click Event And Steps
  arabicDir.addEventListener("click", () => {
    rtl = !rtl;
    window.localStorage.setItem("langVar", rtl);
    if (rtl == true) {
      document.body.style.direction = "rtl";
      arabicDir.innerHTML = "عــربي";
    } else {
      document.body.style.direction = "ltr";
      arabicDir.innerHTML = "English";
    }
  });
  // [3] Retirve Value To Change rtl Mode in the Next
  if (window.localStorage.getItem("langVar") == "true") {
    document.body.style.direction = "rtl";
    arabicDir.innerHTML = "عــربي";
  } else {
    document.body.style.direction = "ltr";
    arabicDir.innerHTML = "English";
  }
}
