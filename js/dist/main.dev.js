"use strict";

var UI_Elements = {
  "task-title": document.getElementById("task-title"),
  "task-description": document.getElementById("task-description"),
  "add-task-button": document.getElementById("add-task-button"),
  "delete-task-button": document.getElementById("delete-task-button"),
  "list-of-task": document.querySelector(".list-of-task"),
  "user-task": document.querySelectorAll(".list-of-task .task"),
  "alert-box": document.querySelector(".alert-box")
}; // TODO :
// - make a function that deletes the task : DONE
// - make a function that adds the task : DONE
// - make a function that makes spaghetti code on the createElement() in addTask() clean : DONE
// - it should add the task IF both title AND description is filled : DONE
// - make an alert so that users can get informed to fill in the task title and description : DONE
// - make the alert gone when users finally fill both task title and description : DONE
// - fix the alert so it wouldn't glitch out whenever user spams : DONE -> I change the way it works
// - tasks shouldn't be deleted if refreshed : ONGOING
// - no duplicate tasks is allowed : ONGOING

function saveTask() {
  localStorage.setItem("data", UI_Elements["list-of-task"].innerHTML);
}

function loadTask() {
  UI_Elements["list-of-task"].innerHTML = localStorage.getItem("data");
}

function deleteTask() {
  UI_Elements["list-of-task"].addEventListener("click", function (e) {
    if (e.target.tagName == "BUTTON") {
      e.target.parentElement.remove();
      saveTask();
    }
  });
}

function addElements(element) {
  var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  element = document.createElement(element);
  if (option.className) element.className = option.className;
  if (option.id) element.id = option.id;
  return element;
}

function addTask(taskTitle, taskDescription) {
  var div = addElements("div", {
    className: "task"
  }),
      h2 = addElements("h2", {
    id: "title",
    "class": "title"
  }),
      p = addElements("p", {
    id: "description"
  }),
      button = addElements("button", {
    id: "delete-task-button"
  });
  button.textContent = "X";
  var checkInput = true,
      checkDuplicates = false;
  taskTitle = UI_Elements["task-title"].value;
  taskDescription = UI_Elements["task-description"].value;
  if (!(taskTitle.trim() == "" && taskDescription.trim() == "")) h2.textContent = taskTitle;
  p.textContent = taskDescription;
  div.append(h2, p, button);
  UI_Elements["list-of-task"].append(div);
  UI_Elements["alert-box"].classList.remove("show");
  if (localStorage.getItem("data").includes("<h2 id=\"title\">".concat(taskTitle, "</h2>"))) checkDuplicates = true;
  if (!checkInput) UI_Elements["alert-box"].classList.add("show");else if (checkDuplicates) {
    UI_Elements["alert-box"].classList.add("show");
    UI_Elements["alert-box"].textContent = "".concat(taskTitle, " has already been made!");
  }
  saveTask();
}

function initializeEventListener() {
  UI_Elements["add-task-button"].addEventListener("click", function () {
    addTask();
  });
}

(function main() {
  initializeEventListener();
  deleteTask();
  loadTask();
})();