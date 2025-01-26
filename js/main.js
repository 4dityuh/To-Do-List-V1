const UI_Elements = {
  "task-title": document.getElementById("task-title"),
  "task-description": document.getElementById("task-description"),
  "add-task-button": document.getElementById("add-task-button"),
  "delete-task-button": document.getElementById("delete-task-button"),
  "list-of-task": document.querySelector(".list-of-task"),
  "user-task": document.querySelectorAll(".list-of-task .task"),
  "alert-box": document.querySelector(".alert-box"),
};

// TODO :
// - make a function that deletes the task : DONE
// - make a function that adds the task : DONE
// - make a function that makes spaghetti code on the createElement() in addTask() clean : DONE
// - it should add the task IF both title AND description is filled : DONE
// - make an alert so that users can get informed to fill in the task title and description : DONE
// - make the alert gone when users finally fill both task title and description : DONE
// - fix the alert so it wouldn't glitch out whenever user spams : DONE -> I change the way it works
// - tasks shouldn't be deleted if refreshed : ONGOING -> NEED FIX
// - no duplicate tasks is allowed : ONGOING -> NEED FIX

function saveTask() {
  localStorage.setItem("data", UI_Elements["list-of-task"].innerHTML);
}

function loadTask() {
  UI_Elements["list-of-task"].innerHTML = localStorage.getItem("data");
}

function deleteTask() {
  UI_Elements["list-of-task"].addEventListener("click", (e) => {
    if (e.target.tagName == "BUTTON") {
      e.target.parentElement.remove();
      saveTask();
    }
  });
}

function validateTask(taskTitle, taskDescription) {
  let checkInput = taskTitle.trim() && taskDescription.trim(),
    checkDuplicate = localStorage
      .getItem("data")
      .includes(`<h2 id="title">${taskTitle}</h2>`);

  if (!checkInput) {
    showAlert("Please fill in both task title and task description!");
    return false;
  } else if (checkDuplicate) {
    showAlert(`${taskTitle} has already been made!`);
    return false;
  }

  return true;
}

function showAlert(text) {
  UI_Elements["alert-box"].textContent = text;
  UI_Elements["alert-box"].classList.add("show");
}

function addElements(element, option = {}) {
  element = document.createElement(element);
  if (option.className) element.className = option.className;
  if (option.id) element.id = option.id;
  return element;
}

function addTask(taskTitle, taskDescription) {
  let div = addElements("div", {
      className: "task",
    }),
    h2 = addElements("h2", {
      id: "title",
      class: "title",
    }),
    p = addElements("p", {
      id: "description",
    }),
    button = addElements("button", {
      id: "delete-task-button",
    });
  button.textContent = "X";

  taskTitle = UI_Elements["task-title"].value;
  taskDescription = UI_Elements["task-description"].value;

  if (validateTask(taskTitle, taskDescription)) {
    h2.textContent = taskTitle;
    p.textContent = taskDescription;
    div.append(h2, p, button);
    UI_Elements["list-of-task"].append(div);
    UI_Elements["alert-box"].classList.remove("show");
  } else validateTask(taskTitle, taskDescription);

  saveTask();
}

function initializeEventListener() {
  UI_Elements["add-task-button"].addEventListener("click", () => {
    addTask();
  });
}

(function main() {
  initializeEventListener();
  deleteTask();
  loadTask();
})();
