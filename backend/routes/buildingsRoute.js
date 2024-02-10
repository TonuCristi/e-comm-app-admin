import express from "express";
import { Building } from "../models/buildingModel.js";

const router = express.Router();

const fields = [
  "type",
  "location",
  "address",
  "selling_price",
  "original_price",
  "square_meters",
  "nr_floors",
  "nr_rooms",
  "nr_bathrooms",
  "nr_garages",
  "nr_balconies",
  "description",
  "discount_value",
];

function checkField(req, res, field) {
  if (
    (field === "selling_price" && req.body[field] === 0) ||
    (field === "original_price" && req.body[field] === 0) ||
    (field === "square_meters" && req.body[field] === 0) ||
    (field === "nr_floors" && req.body[field] === 0) ||
    (field === "nr_rooms" && req.body[field] === 0)
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

// Route for Save a new building
router.post("/", async (req, res) => {
  try {
    fields.forEach((field) => checkField(req, res, field));

    const newBuilding = {
      type: req.body.type,
      location: req.body.location,
      address: req.body.address,
      selling_price: req.body.selling_price,
      original_price: req.body.original_price,
      square_meters: req.body.square_meters,
      nr_floors: req.body.nr_floors,
      nr_rooms: req.body.nr_rooms,
      nr_bathrooms: req.body.nr_bathrooms,
      nr_garages: req.body.nr_garages,
      nr_balconies: req.body.nr_balconies,
      description: req.body.description,
      discount_value: req.body.discount_value,
    };

    const building = await Building.create(newBuilding);

    const buildings = await Building.find({});

    return res.status(201).send(buildings);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

// Route to Get all buildings form database
router.get("/", async (req, res) => {
  try {
    const buildings = await Building.find({});

    return res.status(200).json(buildings);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

// Route to Get one building form database by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const building = await Building.findById(id);

    return res.status(200).json(building);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

// Route for Update a building
router.put("/:id", async (req, res) => {
  try {
    fields.forEach((field) => checkField(req, res, field));

    const { id } = req.params;

    const result = await Building.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).send({ message: "Building not found!" });
    }

    return res.status(200).send({ message: "Building updated succesfully!" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

// Route for Delete a building
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Building.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).send({ message: "Building not found!" });
    }

    const buildings = await Building.find({});

    return res.status(200).json(buildings);
  } catch (error) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
});

export default router;
