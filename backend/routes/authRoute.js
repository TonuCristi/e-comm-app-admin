import express from "express";
import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: "3d" });
};

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, username, role } = req.body;

  try {
    const user = await User.login(req.body);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({
      username: user.username,
      email,
      role: user.role,
      token,
      createdAt: user.createdAt,
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.post("/signup", async (req, res) => {
  const { email, username, role } = req.body;

  try {
    const user = await User.signup(req.body);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({
      username,
      email,
      role,
      token,
      createdAt: user.createdAt,
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

export default router;
