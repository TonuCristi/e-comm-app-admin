import express from "express";
import { User } from "../models/userModel.js";

const router = express.Router();

// handle errors
function handleErrors(err) {
  const errors = { username: "", email: "", password: "", role: "" };

  // duplicate error code
  if (err.code === 11000) {
    errors.email = "This email is already taken";
    return errors;
  }

  // validation errors
  if (err.message.toLowerCase().includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties: { path, message } }) => {
      errors[path] = message;
    });
  }

  return errors;
}

router.get("/signup", (req, res) => {
  return res.status(200).json("signup");
});

router.get("/login", (req, res) => {
  return res.status(200).json("login");
});

router.post("/signup", async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const user = await User.create({ username, email, password, role });
    res.status(201).json(user);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).send(errors);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  return res.status(200).json("login");
});

export default router;
