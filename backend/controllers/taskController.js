import { isEmpty, logger } from "../utils/helpers.js";
import { errorResponse, successResponse } from "../utils/response.js";
import Task from "../models/task.js";

/* Fetching all the tasks belongs to the logged in user */
export const getTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.userId });
  successResponse({ data: tasks, res });
};

/* Adding a new task for the logged in user */
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

/* Editing an existing task. Only the logged in user can edit their own task */
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

/* Deleting an existing task. Only the logged in user can delete their own task */
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
