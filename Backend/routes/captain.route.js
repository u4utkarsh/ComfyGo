import express from "express";
const router = express.Router();
import { body } from "express-validator";
import { registerCaptain} from "../controllers/captain.controller.js";

router.post("/register", [
    body("email").isEmail().withMessage("Please enter a valid email address"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    body("fullname.firstname").isLength({ min: 3 }).withMessage("First name must be at least 3 characters long"),
    body("vehicle.color").isLength({ min: 3 }).withMessage("Color must be at least 3 characters long"),
    body("vehicle.plate").isLength({ min: 3 }).withMessage("Plate number must be at least 3 characters long"),
    body("vehicle.capacity").isInt().withMessage("Capacity must be atlest 1"),
    body("vehicle.vehicleType").isIn(["car", "bike", "auto"]).withMessage("Invalid vehicle type"),

], registerCaptain);



export default router; 