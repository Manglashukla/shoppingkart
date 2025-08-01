import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    shippingInfo: {
      address: String,
      city: String,
      state: String,
      pinCode: String,
      phoneNo: String,
    },
    orderItems: [
      {
        name: String,
        price: Number,
        quantity: Number,
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      },
    ],
    paymentInfo: {
      id: String,
      status: String,
    },
    itemsPrice: Number,
    totalPrice: Number,
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
