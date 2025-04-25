require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./src/routes/auth-route/auth-route");
const adminProductRouter = require("./src/routes/admin-route/product-route");

const shopProductRouter = require("./src/routes/shop-route/product-route");
const shopCartRouter = require("./src/routes/shop-route/cart-route");

const shopAddressRouter = require('./src/routes/shop-route/address-route')
const shopOrderRouter = require('./src/routes/shop-route/order-route')
const shopSearchRouter = require('./src/routes/shop-route/search-routes')
const shopReviewRouter = require('./src/routes/shop-route/review-route')

// Import the admin order router
const adminOrderRouter = require("./src/routes/admin-route/order-route");
const adminFeatureRouter = require("./src/routes/common-routes/feature-route");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("mongodb connected"))
  .catch((error) => console.log(error));

const app = express();
const PORT = process.env.PORT ;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "DELETE", "PUT","PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductRouter);
app.use("/api/shop/products", shopProductRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);

// Add the admin order routes here
app.use("/api/admin/orders", adminOrderRouter);
app.use("/api/common/feature", adminFeatureRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
