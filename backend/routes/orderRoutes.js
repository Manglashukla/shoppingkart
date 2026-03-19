// backend/routes/orderRoutes.js
import express from "express";
import {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController.js";

import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

router.post("/new", isAuthenticatedUser, newOrder);
router.get("/me", isAuthenticatedUser, myOrders);
router.get("/:id", isAuthenticatedUser, getSingleOrder);

// Admin routes
router.get("/", isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);
router.put("/:id", isAuthenticatedUser, authorizeRoles("admin"), updateOrder);
router.delete("/:id", isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

export default router;
