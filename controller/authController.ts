import { NextFunction, Request, Response } from "express";
const User = require("../model/userModel");
const generateToken = require("../utils/generateToken");

exports.signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(404)
        .json({ error: "Please provide email or password" });
    }
    const user = await User.create(req.body);
    if (user) {
      res.status(200).json({
        user: {
          _id: user._id,
          email: user.email,
        },
      });
    }
  } catch (error) {
    return res.status(401).json({ error: error });
  }
};

exports.login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(404)
        .json({ error: "Please provide email or password" });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password!" });
    }

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({ error: "Invalid email or password!" });
    }

    res.status(200).json({
      jwt: generateToken(user._id),
    });
  } catch (error) {
    return res.status(401).json({ error: error });
  }
};

exports.getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.status(200).json({
      user: {
        id: req.body.user._id,
        email: req.body.user.email,
      },
    });
  } catch (error) {
    return res.status(401).json({ error: error });
  }
};
