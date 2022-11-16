import { NextFunction } from "express";

const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 8,
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function (this: any, next: NextFunction) {
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  newPassword: string,
  userPassword: string,
) {
  return await bcrypt.compare(newPassword, userPassword);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
