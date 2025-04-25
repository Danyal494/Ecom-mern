const express = require("express");

const {
  createCODOrder,
  getAllOrdersByUser,

  getOrderDetails,
  confirmCODOrder,
} = require("../../controllers/shop-controller/shop-order-control");



const router = express.Router();

// Place a new COD order
router.post("/cod", createCODOrder);

// Confirm a COD order (e.g., by admin or after delivery)
router.post("/cod/confirm", confirmCODOrder);

// Get all orders by user ID
router.get("/list/:userId", getAllOrdersByUser);


// Get details of a specific order
router.get("/details/:id", getOrderDetails);

module.exports = router;
