import { isEmpty, logger } from "../utils/helpers.js";
import { errorResponse, successResponse } from "../utils/response.js";
import Task from "../models/task.js";

export const getTasks = async (req, res) => {
  console.log(req.userId);
  const tasks = await Task.find({ userId: req.userId });
  successResponse({ data: tasks, res });
};

export const addTask = async (req, res) => {
  try {
    if (isEmpty(req.body)) {
      throw new Error("Task details are required");
    }
    const task = new Task({ ...req.body, userId: req.userId });
    await task.save();
    successResponse({ data: task, res });
  } catch (error) {
    logger.error(error);
    errorResponse({ code: 400, error, res });
  }
};

export const editTask = async (req, res) => {
  try {
    if (isEmpty(req.body)) {
      throw new Error("Task details are required");
    }
    const { id } = req.params;
    const task = await Task.findOneAndUpdate(
      { _id: id, userId: req.userId },
      req.body,
      {
        new: true,
      }
    );
    if (!task) {
      throw new Error("Task not found");
    }
    successResponse({ data: task, res });
  } catch (error) {
    logger.error(error);
    errorResponse({ code: 404, error, res });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOneAndDelete({
      _id: id,
      userId: req.userId,
    });
    if (!task) {
      throw new Error("Task not found");
    }
    successResponse({ data: task, res });
  } catch (error) {
    logger.error(error);
    errorResponse({ code: 404, error, res });
  }
};
