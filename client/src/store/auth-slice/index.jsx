
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

export const registerUserAction = createAsyncThunk('/auth/register', 
  async(formData) =>{
    const response =  await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`,formData,{
      withCredentials:true,
    })
    return response.data
  }

)
export const loginUserAction = createAsyncThunk('/auth/login', 
  async(formData) =>{
    const response =  await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`,formData,{
      withCredentials:true,
    })
    return response.data
  }

)
export const logoutUserAction = createAsyncThunk('/auth/logout', 
  async(formData) =>{
    const response =  await axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`,{},{
      withCredentials:true,
    })
    return response.data
  }

)

export const CheckAuthAction = createAsyncThunk('/auth/checkauth', 
  async() => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/check-auth`, { 
      withCredentials: true,
      headers: {
        'Cache-Control': 'no-store,no-cache,must-revalidate,proxy-revalidate',
        'Expires': '0'
      }
    });
    return response.data // flatten payload here
  }

)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers:{
    setUser:(state,action)=>{

    }
  },
  extraReducers: (builder) =>{
    builder.addCase(registerUserAction.pending , (state) =>{
      state.isLoading = true
    }).addCase(registerUserAction.fulfilled,(state,action) =>{
      state.isLoading= false 
      state.user = action.payload.user;
      state.isAuthenticated = false;
    }).addCase(registerUserAction.rejected,(state,action) =>{
      state.isLoading= false 
      state.user= null
      state.isAuthenticated=false
    })
    builder.addCase(loginUserAction.pending , (state) =>{
      state.isLoading = true
    }).addCase(loginUserAction.fulfilled,(state,action) =>{
      state.isLoading= false 
      state.user = action.payload.success ?  action.payload.user : null;
      state.isAuthenticated = action.payload.success 
      
    }).addCase(loginUserAction.rejected,(state,action) =>{
      state.isLoading= false 
      state.user= null
      state.isAuthenticated=false
    })
    builder.addCase(CheckAuthAction.pending , (state) =>{
      state.isLoading = true
    }).addCase(CheckAuthAction.fulfilled,(state,action) =>{
      state.isLoading= false 
      state.user = action.payload.success ?  action.payload.user : null;
      state.isAuthenticated = action.payload.success 
      
    }).addCase(CheckAuthAction.rejected,(state,action) =>{
      state.isLoading= false 
      state.user= null
      state.isAuthenticated=false
    }).addCase(logoutUserAction.fulfilled,(state,action) =>{
      state.isLoading= false 
      state.user =  null;
      state.isAuthenticated = false
      
    })
  }
});


export const {setUser} = authSlice.actions
export default authSlice.reducer