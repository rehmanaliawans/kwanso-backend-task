import { NextFunction, Request, Response } from "express";
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const { promisify } = require("util");

exports.protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({ error: "Please LoggedIn first!" });
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      return res.status(404).json({
        error: "The user belonging to this token does not longer exist",
      });
    }
    req.body.user = currentUser;
    next();
  } catch (error) {
    res.status(401).json(error);
  }
};
