import React from "react";
import toast, { Toaster } from "react-hot-toast";
import Header from "./Components/Header/Header";
import AddNewTodo from "./Components/addNewTodo/addNewTodo";
import useAppContext from "./Utils/useAppContext";
import Categories from "./Components/Categories/Categories";
import "./style.scss";
import TodosList from "./Components/todosList/TodosList";

export default function App() {
  const { state, despatch } = useAppContext();
  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <Header />
      <main>
        <Categories />
        <AddNewTodo />
        <TodosList />
      </main>
    </>
  );
}
