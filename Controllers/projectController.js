import { Project } from '../Models/projectSchema.js';
import dotenv from 'dotenv';
dotenv.config();

//createproject route 
const createProject = async (req, res, next) => {
  const { projectName, description } = req.body;
  const { email } = req.user;

  try {
    if (!projectName || !description) {
      const err = new Error("project Name, description are required")
      err.status = 404;
      return next(err)
    }

    const existingProject = await Project.findOne({ projectName, user: email });
    if (existingProject) {
      const err = new Error("Project already exist...")
      err.status = 400;
      return next(err)
    }

    const project = new Project({
      projectName,
      description,
      user: req.user.email,
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
const findLoginUserProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({ user: req.user.email });
    res.status(200).json({ message: "Project find successfully.", project: projects });
  } catch (error) {
    const err = new Error("Server Error !")
    err.status = 500;
    return next(err)
  }
};


// Update Logged-in User's Project
const updateProject = async (req, res, next) => {
  const { projectName, newName, description, status } = req.body;
  const { email } = req.user;

  try {
    const existingProject = await Project.findOne({ projectName, user: email });
    if (!existingProject) {
      const err = new Error("Project not found for updation")
      err.status = 404;
      return next(err)
    }

    const updatedProject = await Project.findOneAndUpdate(
      { projectName, user: email },
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
    const usermail = req.user.email;

    const project = await Project.findOneAndUpdate(
      { projectName, user: usermail },
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
    const usermail = req.user.email;
    const project = await Project.findOneAndDelete({ projectName, user: usermail });

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

export { createProject, findAllproject, findSingleProject, findLoginUserProjects, updateProject, projectStatus, deleteProject };