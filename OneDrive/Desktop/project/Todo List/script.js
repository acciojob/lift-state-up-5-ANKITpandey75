const itemName = document.getElementById("itemName");
const itemDate = document.getElementById("itemDate");
const itemPriority = document.getElementById("itemPriority");
const addItemButton = document.getElementById("addItem");

const todayTasks = document.getElementById("todayTasks");
const futureTasks = document.getElementById("futureTasks");
const completedTasks = document.getElementById("completedTasks");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

function addTodo() {
  const name = itemName.value.trim();
  const date = itemDate.value;
  const priority = itemPriority.value;

  if (name === "" || date === "" || priority === "") {
    alert("Please fill all fields");
    return;
  }

  const todo = {
    name: name,
    date: date,
    priority: priority,
    completed: false,
  };

  todos.push(todo);
  saveTodos();
  renderTodos();

  itemName.value = "";
  itemDate.value = "";
  itemPriority.value = "";
}

function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  renderTodos();
}

function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  saveTodos();
  renderTodos();
}

function createTaskElement(todo, index) {
  const task = document.createElement("div");
  task.className = `task ${todo.priority}`;

  if (todo.completed) {
    task.classList.add("completed");
  }

  task.innerHTML = `
    <div class="task-info">
      <p><strong>${todo.name}</strong></p>
      <p>Date: ${todo.date}</p>
      <p>Priority: ${todo.priority}</p>
      <p>Status: ${todo.completed ? "Completed" : "Pending"}</p>
    </div>
    <div class="actions">
      <button class="complete-btn">${todo.completed ? "Undo" : "Tick"}</button>
      <button class="delete-btn">Delete</button>
    </div>
  `;

  task.querySelector(".complete-btn").addEventListener("click", function () {
    toggleComplete(index);
  });

  task.querySelector(".delete-btn").addEventListener("click", function () {
    deleteTodo(index);
  });

  return task;
}

function renderTodos() {
  todayTasks.innerHTML = "";
  futureTasks.innerHTML = "";
  completedTasks.innerHTML = "";

  const today = getTodayDate();

  let todayCount = 0;
  let futureCount = 0;
  let completedCount = 0;

  todos.forEach(function (todo, index) {
    const taskElement = createTaskElement(todo, index);

    if (todo.completed) {
      completedTasks.appendChild(taskElement);
      completedCount++;
    } else if (todo.date === today) {
      todayTasks.appendChild(taskElement);
      todayCount++;
    } else {
      futureTasks.appendChild(taskElement);
      futureCount++;
    }
  });

  if (todayCount === 0) {
    todayTasks.innerHTML = `<p class="empty">No tasks for today</p>`;
  }

  if (futureCount === 0) {
    futureTasks.innerHTML = `<p class="empty">No future tasks</p>`;
  }

  if (completedCount === 0) {
    completedTasks.innerHTML = `<p class="empty">No completed tasks</p>`;
  }
}

addItemButton.addEventListener("click", addTodo);

renderTodos();