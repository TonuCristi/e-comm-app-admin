import express from "express";
import { Order } from "../models/orderModel.js";

const router = express.Router();

const fields = ["type", "location", "selling_price", "original_price"];

function checkField(req, res, field) {
  if (
    (field === "selling_price" && req.body[field] === 0) ||
    (field === "original_price" && req.body[field] === 0)
  ) {
    return res
      .status(400)
      .send({ message: `Please complete the "${field}" field!` });
  }

  if (
    req.body[field] === undefined ||
    req.body[field] === null ||
    req.body[field] === ""
  ) {
    return res
      .status(400)
      .send({ message: `Please complete the "${field}" field!` });
  }
}

// Route for Save a new order
router.post("/", async (req, res) => {
  try {
    fields.forEach((field) => checkField(req, res, field));

    const newOrder = {
      type: req.body.type,
      location: req.body.location,
      selling_price: req.body.selling_price,
      original_price: req.body.original_price,
      paid: req.body.paid,
      buildingId: req.body.buildingId,
    };

    await Order.create(newOrder);

    const orders = await Order.find({});

    return res.status(201).send(orders);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

// Route to Get all orders form database
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find({});

    return res.status(200).json(orders);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

// Route to Get one orders form database by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const orders = await Order.findById(id);

    return res.status(200).json(orders);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

// Route for Update a order
router.put("/:id", async (req, res) => {
  try {
    fields.forEach((field) => checkField(req, res, field));

    const { id } = req.params;

    const result = await Order.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).send({ message: "Order not found!" });
    }

    const orders = await Order.find({});

    return res.status(200).json(orders);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

// Route for Delete a order
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Order.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).send({ message: "Order not found!" });
    }

    const orders = await Order.find({});

    return res.status(200).json(orders);
  } catch (error) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
});

export default router;
