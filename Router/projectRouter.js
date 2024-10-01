import express from 'express';
import { createProject, findAllproject, findSingleProject, findLoginUserProjects, updateProject, projectStatus, deleteProject } from '../Controllers/projectController.js';
import { verifyToken } from '../Middleware/authentication.js';
import { validatecreateProject, validateupdateProject, validatechangeProjectStatus } from '../Validators/projectValidation.js';
import handleValidationErrors from '../Middleware/handleValidationErrors.js';

const router = express.Router();

router.post('/create/project', verifyToken, validatecreateProject, handleValidationErrors, createProject);
router.get('/find/all/Projects', verifyToken, findAllproject);
router.get('/find/project', verifyToken, findLoginUserProjects);
router.get('/find/single/project', verifyToken, findSingleProject);
router.put('/update/project', verifyToken, validateupdateProject, handleValidationErrors, updateProject);
router.patch('/change/project/status', verifyToken, validatechangeProjectStatus, handleValidationErrors, projectStatus); 
router.delete('/delete/project', verifyToken, deleteProject); 

export default router;