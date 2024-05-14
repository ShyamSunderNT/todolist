import './App.css';
import React, { useState } from 'react';
import Card from './Componants/Card';

function App() {
  // creating states 
  const [todos, setTodos] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [status, setStatus] = useState('Not Completed');
  const [description, setDescription] = useState('');
  const [filter, setFilter] = useState('All');
  const [edit, setEdit] = useState(false);
  const [editTodoId, setEditTodoId] = useState(null);

  // creating a function for adding todo
  const addTodo = () => {
    if (taskName.trim() === '' || description.trim() === '') {
      return;
    }

    // edit function
    if (edit) {
      const updatedTodos = todos.map((todo) => {
        if (todo.id === editTodoId) {
          return { ...todo, taskName, description, status };
        }
        return todo;
      });
      setTodos(updatedTodos);
      setEdit(false);
      setEditTodoId(null);
    } else {
      const newTodo = {
        id: todos.length + 1,
        taskName,
        description,
        status: 'Not Completed',
      };
      setTodos([...todos, newTodo]);
    }

    setTaskName('');
    setDescription('');
    setStatus('Not Completed');
  };

  // function for delete
  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const updateStatus = (id, newStatus) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, status: newStatus };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  // getting edit values
  const editTodo = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (todoToEdit) {
      setTaskName(todoToEdit.taskName);
      setDescription(todoToEdit.description);
      setStatus(todoToEdit.status);
      setEdit(true);
      setEditTodoId(id);
    }
  };

  // filter todos
  const filterTodos = () => {
    switch (filter) {
      case 'Completed':
        return todos.filter((todo) => todo.status === 'Completed');
      case 'Not Completed':
        return todos.filter((todo) => todo.status === 'Not Completed');
      default:
        return todos;
    }
  };

  return (
    <>
      <div className='title'>
        <h1 className='title'>My ToDo</h1>
      </div>
      <form className='addForm'>
        <div className='form-group'>
          <input
            className='inputField'
            type='text'
            placeholder='Todo Name'
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
          />
          <input
            className='inputField'
            type='text'
            placeholder='Todo Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <button
            onClick={addTodo}
            className='addFormButton'
          >
            {edit ? 'Update Todo' : 'Add Todo'}
          </button>
        </div>
      </form>
      <div className='mytodos'>
        
        <div className='subject'>
          <label htmlFor='filter' className='statusFilter'>
            Status Filter:
          </label>
          <select value={filter} name='filter' onChange={(e) => setFilter(e.target.value)} className='selectFilter'>
            <option value='All' className='all'>
              All
            </option>
            <option
              value='Completed'
              className='completed'
            >
              Completed
            </option>
            <option value='Not Completed' className='not-completed'>
              Not Completed
            </option>
          </select>
        </div>
        <h3 className='title_2'>
          My To-Do
        </h3>
      </div>
      <div className='cardSection'>
        {filterTodos().map((todo) => (
          <div className='card' key={todo.id}>
            <Card
              todo={todo}
              updateStatus={updateStatus}
              editTodo={editTodo}
              deleteTodo={deleteTodo}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default App;