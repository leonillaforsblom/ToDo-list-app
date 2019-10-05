document.getElementById('taskform').addEventListener('submit', (e) => {
  e.preventDefault();
});

window.onload = function getTodos() {
  let toDoitems = JSON.parse(localStorage.getItem('toDos'));
  if(!toDoitems) {
    return;
  }
  const tasks = document.getElementById('tasklist');
  toDoitems.map(e => {
    const listItem = document.createElement('li');
    listItem.innerText = e.task;
    listItem.addEventListener('click', listClick);
    tasks.insertBefore(listItem, tasks.firstChild);
  });
};


const newTask = {
  task: '',
  done: false,
};

const addTask = () => {

  const inputValue = document.getElementById('taskinput').value;
  newTask.task = inputValue;
  if (inputValue === '' || /^\s*$/.test(inputValue) === true) {
    return;
  }
  const text = document.createTextNode(inputValue);
  const tasks = document.getElementById('tasklist');
  const listItem = document.createElement('li');
  listItem.className = 'taskitem';
  listItem.addEventListener('click', listClick);
  listItem.appendChild(text);
  tasks.insertBefore(listItem, tasks.firstChild);
  document.getElementById('taskinput').value = '';
  saveTask();
}

document.getElementById('taskinput').addEventListener('keypress', e => {
  if (e.keyCode === 13) {
    addTask();
  }
});

const listClick = () => {
  this.classList.toggle('done');
}

const clearList = () => {
  const taskremove = document.getElementById('tasklist');
  taskremove.innerHTML = '';
  localStorage.clear();
}

const sortAsc = () => {
  const sortlist = document.getElementById('tasklist');
  Array.from(sortlist.getElementsByTagName('li'))
    .sort((a, b) => a.textContent.localeCompare(b.textContent))
    .forEach(li => sortlist.appendChild(li));
}

const sortDesc = () => {
  const sortlist = document.getElementById('tasklist');
  Array.from(sortlist.getElementsByTagName('li'))
    .sort((a, b) => b.textContent.localeCompare(a.textContent))
    .forEach(li => sortlist.appendChild(li));
}

const saveTask = () => {
  let taskhistory = JSON.parse(localStorage.getItem('toDos'));
  if (!taskhistory) {
    taskhistory = [];
  }
  taskhistory.push(newTask);
  localStorage.setItem('toDos', JSON.stringify(taskhistory));
}
