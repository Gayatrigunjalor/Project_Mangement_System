import { User } from '../Models/accountSchema.js';
import { Project } from '../Models/projectCreateSchema.js';
import { AssignTask } from '../Models/projectAssignmentSchema.js';
import { Task } from '../Models/taskCreateSchema.js';

const getAllUsersAndAdmins = async (req, res) => {
  try {
    const employee = await User.find({ role: 'employee' });
    const admins = await User.find({ role: 'admin' });

    // Count employee and admins
    const employeeCount = employee.length;
    const adminCount = admins.length;

    // Return the data
    res.json({
      employeeCount,
      employee,
      adminCount,
      admins
    });
  } catch (error) {
    // Handle server errors
    res.status(500).json({ error: 'Server error' });
  }
};

// Assign Project and Tasks
const assignProject = async (req, res) => {
  const { projectName, userEmails, taskNames } = req.body;

  try {
    // Find the project by name
    const projectDetails = await Project.findOne({ projectName: projectName });
    if (!projectDetails) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Find users by their emails
    const users = await User.find({ email: { $in: userEmails } });
    if (users.length !== userEmails.length) {
      return res.status(404).json({ message: 'One or more users not found' });
    }

    // Prepare user and task details
    let userAndTaskDetails = [];

    for (let i = 0; i < users.length; i++) {
      let user = users[i];
      let task = taskNames[i]; // Assuming tasks are assigned in order of users

      userAndTaskDetails.push({
        user: {
          userID: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          CreateAt: user.CreateAt,
        },
        taskDetails: { task: task }
      });
    }

    res.json({
      message: 'Project and tasks assigned successfully',
      projectDetails: {
        projectID: projectDetails._id,
        projectName: projectDetails.projectName,
        description: projectDetails.description,
        createdBy: projectDetails.createdBy,
        createdAt: projectDetails.createdAt,
      },
      userAndTaskDetails: userAndTaskDetails
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const assignTaskToUser = async (req, res) => {
  const { projectName, userEmail, taskName } = req.body;

  try {
    // Find the project by projectName
    const project = await Project.findOne({ projectName });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Find the user by email
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the task by taskName
    const task = await Task.findOne({ taskName });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Create a new AssignTask document
    const assignTask = new AssignTask({
      project: project._id,
      user: user._id,
      task: task._id,
      projectDetails: {
        projectName: project.projectName,
        description: project.description,
        createdBy: project.createdBy,
        createdAt: project.createdAt,
      },
      userDetails: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
      taskDetails: {
        taskName: task.taskName,
        description: task.description,
        status: task.status,
        dueDate: task.dueDate,
      },
    });

    // Save the AssignTask document to the database
    const savedAssignTask = await assignTask.save();

    res.status(201).json({
      message: 'Task assigned successfully',
      assignTask: savedAssignTask,
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Find all tasks
const findAllTasks = async (req, res) => {
  try {
    const taskDetails = await AssignTask.find(); 
    res.status(200).json(taskDetails);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};


export { getAllUsersAndAdmins, assignProject, assignTaskToUser, findAllTasks };