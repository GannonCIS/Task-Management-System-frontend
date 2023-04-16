import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import TodoList from './components/MainPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <TodoList />
  </React.StrictMode>
);
