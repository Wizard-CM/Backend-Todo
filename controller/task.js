import errorHandler from "../middlewares/error.js";
import { task_Model } from "../models/task.model.js";

export const newTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    // Creating a database entry
    await task_Model.create({
      title: title,
      description: description,
      user: req.user,
    });

    res.status(201).json({
      success: true,
      message: "Task Added SuccessFully",
    });
  } catch (error) {
    next(error);
  }
};
export const myTasks = async (req, res, next) => {
  try {
    const userID = req.user._id;
    const allTasks = await task_Model.find({ user: userID });

    res.status(200).json({
      success: true,
      allTasks,
    });
  } catch (error) {
    next(error);
  }
};
export const updateTask = async (req, res, next) => {
  try {
    // Getting the task
    const task = await task_Model.findById(req.params.id);

    if (!task) {
      return next(new errorHandler("Invalid Task Id", 404));
    }

    task.isCompleted = !task.isCompleted;

    // Updating the task
    await task.save();

    res.status(200).json({
      success: true,
      message: "Task Updated",
    });
  } catch (error) {
    next(error);
  }
};
export const deleteTask = async (req, res, next) => {
  try {
    // Getting the task
    const task = await task_Model.findById(req.params.id);

    // Removing the task
    // If user leh tyo todo ko id wrong diyeko cha bhane , check garne condition
    if (!task) {
      return next(new errorHandler("Invalid Task Id", 404));
    }
    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "Task Deleted",
    });
  } catch (error) {
    next(error);
  }
};
