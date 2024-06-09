import React, { useContext } from "react";
import { appContext } from "./AppContextProvider";

export default function useAppContext() {
  const context = useContext(appContext);

  if (!context) {
    throw new Error("context not found");
  }

  return context;
}
