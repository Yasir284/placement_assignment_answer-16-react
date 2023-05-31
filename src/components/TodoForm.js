import React, { useContext, useState } from "react";
import TodoContext from "../contexts/TodoContext";
import { ADD_TODO } from "../contexts/action.types";
import { v4 } from "uuid";

function TodoForm() {
  const [todoString, setTodoString] = useState("");
  const { dispatch } = useContext(TodoContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todoString === "") {
      console.log("Its Empty");
      return alert("Enter text first");
    }
    const todo = {
      todoString,
      id: v4(),
      isCompleted: false,
      edit: false,
    };
    dispatch({
      type: ADD_TODO,
      payload: todo,
    });
    setTodoString("");
  };

  return (
    <div className="px-4 my-6 sm:px-20 sm:my-12">
      <h1 className="font-semibold text-center sm:text-left text-[#29857f] text-2xl mb-4">
        Add Task ✏️
      </h1>

      <form
        className="flex items-center gap-4 flex-col justify-center sm:flex-row sm:justify-between"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="w-full rounded-lg p-3 flex-1 bg-white"
          name="todo"
          placeholder="Your next todo"
          value={todoString}
          onChange={(e) => {
            setTodoString(e.target.value);
          }}
        />

        <button
          type="submit"
          className="h-12 px-6 bg-[#29857f] rounded-lg border-none text-white font-semibold transition-all ease-in-out duration-300 active:scale-50"
        >
          ADD
        </button>
      </form>
    </div>
  );
}

export default TodoForm;
