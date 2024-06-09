import React from "react";
import settingSVG from "./SettingsSVG";
import useAppContext from "../../Utils/useAppContext";

export default function Settings() {
  const { state, despatch } = useAppContext();
  const { isSettingsMenu: isOpen, isCategoriesMenu: isCats } = state;
  // console.log(isCats);
  return (
    <>
      <div className="settings">
        <span
          onClick={() => despatch({ isSettingsMenu: !state.isSettingsMenu })}
          className="svg-btn"
        >
          {settingSVG}
        </span>

        <div className={isOpen ? "menu menu-active" : "menu"}>
          <button
            onClick={() => {
              despatch({ isSettingsMenu: false });
              despatch({ isCategoriesMenu: !state.isCategoriesMenu });
            }}
          >
            Categories
          </button>
        </div>
      </div>
    </>
  );
}
