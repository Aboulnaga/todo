import React, { useState } from "react";
import {
  useDelCatById,
  usePatchCatById,
} from "../../Utils/customHooks/categoriesRequests/catRequests";
import toast from "react-hot-toast";
export default function Cat({ cat, index }) {
  const { delCatById, data, isError, isLoading, err } = useDelCatById();
  const {
    patchCatbyId,
    isLoading: isPatchLoading,
    isError: isPatchError,
  } = usePatchCatById();
  const { _id: id } = cat;
  const [input, setInput] = useState("");
  const handelForm = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const patchData = {
      id,
      title: formData.get("title"),
    };
    patchCatbyId(patchData);

    if (!isPatchError) {
      return toast.success(`this cat updated to ${patchData.title}`);
    } else {
      return toast.error("cant update this cat right now");
    }
  };

  const handleDel = () => {
    delCatById(id);

    if (!isError) {
      toast.success(`${cat.title}, deleted successfully`);
    } else {
      toast.error(
        `cant delete ${cat.title}, try again later, or refresh the page`
      );
    }
  };

  return (
    <form className="cat-from" onSubmit={handelForm}>
      <div className="title">
        <input
          name="title"
          onChange={e => {
            setInput(e.target.value);
          }}
          type="text"
          value={input || cat.title}
        />
      </div>

      <div onClick={handleDel} className="del">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM152 232H296c13.3 0 24 10.7 24 24s-10.7 24-24 24H152c-13.3 0-24-10.7-24-24s10.7-24 24-24z" />
        </svg>
      </div>
    </form>
  );
}
