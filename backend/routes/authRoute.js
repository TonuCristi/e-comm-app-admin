import express from "express";
import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";
import { requireAuth } from "../middleware/requireauth.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: "3d" });
};

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const user = await User.login(req.body);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({
      token,
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.get("/login", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const { id } = jwtDecode(token);

    const user = await User.findById(id);

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const user = await User.signup(req.body);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({
      token,
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.use(requireAuth);

router.put("/changePass/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).send({ error: "User not found!" });
    }

    await User.changePassword(id, req.body.password);

    res.status(200).json({
      message: "Password changed!",
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, "_id username email role createdAt");

    res.status(200).send(users);
  } catch (error) {
    res.status(400).send({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await User.findByIdAndDelete(id);

    const users = await User.find({}, "_id username email role createdAt");

    res.status(200).send(users);
  } catch (error) {
    res.status(400).send({ error: err.message });
  }
});

export default router;
