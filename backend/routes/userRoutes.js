// backend/routes/userRoutes.js
import express from "express";
import {
  registerUser,
  loginUser,
  logout,
  getUserDetails,
  getMe, // ✅ Import the new controller
} from "../controllers/userController.js";

import { isAuthenticatedUser } from "../middleware/auth.js";

const router = express.Router();

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);

// ✅ Protected Routes
router.get("/me", isAuthenticatedUser, getMe); // <-- Replaced old handler with new getMe
router.get("/profile", isAuthenticatedUser, getUserDetails); // (optional, used in Profile page)

export default router;
