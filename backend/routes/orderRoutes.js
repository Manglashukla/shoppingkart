// routes/orderRoutes.js
import express from "express";
import {
  getMyOrders,
  getOrderById,
} from "../controllers/orderController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import Order from "../models/orderModel.js";

const router = express.Router();

// ✅ POST /api/v1/orders - Create a new order
router.post("/orders", isAuthenticated, async (req, res) => {
  try {
    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      totalPrice,
    } = req.body;

    const order = await Order.create({
      user: req.user._id, // Associate order with logged-in user
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      totalPrice,
    });

    res.status(201).json({ success: true, order });
  } catch (error) {
    console.error("Order creation failed:", error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ GET /api/v1/orders/my-orders - Get all orders for the logged-in user
router.get("/orders/my-orders", isAuthenticated, getMyOrders);

// ✅ GET /api/v1/orders/:id - Get a single order by ID
router.get("/orders/:id", isAuthenticated, getOrderById);

export default router;
