import React, { useReducer } from "react";
import { createContext } from "react";

export const appContext = createContext();

export default function AppContextProvider({ children }) {
  const [state, despatch] = useReducer(
    (state, action) => ({ ...state, ...action }),
    {
      isSettingsMenu: false,
      isCategoriesMenu: false,
      isAddNewCatMenu: false,
      searchInput: null,
    }
  );

  return (
    <appContext.Provider value={{ state, despatch }}>
      {children}
    </appContext.Provider>
  );
}
