let TASKHISTORY = JSON.parse(localStorage.getItem('toDos'))

const saveTask = item => {
  if (!TASKHISTORY) {
    TASKHISTORY = []
  }
  TASKHISTORY.push(item)
  localStorage.setItem('toDos', JSON.stringify(TASKHISTORY))
}

const listClick = e => {
  e.target.classList.toggle('done')
  const findTask = TASKHISTORY.find(task => task.task === e.target.innerText)
  const index = TASKHISTORY.indexOf(findTask)
  TASKHISTORY.splice(index, 1)
  const status =
    findTask.done === false ? (findTask.done = true) : (findTask.done = false)
  const upDatedTask = Object.assign(findTask, (findTask.done = status))
  TASKHISTORY.push(upDatedTask)
  localStorage.setItem('toDos', JSON.stringify(TASKHISTORY))
}

const addTask = () => {
  const newTask = {
    task: '',
    done: false
  }

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
  saveTask(newTask)
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

const appendTasksFromStorage = item => {
  const tasks = document.getElementById('tasklist')
  tasks.insertBefore(item, tasks.firstChild)
}

const getTodos = () => {
  if (!TASKHISTORY) {
    return
  }
  TASKHISTORY.map(e => {
    const listItem = document.createElement('li')
    e.done === true
      ? (listItem.className = 'done')
      : (listItem.className = 'taskitem')
    listItem.innerText = e.task
    listItem.addEventListener('click', listClick)
    appendTasksFromStorage(listItem)
  })
}

window.onload = getTodos()
