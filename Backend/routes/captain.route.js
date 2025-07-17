import express from "express";
const router = express.Router();
import { body } from "express-validator";
import { registerCaptain, loginCaptain, getCaptainProfile, logoutCaptain} from "../controllers/captain.controller.js";
import { authCaptain } from "../middlewares/auth.middleware.js";

router.post("/register", [
    body("email").isEmail().withMessage("Please enter a valid email address"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    body("fullname.firstname").isLength({ min: 3 }).withMessage("First name must be at least 3 characters long"),
    body("vehicle.color").isLength({ min: 3 }).withMessage("Color must be at least 3 characters long"),
    body("vehicle.plate").isLength({ min: 3 }).withMessage("Plate number must be at least 3 characters long"),
    body("vehicle.capacity").isInt().withMessage("Capacity must be atlest 1"),
    body("vehicle.vehicleType").isIn(["car", "bike", "auto"]).withMessage("Invalid vehicle type"),

], registerCaptain);

router.post("/login", [
  body("email").isEmail().withMessage("Please enter a valid email address"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
], loginCaptain);

router.get("/profile", authCaptain, getCaptainProfile);

router.get("/logout", authCaptain, logoutCaptain)



export default router; 