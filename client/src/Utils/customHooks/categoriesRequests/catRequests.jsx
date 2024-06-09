import React from "react";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
const API = import.meta.env.VITE_CATS_API;

// @Disc: get categories list
export function useGetAllCategories() {
  const {
    data: categoriesData,
    isError: categoriesError,
    isLoading: categoriesLoading,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      try {
        const res = await axios.get(`${API}categories`);
        return res.data.data;
      } catch (error) {
        // console.log(error.message);
        throw new Error(`some thin went wrong, ${error.message}`);
      }
    },
  });

  return { categoriesData, categoriesError, categoriesLoading };
}

// @Desc: delete cat by id
export function useDelCatById() {
  const qc = useQueryClient();
  const mutaion = useMutation({
    mutationFn: async id => {
      await axios.delete(`${API}categories/${id}`);
      return true;
    },
    onSuccess: data => {
      qc.invalidateQueries(["categories"]);
    },
    onError: err => {
      throw new Error(`cant delete this cat, ${err}`);
    },
  });
  const delCatById = id => mutaion.mutate(id);

  return {
    delCatById,
    data: mutaion.data,
    isError: mutaion.isError,
    isLoading: mutaion.isLoading,
    err: mutaion.error,
  };
}

// @Desc: update cate by id
export function usePatchCatById() {
  const mutaion = useMutation({
    mutationFn: async catData => {
      const { id, title } = catData;
      const params = new URLSearchParams();
      params.append("title", title);
      const res = await axios.patch(`${API}categories/${id}`, params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      return res.data.success;
    },

    onError: err => {
      // console.log("err", err);
      throw new Error(`error updating category, ${err}`);
    },
  });

  const patchCatbyId = catData => mutaion.mutate(catData);

  return {
    ...mutaion,
    patchCatbyId,
  };
}

// @Desc: add new category

export function useAddNewCategory() {
  const qc = useQueryClient();
  const mutation = useMutation({
    mutationFn: async title => {
      // console.log(title);
      const res = await axios.post(`${API}categories`, { title });
      // console.log(res);
      return res.data;
    },

    onSuccess: () => {
      qc.invalidateQueries(["categories"]);
    },
  });

  const addNewCat = title => mutation.mutate(title);

  return {
    ...mutation,
    addNewCat,
  };
}
