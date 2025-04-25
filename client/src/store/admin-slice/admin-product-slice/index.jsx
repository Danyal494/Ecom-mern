import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



const initialState = {
  isLoading: false,
  productList: [],
};

export const addNewProduct = createAsyncThunk(
  "/products/addNewProduct",
  async (FormData) => {
    const result = await axios.post(
     ` ${import.meta.env.VITE_API_URL}/admin/products/add`,
      FormData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return result?.data;
  }
);
export const fetchAllProduct = createAsyncThunk(
  "/products/fetchAllProduct",
  async () => {
    const result = await axios.get(
     ` ${import.meta.env.VITE_API_URL}/admin/products/get`
    );
    return result?.data;
  }
);
export const editProduct = createAsyncThunk(
  "/products/editProduct",
  async ({ id, formData }) => {  // ✅ Correctly destructure the object
    const result = await axios.put(
      `${import.meta.env.VITE_API_URL}/admin/products/edit/${id}`,
      formData, // ✅ Send the correct payload
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return result?.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "/products/deleteProduct",
  async (id) => {
    const result = await axios.delete(
      `${import.meta.env.VITE_API_URL}/admin/products/delete/${id}`
    );
    return result?.data;
  }
);

const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProduct.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllProduct.rejected, (state, action) => {

        state.isLoading = false;
        state.productList = []
      })
  },
});


export default AdminProductsSlice.reducer