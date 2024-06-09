import React, { useEffect, useRef } from "react";
import Settings from "../settings/Settings";
import { useAddNewTodo } from "../../Utils/customHooks/TodosRequestes/todoRequests";
import { useGetAllCategories } from "../../Utils/customHooks/categoriesRequests/catRequests";
import toast from "react-hot-toast";
export default function AddNewTodo() {
  const { addNewTodo, isSuccess, isError, error } = useAddNewTodo();
  const { categoriesData, categoriesError, categoriesLoading } =
    useGetAllCategories();

  const formRef = useRef();

  const handleForm = async e => {
    e.preventDefault();
    let catId;
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const catIndex = formData.get("cat");
    const desc = formData.get("desc");
    if (catIndex != "all") {
      catId = categoriesData[catIndex]._id;
    } else {
      catId = null;
    }
    if (!title) {
      return toast.error("plz add todo title");
    }

    const data = {
      title,
      catId,
      desc,
    };

    addNewTodo(data);
  };

  useEffect(() => {
    if (isError || error) {
      toast.error(`cant add new todo, something went error, ${error.message}`);
    }
  }, [isError, error]);

  useEffect(() => {
    if (isSuccess) {
      formRef.current.reset();
      toast.success("new todo been added");
    }
  }, [isSuccess]);

  const mapCats = () => {
    if (categoriesData && categoriesData.length > 0) {
      return categoriesData.map((cat, i) => {
        // console.log(cat._id);
        return (
          <option value={i} key={i}>
            {cat.title}
          </option>
        );
      });
    }
  };

  return (
    <div className="new-todo">
      <div className="container max">
        <Settings />
        <form ref={formRef} onSubmit={handleForm}>
          <div className="row1">
            <input
              name="title"
              type="text"
              placeholder="add new todo title ..."
            />
            <select name="cat" id="select">
              <option value="all">-</option>
              {mapCats()}
            </select>
          </div>
          <div className="row2">
            <textarea
              name="desc"
              type="text"
              placeholder="add new todo description ..."
            />
          </div>

          <button type="submit">add</button>
        </form>
      </div>
    </div>
  );
}
