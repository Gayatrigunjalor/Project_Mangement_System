import { Project } from '../Models/projectCreateSchema.js';
import dotenv from 'dotenv';
dotenv.config();

//createproject route 
const createProject = async (req, res, next) => {
  const { projectName, description } = req.body;
  const { email, role } = req.user;

  try {
    // Check if the user is an admin
    if (role !== 'admin') {
      const err = new Error("Only admin users can create projects");
      err.status = 403; // Forbidden
      return next(err);
    }

    if (!projectName || !description) {
      const err = new Error("project Name, description are required")
      err.status = 404;
      return next(err)
    }

    const existingProject = await Project.findOne({ projectName, createdBy: email });
    if (existingProject) {
      const err = new Error("Project already exist...")
      err.status = 400;
      return next(err)
    }

    const project = new Project({
      projectName,
      description,
      createdBy: req.user.email,
    });

    await project.save();
    res.status(200).json({ message: "Project ceated successfully.", project: project });
  } catch (error) {
    const err = new Error("Server Error !")
    err.status = 500;
    return next(err)
  }
};

//  find All project
const findAllproject = async (req, res, next) => {
  try {
    const projects = await Project.find({});
    res.status(200).json({ message: "find all Project successfully.", project: projects });
  } catch (error) {
    console.error(error);
    const err = new Error("Internal server error!")
    err.status = 500;
    return next(err)
  }
};

//find single project 
const findSingleProject = async (req, res, next) => {
  try {
    const { projectName } = req.body;
    const project = await Project.findOne({ projectName });

    if (!project) {
      const err = new Error("Project not found !")
      err.status = 404;
      return next(err)
    }

    res.status(200).json({ project });
  } catch (error) {
    console.error(error);
    const err = new Error("Internal server error !")
    err.status = 500;
    return next(err)
  }
};

// Get Logged-in User's Projects
const findLoggedInAdminProjects = async (req, res, next) => {
  try {
    // Find projects where the logged-in admin (user) is the creator of the project
    const projects = await Project.find({ createdBy: req.user.email });

    if (!projects || projects.length === 0) {
      return res.status(404).json({ message: "No projects found for this admin." });
    }

    // Get the count of projects
    const totalProject = projects.length;

    res.status(200).json({ message: "Projects found successfully.", totalProject, projects });
  } catch (error) {
    console.error(error);
    const err = new Error("Server Error!");
    err.status = 500;
    return next(err);
  }
};


// Update Logged-in User's Project
const updateProject = async (req, res, next) => {
  const { projectName, newName, description, status } = req.body;
  const { admiEmail } = req.user;

  try {
    const existingProject = await Project.findOne({ projectName, createdBy: admiEmail });
    if (!existingProject) {
      const err = new Error("Project not found for updation")
      err.status = 404;
      return next(err)
    }

    const updatedProject = await Project.findOneAndUpdate(
      { projectName, createdBy: admiEmail },
      {
        projectName: newName || existingProject.projectName,
        description: description || existingProject.description,
        status: status || existingProject.status
      },
      { new: true }
    );

    res.status(200).json({ message: "Project updated successfully.", updatedProject });
  } catch (error) {
    console.error(error);
    const err = new Error("Server Error !")
    err.status = 500;
    return next(err)
  }
}

// Change Project Status (log in user)
const projectStatus = async (req, res, next) => {
  try {
    const { projectName, status } = req.body;
    const admiEmail = req.user.email;

    const project = await Project.findOneAndUpdate(
      { projectName, user: admiEmail },
      { status },
      { new: true }
    );

    if (!project) {
      const err = new Error("Project not found !")
      err.status = 404;
      return next(err)
    }
    res.status(200).json({ message: 'Project status updated successfully', project });

  } catch (error) {
    console.error(error);
    const err = new Error("Internal server error !")
    err.status = 500;
    return next(err)
  }
};

// Delete project by projectName(log in user)
const deleteProject = async (req, res, next) => {
  try {
    const { projectName } = req.body;
    const admiEmail = req.user.email;
    const project = await Project.findOneAndDelete({ projectName, createdBy: admiEmail });

    if (!project) {
      const err = new Error("Project not found!")
      err.status = 404;
      return next(err)
    }
    res.status(200).json({ message: 'Project deleted successfully' });

  } catch (error) {
    console.error(error);
    const err = new Error("Internal server error!")
    err.status = 500;
    return next(err)
  }
};

export { createProject, findAllproject, findSingleProject, findLoggedInAdminProjects, updateProject, projectStatus, deleteProject };