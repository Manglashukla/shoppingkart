import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import Product from "../models/Product.js";
import User from "../models/User.js";

const __dirname = path.resolve();

// ✅ Load .env from backend folder
dotenv.config({ path: path.join(__dirname, "backend/.env") });

// ✅ Correct path: products.json is in same folder as seeder.js
const dataPath = path.join(__dirname, "backend/data/products.json");

// ✅ Load and parse product data
const productsData = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("🔄 Removing old users and products...");
    await Product.deleteMany();
    await User.deleteMany();

    console.log("👤 Creating default admin user...");
    const adminUser = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "password123",
      role: "admin",
      avatar: {
        public_id: "default_avatar",
        url: "https://example.com/avatar.png"
      }
    });

    console.log("🌱 Seeding new products...");
    const products = productsData.map(product => ({
      ...product,
      user: adminUser._id
    }));
    
    await Product.insertMany(products);

    console.log("✅ Products and admin user seeded successfully!");
    process.exit();
  })
  .catch((err) => {
    console.error("❌ Seeder error:", err);
    process.exit(1);
  });
