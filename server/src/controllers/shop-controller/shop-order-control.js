const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

const createCODOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      totalAmount,
      cartId,
    } = req.body;

    // Save the new order with COD-specific defaults
    const newOrder = new Order({
      userId,
      cartId,
      cartItems,
      addressInfo,
      totalAmount,
      orderStatus: "confirmed", 
      paymentMethod: "cash on delivery",
      paymentStatus: "unpaid",
      orderDate: new Date(),
      orderUpdateDate: new Date(),
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Order placed with Cash on Delivery",
      orderId: newOrder._id,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found!",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};


const confirmCODOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    // Simulate order being marked confirmed (e.g., by admin or after delivery)
    // order.orderStatus = "Pending";
    order.orderUpdateDate = new Date();

    // Reduce product stock
    for (let item of order.cartItems) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found: ${item.title}`,
        });
      }

      product.totalStock -= item.quantity;
      await product.save();
    }

    // Delete cart after order placed
    await Cart.findByIdAndDelete(order.cartId);

    await order.save();

    res.status(200).json({
      success: true,
      message: "COD order confirmed",
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};



module.exports = {
  createCODOrder,
  confirmCODOrder,
  getAllOrdersByUser,
  getOrderDetails,
};
