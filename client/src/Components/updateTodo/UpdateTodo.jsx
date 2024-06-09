import React, { useEffect, useState } from "react";
import { useGetAllCategories } from "../../Utils/customHooks/categoriesRequests/catRequests";
import { usePatchTodoById } from "../../Utils/customHooks/TodosRequestes/todoRequests";
import toast from "react-hot-toast";
export default function UpdateTodo({ todo, isUpdateMenu, setIsUpdateMenu }) {
  const {
    patchTodoById,
    data: patchData,
    isError: isPatchError,
    isPending: isPatcPending,
    isSuccess: isPatchSuccess,
  } = usePatchTodoById();
  const { categoriesData, categoriesError, categoriesLoading } =
    useGetAllCategories();
  const [selectValue, setSelectValue] = useState("all");

  useEffect(() => {
    if (todo.catId && todo.catId._id) {
      setSelectValue(todo.catId._id);
    }
  }, [todo.catId]);

  const mapCats = () => {
    if (categoriesData) {
      return categoriesData.map((cat, i) => {
        // console.log(cat._id);
        return (
          <option value={cat._id} key={i}>
            {cat.title}
          </option>
        );
      });
    }
  };

  // console.log(patchData);

  const handleForm = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let catId;
    if (formData.get("cat") === "all") {
      catId = null;
    } else {
      catId = formData.get("cat");
    }
    const data = {
      id: todo._id,
      formData: {
        title: formData.get("title"),
        desc: formData.get("desc"),
        catId,
      },
    };

    patchTodoById(data);
    // console.log(data);
  };

  useEffect(() => {
    if (isPatchSuccess) {
      toast.success("todo updated successfully");
    }
  }, [isPatchSuccess]);

  useEffect(() => {
    if (isPatchError) {
      toast.error("cant update todo right now");
    }
  }, [isPatchError]);

  if (isPatcPending) {
    return (
      <div className="update-todo">
        <div className="container max">
          <p>loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="update-todo">
      <div className="container max">
        <div className="form-header">
          <h2>Edit: {todo.title}</h2>
          <h2 onClick={() => setIsUpdateMenu(false)} className="close">
            X
          </h2>
        </div>
        <form onSubmit={handleForm}>
          <div className="row1">
            <input
              name="title"
              type="text"
              defaultValue={todo.title}
              placeholder="add new todo title ..."
            />
            <select
              onChange={e => {
                console.log(e.target.value);
                setSelectValue(e.target.value);
              }}
              value={selectValue}
              name="cat"
              id="select"
            >
              <option value="all">-</option>
              {mapCats()}
            </select>
          </div>
          <div className="row2">
            <textarea
              defaultValue={todo.desc}
              name="desc"
              type="text"
              placeholder="add new todo description ..."
            />
          </div>

          <button type="submit">Save </button>
        </form>
      </div>
    </div>
  );
}
