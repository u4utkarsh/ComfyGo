import mongoose from "mongoose";

const blacklistTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '1d', // Automatically remove the token after 1 day
  },
});

const blacklistTokenModel = mongoose.model("blacklistToken", blacklistTokenSchema);

export default blacklistTokenModel;
