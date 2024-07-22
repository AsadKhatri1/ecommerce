import mongoose from "mongoose";
const itemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
  title: {
    type: String,
  },
  price: {
    type: Number,
  },
  qty: {
    type: Number,
  },
  imgSrc: {
    type: String,
  },
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  items: [itemSchema],
});

export const cartModel = mongoose.model("cart", cartSchema);
