import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  avatar: String,
});

export const UserSchema = mongoose.model("User", userSchema);
