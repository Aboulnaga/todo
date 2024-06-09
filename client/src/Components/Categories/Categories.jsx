import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Cat from "../Cat/Cat";
import useAppContext from "../../Utils/useAppContext";
import { useGetAllCategories } from "../../Utils/customHooks/categoriesRequests/catRequests";
import AddNewCat from "../addNewCategory/AddNewCat";
export default function Categories() {
  const { categoriesData, categoriesLoading, categoriesError } =
    useGetAllCategories();
  const { state, despatch } = useAppContext();
  const { isCategoriesMenu: isCats, isAddNewCatMenu: isNewCat } = state;

  if (categoriesError) {
    // console.log(categoriesError);
    return (
      <div>
        <p>some thing went error</p>{" "}
      </div>
    );
  }

  // console.log(isNewCat);
  return (
    <>
      <div className={!isCats ? "categories" : "categories categories-open"}>
        <div className="container max">
          {categoriesLoading ? (
            <div className="loadin">
              <p>loading ...!</p>
            </div>
          ) : (
            <div className="data">
              <div className="title">
                <div className="header">
                  <h2>Categories</h2>
                  <svg
                    onClick={() =>
                      despatch({ isAddNewCatMenu: !state.isAddNewCatMenu })
                    }
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM200 344V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H248v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
                  </svg>
                </div>
                <h2
                  className="close"
                  onClick={() => despatch({ isCategoriesMenu: false })}
                >
                  X
                </h2>
              </div>

              <div className="cats">
                {categoriesData.length > 0 &&
                  categoriesData.map((cat, i) => {
                    return (
                      <div key={i} className="cat">
                        <Cat cat={cat} index={i} />
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
        <div
          className={
            isNewCat ? "new-cat-menu new-cat-menu-open" : "new-cat-menu"
          }
        >
          <AddNewCat />
        </div>
      </div>
    </>
  );
}
