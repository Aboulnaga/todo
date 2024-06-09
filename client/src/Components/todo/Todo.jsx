import React, { useEffect, useState } from "react";
import {
  useDeleteTodoById,
  usePatchTodoById,
} from "../../Utils/customHooks/TodosRequestes/todoRequests";
import toast from "react-hot-toast";
import UpdateTodo from "../updateTodo/UpdateTodo";
export default function Todo({ todo }) {
  const id = todo._id;
  const { delTodobyId, data, isError, isPending, isSuccess } =
    useDeleteTodoById();
  const {
    patchTodoById,
    data: pathcData,
    isError: isPAtchError,
    isSuccess: isPAtchSuccess,
    isPending: isPAtchPending,
  } = usePatchTodoById();
  const [isTodoMenu, setIsTodoMenu] = useState(false);
  const [isUpdateMenu, setIsUpdateMenu] = useState(false);

  const handleDelete = e => {
    delTodobyId(id);
  };

  useEffect(() => {
    if (isError) {
      toast.error("something went error");
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      setIsTodoMenu(false);
      toast.success("todo deleted successfully");
    }
  }, [isSuccess]);

  const handleStatus = e => {
    // console.log(todo.title);
    const data = {
      id,
      formData: { title: todo.title, status: e.target.value },
    };

    patchTodoById(data);
  };

  useEffect(() => {
    if (isPAtchSuccess) {
      toast.success("status changed successfully");
    }
  }, [isPAtchSuccess]);

  useEffect(() => {
    if (isPAtchError) {
      toast.error("cant change status");
    }
  }, [isPAtchError]);

  if (isPAtchPending || isPending) {
    return (
      <div className="todo">
        <p>loading ...</p>
      </div>
    );
  }

  // console.log(todo.status);
  return (
    <div className={`todo ${todo.status}`}>
      <div className="container">
        <div className="todo-header">
          <h4>{todo.title}</h4>
          <svg
            onClick={() => setIsTodoMenu(!isTodoMenu)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 128 512"
          >
            <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
          </svg>
        </div>
        <div className="todo-body">
          <p>{todo.desc ? todo.desc : "no desc..."}</p>
        </div>
        <div className="todo-footer">
          <div className="col1">
            <p>status</p>
            <p className="case">{todo.status}</p>
          </div>
          <div className="col2">
            <p>category</p>
            <p className="case">{todo.catId ? todo.catId.title : "No Cat"}</p>
          </div>
        </div>
      </div>
      <div
        className={
          isTodoMenu ? "todo-settings todo-settings-open" : "todo-settings"
        }
      >
        <div className="del">
          <p className="btn" onClick={handleDelete}>
            Delete
          </p>
          <p onClick={() => setIsTodoMenu(false)} className="close">
            X
          </p>
        </div>
        <div className="update">
          <p
            onClick={() => {
              setIsTodoMenu(false);
              setIsUpdateMenu(!isUpdateMenu);
            }}
            className="btn"
          >
            Update
          </p>
        </div>
        <div className="status">
          <select value={todo.status} onChange={handleStatus} name="status">
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="timeOut">Time Out</option>
          </select>
        </div>
      </div>
      {isUpdateMenu ? (
        <div className="update-todo-container">
          <UpdateTodo
            isUpdateMenu={isUpdateMenu}
            setIsUpdateMenu={setIsUpdateMenu}
            todo={todo}
          />
        </div>
      ) : null}
    </div>
  );
}
