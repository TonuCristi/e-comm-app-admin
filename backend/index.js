import express from "express";
import mongoose from "mongoose";
import buildingsRoute from "./routes/buildingsRoute.js";
import ordersRoute from "./routes/ordersRoute.js";
import authRoute from "./routes/authRoute.js";
import cors from "cors";
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
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/buildings", buildingsRoute);

app.use("/orders", ordersRoute);

app.use("/users", authRoute);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("App connected to database");
    app.listen(process.env.PORT, () => {
      console.log(`App is listening on port: ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));
