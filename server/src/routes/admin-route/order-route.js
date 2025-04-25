const express = require("express");

const {
  getAllOrdersOfAllUsers,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} = require("../../controllers/admin-contoller/order-controller");

const router = express.Router();

router.get("/get", getAllOrdersOfAllUsers);
router.get("/details/:id", getOrderDetailsForAdmin);
router.patch("/update/:id", updateOrderStatus);

module.exports = router;