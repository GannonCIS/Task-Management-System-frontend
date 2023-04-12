import React, { useState } from 'react';
import '../css/MainPage.css';

function TodoList() {
  const [items, setItems] = useState([]);
  const [text, setText] = useState('');

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setItems([...items, { text, id: Date.now(), completed: false }]);
    setText('');
  };

  const handleComplete = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <div className="TodoList">
      <h1>To-Do List</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={text} onChange={handleChange} placeholder="Add a new task" />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <span
              className={item.completed ? 'completed' : 'uncompleted'}
              onClick={() => handleComplete(item.id)}
            >
              {item.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
