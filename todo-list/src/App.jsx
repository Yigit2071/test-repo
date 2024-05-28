import React, { useState, useEffect } from 'react'
import "./App.css"
import Form from "./component/Form.jsx"
import TodoList from "./component/TodoList.jsx"

function App() {
  const [todos, setTodos] = useState([])
  const [inputText, setInputText] = useState("")
  const [status, setStatus] = useState("All")
  const [filteredTodos, setFilteredTodos] = useState([])

  useEffect(() => {
    getLocalTodos()

  }, [])

  useEffect(() => {
    filterHandler(todos)
    saveLocalTodos();

  }, [todos, status])

  console.log(filteredTodos)

  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;

      default:
        setFilteredTodos(todos);
        break;
    }
  }

  //! Save to Local

  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]))

    } else {
      setTodos(JSON.parse(localStorage.getItem("todos")))
    }
  }

  return (
    <div className='App'>
      <header>
        <h1>MY TODO LIST</h1>
      </header>
      <Form
        inputText={inputText}
        setInputText={setInputText}
        todos={todos}
        setTodos={setTodos}
        setStatus={setStatus}
      />
      <TodoList
        todos={todos}
        setTodos={setTodos}
        filteredTodos={filteredTodos}
      />
    </div>
  )
}

export default App