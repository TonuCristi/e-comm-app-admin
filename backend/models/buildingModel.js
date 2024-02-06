import mongoose from "mongoose";

const buildingSchema = mongoose.Schema(
  {
    type: { type: String, required: true },
    location: { type: String, required: true },
    address: { type: String, required: true },
    selling_price: { type: Number, required: true },
    original_price: { type: Number, required: true },
    square_meters: { type: Number, required: true },
    nr_floors: { type: Number, required: true },
    nr_rooms: { type: Number, required: true },
    nr_bathrooms: { type: Number, required: true },
    nr_garages: { type: Number, required: true },
    nr_balconies: { type: Number, required: true },
    description: { type: String, required: true },
    discount_value: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Building = mongoose.model("Building", buildingSchema);
