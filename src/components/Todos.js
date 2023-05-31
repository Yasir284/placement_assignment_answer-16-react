import React, { useContext, useState } from "react";

import TodoContext from "../contexts/TodoContext";
import {
  COMPLETED_TODO,
  REMOVE_TODO,
  EDIT_TODO,
  SAVE_TODO,
} from "../contexts/action.types";

import { MdCropFree, MdLibraryAddCheck } from "react-icons/md";
import { RiFileEditFill, RiDeleteBin6Fill, RiSave2Fill } from "react-icons/ri";

function Todos() {
  const { todos, dispatch } = useContext(TodoContext);
  const [value, setValue] = useState("");

  // Check task
  const onCheck = (id, isCompleted) => {
    dispatch({
      type: COMPLETED_TODO,
      payload: { id, isCompleted },
    });
  };

  // Remove Element
  const handleRemove = (id) => {
    dispatch({
      type: REMOVE_TODO,
      payload: id,
    });
  };

  // Edit Todo
  const handleEdit = (id, todoString) => {
    setValue(todoString);
    dispatch({
      type: EDIT_TODO,
      payload: id,
    });
  };

  // Save Edit
  const handleSaveEdit = (id, todoString) => {
    if (todoString !== "") {
      dispatch({
        type: SAVE_TODO,
        payload: {
          id,
          todoString,
        },
      });
    } else {
      return alert("Enter text first");
    }
  };

  return (
    <div className="px-4 my-20 sm:px-20 ">
      <div className="mb-4 flex flex-col justify-center items-center gap-8 sm:flex-row sm:justify-between">
        <h1 className="font-semibold text-center sm:text-left text-[#29857f] text-2xl">
          Tasks List 📋
        </h1>

        {todos.every((todo) => todo.isCompleted) && todos.length > 0 ? (
          <p className="text-center text-[#29857f] rounded-lg font-extrabold">
            ALL TASKS COMPLETED
          </p>
        ) : (
          <div className="flex flex-row justify-center items-center gap-4 flex-wrap">
            <p className="text-center text-[#29857f] rounded-lg font-extrabold">
              Total Todos :
              <span className="rounded-lg px-2 py-1 ml-1 text-[#d3f1ed] bg-[#29857f]">
                {todos.length}
              </span>
            </p>
            <p className="text-center text-[#29857f] rounded-lg font-extrabold">
              Completed Todos :
              <span className="rounded-lg px-2 py-1 ml-1 text-[#d3f1ed] bg-[#29857f]">
                {todos.filter((item) => item.isCompleted).length}
              </span>
            </p>
          </div>
        )}
      </div>

      {/* ================== TASK LIST ================== */}
      <ul>
        {todos.length === 0 ? (
          <li className="mt-20 font-thin text-xl text-[#29857f] text-center">
            No task added
          </li>
        ) : (
          todos.map((todo) => (
            <li
              key={todo.id}
              className={`${
                todo.isCompleted
                  ? "bg-[rgba(41,133,127,0.2)] line-through text-[#29857f]"
                  : "bg-white"
              } p-3 mb-2 rounded-lg hover:bg-[rgba(41,133,127,0.2)] flex flex-row justify-between items-center
              transition-all ease-in-out duration-[0.3s]`}
            >
              {todo.edit ? (
                <div className="flex-1 flex flex-row justify-between items-center">
                  <input
                    type="text"
                    placeholder="Edit Todo"
                    className="rounded-lg border-[2px] border-solid border-[#29857f] text-left flex-1 px-3  transition-all ease-in-out duration-[0.3s] hover:bg-[rgba(41,133,127,0.2)]"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />

                  <RiSave2Fill
                    onClick={() => handleSaveEdit(todo.id, value)}
                    className=" p-1 text-[rgba(41,133,127,0.7)] transition-all ease-in-out duration-300 active:scale-50 active:text-[#29857f]"
                    size={"2rem"}
                    title="Save"
                  />
                </div>
              ) : (
                <div className="flex-1 flex flex-row justify-between items-center">
                  <div onClick={() => onCheck(todo.id, !todo.isCompleted)}>
                    {todo.isCompleted ? (
                      <MdLibraryAddCheck size={"1.5rem"} />
                    ) : (
                      <MdCropFree color="#29857f" size={"1.5rem"} />
                    )}
                  </div>

                  <p className="text-left flex-1 px-3">{todo.todoString}</p>

                  {todo.isCompleted ? (
                    ""
                  ) : (
                    <RiFileEditFill
                      onClick={() => {
                        handleEdit(todo.id, todo.todoString);
                      }}
                      className=" p-1 text-[rgba(41,133,127,0.7)] transition-all ease-in-out duration-300 active:scale-50 active:text-[#29857f]"
                      size={"1.8rem"}
                      title="Edit"
                    />
                  )}
                </div>
              )}

              <RiDeleteBin6Fill
                onClick={() => handleRemove(todo.id)}
                className="ml-2 p-1 text-[rgba(248,5,5,0.4)] transition-all ease-in-out duration-300 active:scale-50 active:text-[#ff0000]"
                size={"2rem"}
              />
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Todos;
