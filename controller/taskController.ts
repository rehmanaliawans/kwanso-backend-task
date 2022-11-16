import { NextFunction, Request, Response } from "express";
const Task = require("../model/taskModel");

exports.createTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(404).json({ error: "Please provide a task name" });
    }
    const task = await Task.create({
      name: req.body.name,
      userId: req.body.user._id,
    });
    if (task) {
      res.status(200).json({
        task: {
          _id: task._id,
          name: task.name,
        },
      });
    }
  } catch (error) {
    res.status(401).json({ error: error });
  }
};
exports.getTaskList = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await Task.find({ userId: req.body.user._id }).select(
      "_id name",
    );
    res.status(200).json({
      tasks: data,
    });
  } catch (error) {
    res.status(401).json({ error: error });
  }
};
