import { Task } from '../Models/taskCreateSchema.js';
import { Project } from '../Models/projectCreateSchema.js';

// Create Task
const createTask = async (req, res) => {
    const { projectName, taskName, description } = req.body;

    try {
        // Check if the project exists
        const existingProject = await Project.findOne({ projectName });
        if (!existingProject) {
            return res.status(400).json({ message: "Project does not exist..." });
        }
        
        // Create a new task using the existing project name
        const task = new Task({
            projectName: existingProject.projectName,
            taskName,
            description,
        });

        const taskDetails = await task.save();
        return res.status(201).json({projectDetails:existingProject,taskDetails});
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

// Get All Tasks
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Task by ID
const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Task
const updateTask = async (req, res) => {
    const { taskName, description, status, dueDate } = req.body;

    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            { taskName, description, status, dueDate },
            { new: true, runValidators: true }
        );
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete Task
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export { createTask, updateTask, getAllTasks, getTaskById, deleteTask }