import express from "express";
import { body } from "express-validator";
import { createRideController } from "../controllers/ride.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/create",
  authUser,
  body("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("invalid pickup location"),
  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid destination location"),
  body("vehicleType")
    .isString()
    .isIn(["car", "bike", "auto"])
    .withMessage("Invalid vehicle type"),
  createRideController
);

export default router;
