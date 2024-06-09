import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
const API = import.meta.env.VITE_CATS_API;

// @Desc: get all todos
export function useGetAllTodos() {
  return useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = await axios.get(`${API}todos`);
      const sortedData = res.data.data.sort((a, b) => {
        // console.log(a.createdAt);
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      // console.log(sortedData);
      return sortedData;
    },
  });
}

// @Desc add new todo
export function useAddNewTodo() {
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: async todoData => {
      const res = await axios.post(`${API}todos`, todoData);
      // console.log(res);
      return res.data.data;
    },
    onSuccess: () => {
      qc.invalidateQueries(["todos"]);
    },
  });

  const addNewTodo = todoData => mutation.mutate(todoData);
  return {
    ...mutation,
    addNewTodo,
  };
}

// @Desc: delete todo by id
export function useDeleteTodoById() {
  const qc = useQueryClient();
  const mutation = useMutation({
    mutationFn: async id => {
      const res = await axios.delete(`${API}todos/${id}`);
      return res.data.data;
    },
    onSuccess: () => {
      qc.invalidateQueries(["todos"]);
      return true;
    },
  });

  const delTodobyId = id => mutation.mutate(id);

  return {
    ...mutation,
    delTodobyId,
  };
}

// @Desc: patch todo by id
export function usePatchTodoById() {
  const qc = useQueryClient();
  const mutation = useMutation({
    mutationFn: async patchData => {
      // console.log(patchData);
      // console.log(formData);
      const res = await axios.patch(
        `${API}todos/${patchData.id}`,
        patchData.formData
      );
      // console.log(res.data.data);
      return res.data.data;
    },
    onSuccess: () => {
      qc.invalidateQueries(["todos"]);
      return true;
    },
    onError: err => {
      // console.log(err.message);
      return err.message;
    },
  });

  const patchTodoById = patchData => {
    return mutation.mutate(patchData);
  };

  return {
    ...mutation,
    patchTodoById,
  };
}
