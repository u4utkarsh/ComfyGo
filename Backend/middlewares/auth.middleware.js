import userModel from "../models/user.model.js ";
import captainModel from "../models/captain.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import blacklistTokenModel from "../models/blacklistToken.model.js";

export const authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const isBlacklisted = await blacklistTokenModel.findOne({ token });

  if (isBlacklisted) {
    return res.status(401).json({ message: "token is blacklisted" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);
    if (!user) {
      return res.status(404).json({ message: "User not exists" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const authCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const isBlacklisted = await blacklistTokenModel.findOne({ token });
  if (isBlacklisted) {
    return res.status(401).json({ message: "Token is blacklisted" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await captainModel.findById(decoded._id);
    if (!captain) {
      return res.status(404).json({ message: "Captain not exists" });
    }

    req.captain = captain;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
