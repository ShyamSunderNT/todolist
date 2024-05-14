import React from "react";

// importing states
function Card({ todo, updateStatus, editTodo, deleteTodo }) {
  return (
    // card component
    <div className="card" key={todo.id}>
      <div>
        <p>
          <span className='label'>Name :</span>
          <span className='value'>{todo.taskName}</span>
        </p>
        <p>
          <span className='label'>Description :</span>
          <span className='value'>{todo.description}</span>
        </p>
        <div>
          <span className='label'>Status:</span>
          <select
            className={
              todo.status === "Completed"
                ? "selectStatus completed"
                : "selectStatus not-completed"
            }
            value={todo.status}
            name="status"
            onChange={(e) => updateStatus(todo.id, e.target.value)}
          >
            <option
              value="Completed"
              className={todo.status === "Completed" ? "completed" : ""}
            >
              Completed
            </option>
            <option
              value="Not Completed"
              className={todo.status !== "Completed" ? "not-completed" : ""}
            >
              Not Completed
            </option>
          </select>
        </div>
      </div>
      <div className="cardButtons">
        <button
          className="editButton"
          onClick={() => editTodo(todo.id)}
          type="button"
        >
          Edit
        </button>
        <button
          className="deleteButton"
          onClick={() => deleteTodo(todo.id)}
          type="button"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Card;