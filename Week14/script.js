const todo_input = document.getElementById("todo-input")
const add_btn = document.getElementById("add-btn")
const todo_list = document.getElementById("todo-list")
let name_list = []

function updateStorage() {
    let arr_to_text = JSON.stringify(name_list)
    localStorage.setItem("name_list", arr_to_text)
}

function createLi(text) {
    let li = document.createElement("li")

    let span = document.createElement("span")
    span.textContent = text

    let del_btn = document.createElement("button")
    del_btn.textContent = "Delete"
    del_btn.addEventListener("click", () => {
        let index = Array.from(todo_list.children).indexOf(li)
        name_list.splice(index, 1)
        todo_list.removeChild(li)
        updateStorage()
    })

    li.appendChild(span)
    li.appendChild(del_btn)
    return li
}

add_btn.addEventListener("click", () => {
    let text = todo_input.value.trim()
    if (text === "") {
        return
    }
    todo_list.appendChild(createLi(text))
    name_list.push(text)
    updateStorage()
    todo_input.value = ""
})

window.onload = () => {
    let data = localStorage.getItem("name_list")
    if (data !== null) {
        let arr = JSON.parse(data)
        arr.forEach((i) => {
            todo_list.appendChild(createLi(i))
            name_list.push(i)
        })
    }
}