const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');  // Import the uuid package

const OrderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    default: () => uuidv4(),  // Automatically generate a unique orderId
    unique: true,              // Ensure the orderId is unique
  },
  userId: String,
  cartId: String,
  cartItems: [
    {
      productId: String,
      title: String,
      image: String,
      price: String,
      salePrice: String,
      quantity: Number,
    },
  ],
  addressInfo: {
    addressId: String,
    address: String,
    city: String,
    pincode: String,
    phone: String,
    notes: String,
  },
  orderStatus: String,
  paymentMethod: String,
  paymentStatus: String,
  totalAmount: Number,
  orderDate: Date,
  orderUpdateDate: Date,
  paymentId: String,
  payerId: String,
});

module.exports = mongoose.model("Order", OrderSchema);
