
import React, { useState, FormEvent, ChangeEvent } from 'react';
import { ToDo as ToDoType } from '../types';
import { TrashIcon } from './Icons';

export const ToDo = () => {
  const [todos, setTodos] = useState<ToDoType[]>([
    { id: 1, text: 'Napiš kód pro Úkolovník', completed: true },
    { id: 2, text: 'Přidej chat bota', completed: false },
    { id: 3, text: 'Implementuj editor obrázků', completed: false },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleAddTodo = (e: FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;
    const newTodo: ToDoType = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-2xl mx-auto animate-fade-in">
      <h2 className="text-3xl font-bold text-center mb-6 text-cyan-400">Úkolovník</h2>
      <form onSubmit={handleAddTodo} className="flex gap-2 mb-6">
        <input
          type="text"
          value={inputValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
          placeholder="Přidat nový úkol..."
          className="flex-grow p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
        />
        <button type="submit" className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-6 rounded-md transition-colors duration-300">
          Přidat
        </button>
      </form>
      <ul className="space-y-3">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={`flex items-center p-4 rounded-lg transition-all duration-300 ${
              todo.completed ? 'bg-gray-700 opacity-60' : 'bg-gray-700/50 hover:bg-gray-700'
            }`}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="w-6 h-6 mr-4 rounded-full text-cyan-500 bg-gray-600 border-gray-500 focus:ring-cyan-500"
            />
            <span className={`flex-grow text-lg ${todo.completed ? 'line-through text-gray-400' : ''}`}>
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)} className="text-gray-500 hover:text-red-500 transition-colors duration-300 ml-4 p-1">
              <TrashIcon className="w-6 h-6" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
