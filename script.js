// Select elements
const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load tasks from local storage
window.onload = function () {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => renderTask(task.text, task.completed));
};

// Add button click event
addBtn.addEventListener("click", () => {
  const task = input.value.trim();
  if (task !== "") {
    renderTask(task);
    saveTask(task, false);
    input.value = "";
  }
});

// Render a single task
function renderTask(taskText, isCompleted = false) {
  const li = document.createElement("li");
  li.textContent = taskText;

  if (isCompleted) {
    li.classList.add("completed");
  }

  // Toggle completion on click
  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    updateStorage();
  });

  // Delete button
  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.className = "delete-btn";
  delBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent toggle
    taskList.removeChild(li);
    updateStorage();
  });

  li.appendChild(delBtn);
  taskList.appendChild(li);
}

// Save new task to local storage
function saveTask(text, completed) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text, completed });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Update local storage after changes
function updateStorage() {
  const tasks = [];
  taskList.querySelectorAll("li").forEach(li => {
    tasks.push({
      text: li.firstChild.textContent.trim(),
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
