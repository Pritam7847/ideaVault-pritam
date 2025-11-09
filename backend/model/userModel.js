import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // User name
  email: { type: String, required: true, unique: true }, // User email
  password: { type: String, required: true  }, // User password
});

const User = mongoose.model("User", userSchema);

export default User;