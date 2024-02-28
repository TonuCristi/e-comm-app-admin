import express from "express";
import mongoose from "mongoose";
import buildingsRoute from "./routes/buildingsRoute.js";
import cors from "cors";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
// import { User } from "./models/userModel.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
// app.use(cors({}));
// Option 2: Allow Custom Origins
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.get("/", (req, res) => {
  return res.status(200).send("It works!");
});

app.use("/buildings", buildingsRoute);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("App connected to database");
    app.listen(process.env.PORT, () => {
      console.log(`App is listening on port: ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));
