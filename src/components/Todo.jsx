import React, { useEffect, useRef, useState } from 'react';
import TodoItem from '../assets/components/TodoItem';

const Todo = () => {
  const [todoList, setTodoList] = useState(localStorage.getItem("todos")? JSON.parse(localStorage.getItem("todos"))  :[]);
  const inputRef = useRef();

  const add = () => {
    const inputText = inputRef.current.value.trim();

    if (inputText === "") {
      return;  // Only return, no need for `null`.
    }

    const newTodo = {
      id: Date.now(),  // Unique identifier for each todo item.
      text: inputText,
      completed: false,
    };
    
    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = "";  // Clear input after adding todo.
  };

  const deleteTodo = (id) => {
    setTodoList((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const toggle = (id) => {
    setTodoList((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };  // Toggle completion state.
        }
        return todo;
      });
    });
  };

  useEffect(() => {
   localStorage.setItem("todos" , JSON.stringify(todoList)); // Log todo list for debugging purposes.
  }, [todoList]);

  return (
    <div className='
      bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl shadow-xl shadow-white'>
      
      <div className='flex items-center gap-2 mt-7'>
        <img className='h-10 w-8' src='images/todo_icon.png' alt='Todo Icon' />
        <h1 className='text-3xl font-semibold'>TO-DO List</h1>
      </div>

      <div className='flex items-center my-7 bg-gray-300 rounded-full'>
        <input 
          ref={inputRef} 
          className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600' 
          type='text' 
          placeholder='Add your Task' 
        />
        <button 
          onClick={add} 
          className='border-none rounded-full bg-orange-600 hover:text-orange-600 hover:bg-slate-50 w-32 h-14 text-white text-lg font-medium'>
          Add +
        </button>
      </div>

      <div>
        {todoList.map((item) => (
          <TodoItem 
            key={item.id}  // Use unique ID instead of index.
            text={item.text} 
            id={item.id} 
            completed={item.completed} 
            deleteTodo={deleteTodo}  // Properly pass the delete handler.
            ToggleEvent={toggle}  // Ensure prop name matches the expected one.
          />
        ))}
      </div>
    </div>
  );
};

export default Todo;
