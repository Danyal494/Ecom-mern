import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



const initialState = 
{
    isLoading : false,
    addressList : [],

}


export const addNewAddress = createAsyncThunk('/address/addNewAdress' , async(formData)=>{
    const reponse = await axios.post(`${import.meta.env.VITE_API_URL}/shop/address/add`,formData)
    return reponse.data
})

export const fetchAllAdress = createAsyncThunk('/address/fetchAllAdress' , async(userId)=>{
    const reponse = await axios.get(`${import.meta.env.VITE_API_URL}/shop/address/get/${userId}`)
    return reponse.data
})

export const deleteAdress = createAsyncThunk('/address/deleteAddress', async ({ userId, addressId }) => {
    const response = await axios.delete(`${import.meta.env.VITE_API_URL}/shop/address/delete/${userId}/${addressId}`);
    return response.data;
});

export const editAdress = createAsyncThunk('/address/editAddress', async ({ userId, addressId, formData }) => {
    const response = await axios.put(`${import.meta.env.VITE_API_URL}/shop/address/update/${userId}/${addressId}`, formData);
    return response.data;
});



const addressSlice= createSlice({
    name:'address',
    initialState,
    reducers:{},
    extraReducers:(builder)=> {
        builder.addCase(addNewAddress.pending,(state)=>{
            state.isLoading = false
        })
        .addCase(addNewAddress.fulfilled,(state,action)=>{
            state.isLoading = false
            state.addressList = action.payload.data
        })
        .addCase(addNewAddress.rejected,(state)=>{
            state.isLoading = true
            state.addressList = []
        })


        .addCase(fetchAllAdress.pending,(state)=>{
            state.isLoading = false
        })
        .addCase(fetchAllAdress.fulfilled,(state,action)=>{
            state.isLoading = false
            state.addressList = action.payload.data
        })
         .addCase(fetchAllAdress.rejected,(state)=>{
            state.isLoading = true
            state.addressList = []
        })


        // .addCase(editAdress.pending,(state)=>{
        //     state.isLoading = false
        // })
        // .addCase(editAdress.fulfilled,(state,action)=>{
        //     state.isLoading = false
        //     state.addressList = action.payload.data
        // })
        //  .addCase(editAdress.rejected,(state)=>{
        //     state.isLoading = true
        //     state.addressList = []
        // })

        // .addCase(deleteAdress.pending,(state)=>{
        //     state.isLoading = false
        // })
        // .addCase(deleteAdress.fulfilled,(state,action)=>{
        //     state.isLoading = false
        //     state.addressList = action.payload.data
        // })
        //  .addCase(deleteAdress.rejected,(state)=>{
        //     state.isLoading = true
        //     state.addressList = []
        // })

     
    }
})

export default addressSlice.reducer