import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



const initialState = 
{
    isLoading : false,
    productList : [],
    productDetail: null,
}

export const fetchAllFilteredProducts= createAsyncThunk(
    "/products/fetchAllFilteredProducts",
    async ({filterParams,sortParams}) => {

      const query = new URLSearchParams({
        ...filterParams,sortBy : sortParams
      })

      const result = await axios.get(
        `${import.meta.env.VITE_API_URL}/shop/products/get?${query}`
      );
      return result?.data;
    }
  );
export const fetchProductDetail= createAsyncThunk(
    "/products/fetchProductDetail",
    async (id) => {
      const result = await axios.get(
        `${import.meta.env.VITE_API_URL}/shop/products/get/${id}`
      );
      return result?.data;
    }
  );

const ShoppingProductSlice = createSlice({
 name:'shoppingProducts',
 initialState,
 reducers : {
  setProductDetails: (state,action) => {
     state.productDetail= null
  }
 },
 extraReducers : (builder)=>{
     builder.addCase(fetchAllFilteredProducts.pending,(state,action) =>{
        state.isLoading=true
     })
     .addCase(fetchAllFilteredProducts.fulfilled,(state,action) =>{
        console.log(action.payload,"payload")
        state.isLoading=false
        state.productList=action.payload.data
     })
     .addCase(fetchAllFilteredProducts.rejected,(state,action) =>{

        state.isLoading=false
        state.productList=[]
     }).addCase(fetchProductDetail.pending,(state,action) =>{
      state.isLoading=true
   })
   .addCase(fetchProductDetail.fulfilled,(state,action) =>{
      
      state.isLoading=false
      state.productDetail=action.payload.data
   })
   .addCase(fetchProductDetail.rejected,(state,action) =>{

      state.isLoading=false
      state.productDetail= null
   })
 }
})

export const {setProductDetails} = ShoppingProductSlice.actions

export default ShoppingProductSlice.reducer