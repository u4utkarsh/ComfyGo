import userModel from "../models/user.model.js ";
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
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
