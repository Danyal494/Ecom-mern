
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunks for API calls
export const getAllOrdersForAdmin = createAsyncThunk(
  "orders/getAllOrdersForAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/orders/get`);
      console.log(response.data.data)
      return response.data.data; // Assuming orders are in 'data'
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed to fetch orders");
    }
  }
);

export const getOrderDetailsForAdmin = createAsyncThunk(
  "orders/getOrderDetailsForAdmin",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/orders/details/${orderId}`);

      return response.data.data; // Assuming order details are in 'data'
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed to fetch order details");
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/admin/orders/update/${orderId}`,
        { orderStatus: status }
      );
      return response.data; // Assuming response contains the updated status
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed to update order status");
    }
  }
);

// Create the slice
const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    currentOrder: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetOrderDetails:(state)=>{
state.currentOrder = null
    }
  },
  extraReducers: (builder) => {
    builder
      // Get All Orders
      .addCase(getAllOrdersForAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllOrdersForAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getAllOrdersForAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Order Details
      .addCase(getOrderDetailsForAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderDetailsForAdmin.fulfilled, (state, action) => {
   
        state.loading = false;
        state.currentOrder = action.payload;

      })
      .addCase(getOrderDetailsForAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Order Status
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updatedOrder = action.payload;
        const index = state.orders.findIndex((order) => order._id === updatedOrder._id);
        if (index !== -1) {
          state.orders[index] = updatedOrder;
        }
        if (state.currentOrder?._id === updatedOrder._id) {
          state.currentOrder = updatedOrder;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetOrderDetails } = orderSlice.actions;  

export default orderSlice.reducer;  
