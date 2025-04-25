import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isLoading:false,
    searchResult:[]
}

export const getSearchResults= createAsyncThunk(
    "/products/getSearchResults",
    async (keyword) => {
      const result = await axios.get(
        `${import.meta.env.VITE_API_URL}/shop/search/${keyword}`
      );
      return result?.data;
    }
  );


const searchSlice = createSlice({
    name:"searchSlice",
    initialState,
    reducers:{
        resetSearchResult: (state)=>{
            state.searchResult = []
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getSearchResults.pending , (state)=>{state.isLoading = true})
        .addCase(getSearchResults.fulfilled , (state,action)=>{
            state.isLoading = false 
            state.searchResult = action.payload.data 
        }) .addCase(getSearchResults.rejected , (state,action)=>{
            state.isLoading = false 
            state.searchResult = []
        })
    }
})
export const {resetSearchResult} = searchSlice.actions
export default searchSlice.reducer