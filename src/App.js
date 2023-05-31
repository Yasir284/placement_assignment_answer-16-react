import "./App.css";
import React, { useReducer, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { LOCAL_TODO } from "./contexts/action.types";

import Header from "./components/Header";
import TodoReducer from "./contexts/TodoReducer";
import TodoContext from "./contexts/TodoContext";
import TodoForm from "./components/TodoForm";
import Todos from "./components/Todos";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  const [todos, dispatch] = useReducer(TodoReducer, []);
  const [user, setUser] = useState(null);

  useEffect(() => {
    dispatch({
      type: LOCAL_TODO,
    });

    setUser(JSON.parse(sessionStorage.getItem("user")));
  }, []);

  return (
    <TodoContext.Provider value={{ todos, dispatch, user, setUser }}>
      <Header />
      <ToastContainer theme="colored" autoClose="2000" />
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <div>
                <TodoForm />
                <Todos />
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </TodoContext.Provider>
  );
}

export default App;
