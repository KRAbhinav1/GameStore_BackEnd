import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ['user','publisher','admin'],
      default: "user",
      required: true,
    },
    // phno: {
    //   type: String,
    // },
  },
  {
    timestamps: true,
  }
);

const users = mongoose.model("users", userSchema);

export default  users;



