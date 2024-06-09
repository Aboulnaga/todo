import React, { useRef } from "react";
import toast from "react-hot-toast";
import useAppContext from "../../Utils/useAppContext";
import { useAddNewCategory } from "../../Utils/customHooks/categoriesRequests/catRequests";
import { Helmet } from "react-helmet-async";
export default function AddNewCat() {
  const { addNewCat, isError, isPending, data } = useAddNewCategory();
  const formRef = useRef();
  const handleForm = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");

    console.log("lod", isPending);
    if (!title) {
      return toast.error("plz add title");
    }

    addNewCat(title);

    if (isError) {
      return toast.error("cant add new category right now");
    }

    toast.success(`${title}, been add to categores`);

    formRef.current.reset();
    // console.log(title);
  };

  const { state, despatch } = useAppContext();
  const { isAddNewCatMenu: isAddMenu } = state;
  return (
    <>
      <div className="add-new-cat-container">
        <div className="title">
          <h2>Add new category</h2>
          <h2
            onClick={() => despatch({ isAddNewCatMenu: false })}
            className="close"
          >
            X
          </h2>
        </div>

        <div className="new-cat-form">
          <form ref={formRef} onSubmit={handleForm}>
            <input type="text" name="title" />
            <button className={isPending ? "ignore" : ""}>
              {isPending ? "loading..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
