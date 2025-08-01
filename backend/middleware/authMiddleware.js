// backend/middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/userModel.js"; // make sure you have a user model

export const isAuthenticated = async (req, res, next) => {
  const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    res.status(401).json({ error: "Not authorized, token failed" });
  }
};
