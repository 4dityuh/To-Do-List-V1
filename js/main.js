const UI_Elements = {
  "task-title": document.getElementById("task-title"),
  "task-description": document.getElementById("task-description"),
  "add-task-button": document.getElementById("add-task-button"),
  "delete-task-button": document.getElementById("delete-task-button"),
  "list-of-task": document.querySelector(".list-of-task"),
  "user-task": document.querySelector(".list-of-task .task"),
};

// TODO :
// - make a function that deletes the task : DONE
// - make a function that adds the task : DONE
// - it should add the task IF both title AND description is filled : ONGOING
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

function addTask() {
  // needs : div, h2, p, and button
  let div = document.createElement("div"),
    h2 = document.createElement("h2"),
    p = document.createElement("p"),
    button = document.createElement("button");

  // test
  h2.textContent = "Make Pizza For Wife";
  h2.className = "title";
  p.textContent = "She likes pepperoni";
  p.className = "description";
  button.id = "delete-task-button";
  button.textContent = "X";
  div.className = "task";
  div.append(h2, p, button);
  UI_Elements["list-of-task"].append(div);
}


function initializeEventListener(){
  UI_Elements["add-task-button"].addEventListener("click", () => {
    addTask();
  });
}

(function main() {
  initializeEventListener();
  deleteTask();
})();