import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  timestamp: { type: Date, required: true },
  products: { type: Array, required: true },
  owner: { type: Object, require: true }
});

export const cartModel = mongoose.model("Cart", cartSchema);