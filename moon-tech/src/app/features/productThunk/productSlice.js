import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteProductById, fetchProducts, postProduct } from "./productApi";

const initialState = {
  products: [],
  isLoading: false,
  isError: false,
  error: "",
  postSuccess: false,
  deleteSuccess: false,
};

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const products = fetchProducts();
    return products;
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (data) => {
    const product = postProduct(data);
    return product;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, thunkAPI) => {
    const product = await deleteProductById(id);
    thunkAPI.dispatch(removefromList(id));
    return product;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,

  reducers: {
    togglePostSuccess: (state) => {
      state.postSuccess = false;
    },
    toggleDeleteSuccess: (state) => {
      state.deleteSuccess = false;
    },
    removefromList: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })

      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.products = [];
        state.isError = true;
        state.error = action.error.message;
      })

      .addCase(addProduct.pending, (state) => {
        state.isLoading = true;
        state.postSuccess = false;
        state.isError = false;
      })
      .addCase(addProduct.fulfilled, (state) => {
        state.isLoading = false;
        state.postSuccess = true;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.postSuccess = false;
        state.error = action.error.message;
      })

      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
        state.deleteSuccess = false;
        state.isError = false;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.isLoading = false;
        state.deleteSuccess = true;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.products = [];
        state.isLoading = false;
        state.isError = true;
        state.deleteSuccess = false;
        state.error = action.error.message;
      });
  },
});

export const { togglePostSuccess, toggleDeleteSuccess, removefromList } =
  productSlice.actions;

export default productSlice.reducer;
