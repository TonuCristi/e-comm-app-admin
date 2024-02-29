import mongoose, { Schema } from "mongoose";

const orderSchema = mongoose.Schema(
  {
    type: { type: String, required: true },
    location: { type: String, required: true },
    selling_price: { type: Number, required: true },
    original_price: { type: Number, required: true },
    paid: { type: Boolean, request: true },
    buildingId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
