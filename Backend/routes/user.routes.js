import express from "express";
const router = express.Router();
import { body } from "express-validator";
import { loginUser, registerUser, getUserProfile , logoutUser} from "../controllers/user.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Please enter a valid email addresss"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be atleast 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be atleast 6 characters long"),
  ],
  registerUser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be atleast 6 characters long"),
  ],
  loginUser
);

router.get("/profile", authUser, getUserProfile);

router.get("/logout", authUser, logoutUser);

export default router;
