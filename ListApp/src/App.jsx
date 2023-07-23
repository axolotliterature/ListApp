import { useState } from 'react'
import './App.css'

function App() {
  const [newItem, setNewItem] = useState("")
  const [todos, setTodos] = useState([])

  function handleSubmit(e) {
    e.preventDefault()

    setTodos(currentTodos => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), 
          title: newItem, 
          completed: false },
      ]
    })
    setNewItem("")
  }

  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed }
        }

        return todo
      })
    })
  }

  function deleteTodos(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  return (
    <>
    <form onSubmit={handleSubmit} className="new-item-form">
      <div className="form-row">
        <label htmlFor="item">New Item: </label>
        <input 
          value={newItem} 
          onChange={e => setNewItem(e.target.value)} 
          type="text" 
          id="item">
        </input>
        <button className="button">Add</button>
      </div>
      
    </form>
    <h1 className="header">Todo List</h1>
    <ul className="list">
      {/* Below is Javascript short-circuiting */}
      {todos.length === 0 && "No Todos"} 
      {todos.map(todo => {
        return <li key={todo.id}>
          <label>
            <input type="checkbox" checked={todo.completed}
            onChange={e => toggleTodo(todo.id, e.target.checked)}></input>
            {todo.title}
          </label>
          <button 
            onClick={() => deleteTodos(todo.id)} 
            className="button btn-danger"
            >
              Delete
            </button>
        </li>
      })}
    </ul>
    </>
  )
}

export default App
