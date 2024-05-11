let tasks = [];

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();
  const dueDateInput = document.getElementById('dueDate');
  const dueDate = dueDateInput.value;

  if (taskText !== '') {
    const newTask = { id: Date.now(), text: taskText, dueDate: dueDate, completed: false };
    tasks.push(newTask);
    sortTasksByDueDate();
    saveTasks();
    displayTasks();
    taskInput.value = '';
    dueDateInput.value = '';
  }
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  displayTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  displayTasks();
}

function editTask(id, newText) {
  tasks.forEach(task => {
    if (task.id === id) {
      task.text = newText;
    }
  });
  saveTasks();
  displayTasks();
}

function sortTasksByDueDate() {
  tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const savedTasks = localStorage.getItem('tasks');
  tasks = savedTasks ? JSON.parse(savedTasks) : [];
}

function displayTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  tasks.forEach(task => {
    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => toggleTask(tasks.indexOf(task)));
    taskItem.appendChild(checkbox);

    const taskText = document.createElement('span');
    taskText.textContent = task.text;
    if (task.completed) {
      taskText.classList.add('completed');
    }
    taskItem.appendChild(taskText);

    const dueDateText = document.createElement('span');
    dueDateText.textContent = ` - Due Date: ${task.dueDate}`;
    taskItem.appendChild(dueDateText);

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', (event) => {
      event.stopPropagation();
      editTaskTitle(task.id);
    });
    taskItem.appendChild(editButton);

    const deleteButton = document.createElement('buttons');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', (event) => {
      event.stopPropagation();
      deleteTask(task.id);
    });
    taskItem.appendChild(deleteButton);

    taskList.appendChild(taskItem);
  });
}

function editTaskTitle(id) {
  const newText = prompt('Enter new task title:');
  if (newText !== null && newText.trim() !== '') {
    editTask(id, newText.trim());
  }
}

loadTasks();
displayTasks();
