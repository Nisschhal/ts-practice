interface ToDo {
  text: string
  completed: boolean
}
const btn = document.getElementById("btn")

const input = document.getElementById("to-do-input") as HTMLInputElement

const form = document.querySelector("#todo") as HTMLFormElement

const uList = document.getElementById("list") as HTMLUListElement

const todos: ToDo[] = readTodos()
todos.forEach(renderTodo)
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos))
}
function readTodos(): ToDo[] {
  const localStorageToDo = localStorage.getItem("todos")
  if (localStorageToDo == null) {
    return []
  }
  return JSON.parse(localStorageToDo)
}

function handleSubmit(e: SubmitEvent) {
  e.preventDefault()

  if (input.value) {
    const newToDo = {
      text: input.value,
      completed: false,
    }
    renderTodo(newToDo)
    todos.push(newToDo)
    saveTodos()

    localStorage.setItem("todos", JSON.stringify(todos))
    input.value = ""
  }
}

function renderTodo(todo: ToDo) {
  const list = document.createElement("li")
  const check = document.createElement("input")
  list.append(todo.text)
  check.type = "checkbox"
  check.checked = todo.completed
  check.addEventListener("change", () => {
    todo.completed = check.checked
    saveTodos()
  })
  list.append(check)
  uList.append(list)
}

form.addEventListener("submit", handleSubmit)
