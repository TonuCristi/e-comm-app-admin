import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export async function requireAuth(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);

    // await User.findOne({ _id }).select("_id");
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: "Request is not authorized" });
  }
}
