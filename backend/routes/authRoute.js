import express from "express";
import { User } from "../models/userModel.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    // const user = await User.create({ username, email, password, role });
    // res.status(201).json(user);

    const user = await User.signup(req.body);
    res.status(200).json(user);
  } catch (err) {
    // const errors = handleErrors(err);
    res.status(400).send(err.message);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  return res.status(200).json("login");
});

export default router;
