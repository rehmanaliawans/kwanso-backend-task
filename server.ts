const dotenv = require("dotenv");
const connectDB = require("./config/DB");

dotenv.config({
  path: "./config.env",
});

import { Request, Response, NextFunction } from "express";
const express = require("express");
const Router = require("./router/index");
const morgan = require("morgan");

const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const app = express();
const cors = require("cors");

app.use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const limiter = rateLimit({
  max: 100,
  windowMS: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour",
});

var corsOptions = {
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "authorization",
  ],
};

app.use(cors(corsOptions));

app.use("/", limiter);

app.use(express.json({ limit: "10mb" }));
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

app.use("/", Router);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  res
    .status(404)
    .json({ error: `Can't find ${req.originalUrl} on the server!` });
});

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`run server on ${PORT}`));
