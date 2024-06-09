import React, { useEffect, useState } from "react";
import { useGetAllTodos } from "../../Utils/customHooks/TodosRequestes/todoRequests";
import Todo from "../todo/Todo";
import useAppContext from "../../Utils/useAppContext";
export default function TodosList() {
  const {
    state: { searchInput },
  } = useAppContext();
  const { data, isLoading, isError } = useGetAllTodos();
  const [todos, setTodos] = useState(null);
  useEffect(() => {
    if (data) {
      setTodos(data);
    }
  }, [data]);

  // const arr = ["play footbal", 2, 3, 4];
  // arr.map(item => {});

  useEffect(() => {
    if (searchInput) {
      const filterData = data.filter(todo => todo.title.includes(searchInput));
      // console.log(filterData);

      if (filterData) {
        setTodos(filterData);
      }
    } else {
      setTodos(data);
    }
  }, [searchInput]);

  // console.log(isError);
  const mapTodos = () => {
    if (isLoading) {
      return (
        <div>
          <p>loading todos ...</p>
        </div>
      );
    }
    if (todos) {
      return todos.map((todo, i) => {
        return <Todo key={i} todo={todo} />;
      });
    }
  };

  // console.log(data);
  return (
    <div className="todos">
      <div className="container max">
        <h2>TodosList</h2>
        <div className="all-todos">{mapTodos()}</div>
      </div>
    </div>
  );
}
