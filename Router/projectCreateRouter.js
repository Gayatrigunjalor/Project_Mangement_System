import express from 'express';
import { createProject, findAllproject, findLoggedInAdminProjects, updateProject, projectStatus, deleteProject } from '../Controllers/projectCreateController.js';
import { verifyToken } from '../Middleware/authentication.js';
import { validatecreateProject, validateupdateProject, validatechangeProjectStatus } from '../Validators/projectCreateValidation.js';
import handleValidationErrors from '../Middleware/handleValidationErrors.js';

const router = express.Router();

router.post('/create', verifyToken, validatecreateProject, handleValidationErrors, createProject);
router.get('/find/all/Projects', findAllproject);
router.get('/find/project', verifyToken, findLoggedInAdminProjects);
router.put('/update/project', verifyToken, validateupdateProject, handleValidationErrors, updateProject);
// router.patch('/change/project/status', verifyToken, validatechangeProjectStatus, handleValidationErrors, projectStatus); 
router.delete('/delete/project', verifyToken, deleteProject); 

export default router;