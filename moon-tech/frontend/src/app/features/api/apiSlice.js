import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
  }),

  tagTypes: ["Products", "User"],

  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({ url: "/api/products" }),
      providesTags: ["Products"],
    }),

    addProduct: builder.mutation({
      query: (data) => ({
        url: "/api/product",
        method: "POST",
        body: data,
      }),
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/api/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
} = productApi;
