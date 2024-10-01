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


//  findAllproject route
const findAllproject = async (req, res) => {
  try {
    const usermail = req.user.email;
    const projects = await Project.find({ user: usermail });
    res.status(200).json({ projects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


    //findsingleproject route
const findSingleProject = async (req, res) => {
  try {
    const { projectId } = req.params.id;

    const project = await Project.findOne({ _id: projectId });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

 
// Update project by id 
const updateProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const usermail = req.user.email;
    const updatedData = req.body;

    const project = await Project.findOneAndUpdate(
      { _id: projectId, user: usermail },
      updatedData,
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ message: 'Project not found or unauthorized' });
    }

    res.status(200).json({ message: 'Project updated successfully', project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Change Project Status
const projectStatus = async (req, res) => {
  try {
    const { projectName, status } = req.body;
    const usermail = req.user.email;

    const project = await Project.findOneAndUpdate(
      { projectName, user: usermail },
      { status },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ message: 'Project status updated successfully', project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

  // Delete project by projectName
const deleteProject = async (req, res) => {
  try {
    const { projectName } = req.body;
    const usermail = req.user.email;

    const project = await Project.findOneAndDelete({ projectName, user: usermail });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export { createProject, findAllproject, findSingleProject, updateProject, projectStatus, deleteProject };