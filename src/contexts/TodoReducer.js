import {
  ADD_TODO,
  REMOVE_TODO,
  COMPLETED_TODO,
  EDIT_TODO,
  SAVE_TODO,
  LOCAL_TODO,
} from "./action.types";

const TodoReducer = (state, action) => {
  let returnState = [];

  switch (action.type) {
    case LOCAL_TODO: {
      const localTodo = localStorage.getItem("todos");
      if (localTodo !== null && localTodo.length > 0) {
        returnState = state = JSON.parse(localTodo);
        break;
      } else {
        returnState = [];
        break;
      }
    }

    case ADD_TODO:
      returnState = [...state, action.payload];
      break;

    case REMOVE_TODO:
      returnState = state.filter((todo) => todo.id !== action.payload);
      break;

    case COMPLETED_TODO: {
      let taskId = state.findIndex((todo) => todo.id === action.payload.id);
      state[taskId].isCompleted = action.payload.isCompleted;
      returnState = state.filter((todo) => todo.id !== "");
      break;
    }

    case EDIT_TODO: {
      let taskId = state.findIndex((todo) => todo.id === action.payload);
      state[taskId].edit = true;
      console.log(state);
      returnState = state.filter((todo) => todo.id !== "");
      break;
    }

    case SAVE_TODO: {
      let taskId = state.findIndex((todo) => todo.id === action.payload.id);
      state[taskId].todoString = action.payload.todoString;
      state[taskId].edit = false;
      console.log(state);
      returnState = state.filter((todo) => todo.id !== "");
      break;
    }

    default:
      returnState = state;
      break;
  }

  localStorage.setItem("todos", JSON.stringify(returnState));
  return returnState;
};

export default TodoReducer;
