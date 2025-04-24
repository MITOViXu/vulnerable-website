import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5001" }),
  reducerPath: "adminApi",
  tagTypes: ["Attacker"],
  endpoints: (build) => ({
    // Các endpoint mới cho Attacker
    getAllAttackers: build.query({
      query: () => "attacker/getAll",
      providesTags: ["Attacker"],
    }),
    getAttackerById: build.query({
      query: (id) => `attacker/${id}`,
      providesTags: ["Attacker"],
    }),
    addAttacker: build.mutation({
      query: (attacker) => ({
        url: "attacker/create",
        method: "POST",
        body: attacker,
      }),
      invalidatesTags: ["Attacker"],
    }),
    updateAttacker: build.mutation({
      query: ({ id, ...data }) => ({
        url: `attacker/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Attacker"],
    }),
    deleteAttacker: build.mutation({
      query: (id) => ({
        url: `attacker/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Attacker"],
    }),
  }),
});

export const {
  // Các hook mới cho Attacker
  useGetAllAttackersQuery,
  useGetAttackerByIdQuery,
  useAddAttackerMutation,
  useUpdateAttackerMutation,
  useDeleteAttackerMutation,
} = api;
