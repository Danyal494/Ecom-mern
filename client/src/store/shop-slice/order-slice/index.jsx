import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  orderId: null,
  orderList: [],
  orderDetails: null,
};

// COD ORDER: Place new order
export const createCODOrder = createAsyncThunk(
  "/order/createCODOrder",
  async (orderData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/shop/order/cod`,
      orderData
    );
    return response.data;
  }
);

// Get all orders by user
export const getAllOrdersByUserId = createAsyncThunk(
  "/order/getAllOrdersByUserId",
  async (userId) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/shop/order/list/${userId}`
    );
    return response.data;
  }
);

// Get specific order details
export const getOrderDetails = createAsyncThunk(
  "/order/getOrderDetails",
  async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/shop/order/details/${id}`
    );
    return response.data;
  }
);

export const confirmCODOrder = createAsyncThunk(
  '/order/confirmCODOrder',
  async (orderId) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/shop/order/cod/confirm`,  // Ensure this matches your API endpoint
      { orderId }
    );
    return response.data;
  }
);

const shoppingOrderSlice = createSlice({
  name: "shoppingOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create COD Order
      .addCase(createCODOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCODOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderId = action.payload.orderId;
        sessionStorage.setItem(
          "currentOrderId",
          JSON.stringify(action.payload.orderId)
        );
      })
      .addCase(createCODOrder.rejected, (state) => {
        state.isLoading = false;
        state.orderId = null;
      })

      // Fetch user orders
      .addCase(getAllOrdersByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersByUserId.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })

      // Fetch single order details
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetails.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      })
      .addCase(confirmCODOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(confirmCODOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        // Clear the cart in Redux store
        state.cartItems = [];
        sessionStorage.removeItem('cartItems');  // Remove from sessionStorage if necessary
      })
      .addCase(confirmCODOrder.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { resetOrderDetails } = shoppingOrderSlice.actions;
export default shoppingOrderSlice.reducer;
