const newTask = {
  task: '',
  done: false
}

const saveTask = () => {
  let taskhistory = JSON.parse(localStorage.getItem('toDos'))
  if (!taskhistory) {
    taskhistory = []
  }
  taskhistory.push(newTask)
  localStorage.setItem('toDos', JSON.stringify(taskhistory))
}

const listClick = e => {
  e.target.classList.toggle('done')
}

const addTask = () => {
  const inputValue = document.getElementById('taskinput').value
  newTask.task = inputValue
  if (inputValue === '' || /^\s*$/.test(inputValue)) {
    return
  }
  const text = document.createTextNode(inputValue)
  const tasks = document.getElementById('tasklist')
  const listItem = document.createElement('li')
  listItem.className = 'taskitem'
  listItem.addEventListener('click', listClick)
  listItem.appendChild(text)
  tasks.insertBefore(listItem, tasks.firstChild)
  document.getElementById('taskinput').value = ''
  saveTask()
}

document.getElementById('taskinput').addEventListener('keypress', e => {
  if (e.keyCode === 13) {
    addTask()
  }
})

document.getElementById('taskform').addEventListener('submit', e => {
  e.preventDefault()
  onsubmit = addTask()
})

const clearList = () => {
  localStorage.clear()
  location.reload()
}

const sortAsc = () => {
  const sortlist = document.getElementById('tasklist')
  Array.from(sortlist.getElementsByTagName('li'))
    .sort((a, b) => a.textContent.localeCompare(b.textContent))
    .forEach(li => sortlist.appendChild(li))
}

const sortDesc = () => {
  const sortlist = document.getElementById('tasklist')
  Array.from(sortlist.getElementsByTagName('li'))
    .sort((a, b) => b.textContent.localeCompare(a.textContent))
    .forEach(li => sortlist.appendChild(li))
}

document.getElementById('remove').addEventListener('click', clearList)

document.getElementById('sortup').addEventListener('click', sortAsc)

document.getElementById('sortdown').addEventListener('click', sortDesc)

window.onload = function getTodos() {
  const toDoitems = JSON.parse(localStorage.getItem('toDos'))
  if (!toDoitems) {
    return
  }
  const tasks = document.getElementById('tasklist')
  toDoitems.map(e => {
    const listItem = document.createElement('li')
    listItem.innerText = e.task
    listItem.addEventListener('click', listClick)
    tasks.insertBefore(listItem, tasks.firstChild)
  })
}
