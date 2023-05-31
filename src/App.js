import "./App.css";
import React, { useReducer, useEffect } from "react";

import { LOCAL_TODO } from "./contexts/action.types";

import Header from "./components/Header";
import TodoReducer from "./contexts/TodoReducer";
import TodoContext from "./contexts/TodoContext";
import TodoForm from "./components/TodoForm";
import Todos from "./components/Todos";

function App() {
  const [todos, dispatch] = useReducer(TodoReducer, []);

  useEffect(() => {
    dispatch({
      type: LOCAL_TODO,
    });
  }, []);

  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      <Header />
      <TodoForm />
      <Todos />
    </TodoContext.Provider>
  );
}

export default App;
