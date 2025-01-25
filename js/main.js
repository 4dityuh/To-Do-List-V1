const UI_Elements = {
  "task-title": document.getElementById("task-title"),
  "task-description": document.getElementById("task-description"),
  "add-task-button": document.getElementById("add-task-button"),
  "delete-task-button": document.getElementById("delete-task-button"),
  "list-of-task": document.querySelector(".list-of-task"),
  "user-task": document.querySelector(".list-of-task .task"),
  "alert-box": document.querySelector(".alert-box"),
};

// TODO :
// - make a function that deletes the task : DONE
// - make a function that adds the task : DONE
// - make a function that makes spaghetti code on the createElement() in addTask() clean : DONE
// - it should add the task IF both title AND description is filled : DONE
// - make an alert so that users can get informed to fill in the task title and description : DONE
// - make the alert gone when users finally fill both task title and description : DONE
// - tasks shouldn't be deleted if refreshed : ONGOING

// THIS IS SLOW
// let deleteTaskButtons = UI_Elements["delete-task-button"];
// for (let i = 0; i < deleteTaskButtons.length; i++) {
//   deleteTaskButtons[i].addEventListener("click", (e) => {
//     e.target.parentElement.remove();
//   });
// }

// THIS IS FASTER
function deleteTask() {
  UI_Elements["list-of-task"].addEventListener("click", (e) => {
    if (e.target.tagName == "BUTTON") {
      e.target.parentElement.remove();
    }
  });
}

// no more spaghetti code
function addElements(element, option = {}) {
  element = document.createElement(element);
  if (option.className) element.className = option.className;
  if (option.id) element.id = option.id;
  return element;
}

function addTask(taskTitle, taskDescription) {
  // needs : div, h2, p, and button
  let div = addElements("div", { className: "task" }),
    h2 = addElements("h2", { id: "title" }),
    p = addElements("p", { id: "description" }),
    button = addElements("button", { id: "delete-task-button" });
  button.textContent = "X";

  taskTitle = UI_Elements["task-title"].value;
  taskDescription = UI_Elements["task-description"].value;

  if (taskTitle.trim() != "" && taskDescription.trim() != "") {
    h2.textContent = taskTitle;
    p.textContent = taskDescription;
    div.append(h2, p, button);
    UI_Elements["list-of-task"].append(div);
  } else {
    UI_Elements["alert-box"].classList.add("show");
    setTimeout(() => {
      UI_Elements["alert-box"].classList.remove("show");
    }, 1500);
  }
}

function initializeEventListener() {
  UI_Elements["add-task-button"].addEventListener("click", () => {
    addTask();
  });
}

(function main() {
  initializeEventListener();
  deleteTask();
})();
