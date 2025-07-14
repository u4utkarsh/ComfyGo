import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./db/db.js";
import userRoutes from "./routes/user.routes.js";
connectDB();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

export default app;
