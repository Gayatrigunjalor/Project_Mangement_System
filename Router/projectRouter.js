import express from 'express';
import { createProject, findAllproject, findSingleProject, updateProject, projectStatus, deleteProject } from '../Controllers/projectController.js';
import { verifyToken } from '../Middleware/authentication.js';

const router = express.Router();

router.post('/create', verifyToken, createProject);
router.get('/allProjects', verifyToken, findAllproject);
router.get('/findProject/:id', verifyToken, findSingleProject);
router.put('/updateProject/:id', verifyToken, updateProject);
router.patch('/updateStatus', verifyToken, projectStatus); 
router.delete('/delete', verifyToken, deleteProject); 

export default router;
