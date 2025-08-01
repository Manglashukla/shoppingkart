import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import Product from "../models/Product.js";

const __dirname = path.resolve();

// ✅ Load .env from backend folder
dotenv.config({ path: path.join(__dirname, "backend/.env") });

// ✅ Correct path: products.json is in same folder as seeder.js
const dataPath = path.join(__dirname, "backend/data/products.json");

// ✅ Load and parse product data
const products = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("🔄 Removing old products...");
    await Product.deleteMany();

    console.log("🌱 Seeding new products...");
    await Product.insertMany(products);

    console.log("✅ Products seeded successfully!");
    process.exit();
  })
  .catch((err) => {
    console.error("❌ Seeder error:", err);
    process.exit(1);
  });
