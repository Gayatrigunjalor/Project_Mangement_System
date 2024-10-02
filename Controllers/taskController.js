import { task } from '../Models/taskSchema.js'; 
import dotenv from 'dotenv';
dotenv.config();

// Create Task
const createTask = async (req, res) => {
    const { taskName, description, status, assignedUser, project, dueDate } = req.body;

    try {
        const newTask = new task({
            taskName,
            description,
            status,
            assignedUser,
            project,
            dueDate
        });

        await newTask.save();
        res.status(201).json({ message: "Task created successfully." });
    } catch (error) {
        res.status(500).json({
            message: "Failed to create task.",
            error: error.message,
        });
    }
};

// Get all tasks
const getAllTasks = async (req, res) => {
    try {
        const tasks = await task.find();
        res.status(200).json({
            message: "Fetched all tasks successfully.",
            tasks,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch tasks.",
            error: error.message,
        });
    }
};

// Update task by ID
const updateTaskById = async (req, res) => {
    const { id } = req.params;
    const { taskName, description, status, dueDate } = req.body;

    try {
        const updatedTask = await task.findByIdAndUpdate(
            id,
            { taskName, description, status, dueDate },
            { new: true } // Return the updated task
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task updated successfully", updatedTask });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update task.",
            error: error.message,
        });
    }
};

// Delete task by taskName
const deleteTaskByName = async (req, res) => {
    const { taskName } = req.body;

    try {
        const deletedTask = await task.findOneAndDelete({ taskName });

        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task deleted successfully." });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete task.",
            error: error.message,
        });
    }
};

export { createTask, getAllTasks, updateTaskById, deleteTaskByName };
