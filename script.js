// Load tasks from localStorage on page load
window.onload = function () {
    loadTasks();
  };
  
  function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();
    if (taskText === "") return;
  
    const li = document.createElement("li");
    li.innerHTML = `
      <span onclick="toggleComplete(this)">${taskText}</span>
      <button onclick="deleteTask(this)">Delete</button>
    `;
  
    document.getElementById("taskList").appendChild(li);
    input.value = "";
  
    saveTasks();
  }
  
  function toggleComplete(span) {
    span.parentElement.classList.toggle("completed");
    saveTasks();
  }
  
  function deleteTask(btn) {
    btn.parentElement.remove();
    saveTasks();
  }
  
  function saveTasks() {
    const list = document.getElementById("taskList");
    const tasks = [];
  
    list.querySelectorAll("li").forEach(li => {
      tasks.push({
        text: li.querySelector("span").innerText,
        completed: li.classList.contains("completed"),
      });
    });
  
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  
  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const list = document.getElementById("taskList");
  
    tasks.forEach(task => {
      const li = document.createElement("li");
      li.classList.toggle("completed", task.completed);
      li.innerHTML = `
        <span onclick="toggleComplete(this)">${task.text}</span>
        <button onclick="deleteTask(this)">Delete</button>
      `;
      list.appendChild(li);
    });
  }
  