// backend/controllers/productController.js
import Product from "../models/Product.js";
import mongoose from "mongoose";
import ApiFeatures from "../utils/apiFeatures.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";

// @desc    Get all products
// @route   GET /api/v1/products
// @access  Public
export const getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const productsCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  const products = await apiFeature.query;

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
  });
});

// @desc    Get single product by ID
// @route   GET /api/v1/products/:id
// @access  Public
export const getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isValidId) {
    return next(new ErrorHandler("Invalid product ID", 400));
  }

  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({ success: true, product });
});

// @desc    Create new product
// @route   POST /api/v1/admin/product/new
// @access  Admin
export const createProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, product });
});

// @desc    Update product by ID
// @route   PUT /api/v1/admin/product/:id
// @access  Admin
export const updateProduct = catchAsyncErrors(async (req, res, next) => {
  const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isValidId) {
    return next(new ErrorHandler("Invalid product ID", 400));
  }

  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({ success: true, product });
});

// @desc    Delete product by ID
// @route   DELETE /api/v1/admin/product/:id
// @access  Admin
export const deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isValidId) {
    return next(new ErrorHandler("Invalid product ID", 400));
  }

  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  await product.deleteOne();
  res.status(200).json({ success: true, message: "Product deleted successfully" });
});
