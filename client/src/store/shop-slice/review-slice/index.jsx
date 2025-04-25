import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isLoading: false,
    reviews : []
}


export const addNewReview = createAsyncThunk("/order/addReview",async(data)=>{
    const response = await axios.post( `${import.meta.env.VITE_API_URL}/shop/review/add`,data)
    return response.data
})
export const getReviews = createAsyncThunk("/order/getReview",async(id)=>{
    const response = await axios.get( `${import.meta.env.VITE_API_URL}/shop/review/${id}`)
    return response.data
})


const ShoppingReviewSlice = createSlice({
name:'shoppingreviews' ,
initialState,
reducers:{},
extraReducers:(builder)=>{
    builder.addCase(getReviews.pending,(state)=>{
        state.isLoading = false
    }).addCase(getReviews.fulfilled,(state,action)=>{
        state.isLoading = true
        state.reviews = action.payload.data
    }).addCase(getReviews.rejected,(state)=>{
        state.isLoading = false
        state.reviews = []
    })
}
})


export default ShoppingReviewSlice.reducer