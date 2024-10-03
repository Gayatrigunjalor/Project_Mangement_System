import express from 'express';
import { createNewTask, findAllTask, findTaskByAssignedUser, findTasksByStatus, updateTaskByProjectName, deleteTaskByProjectName } from '../Controllers/taskController.js';
import { verifyToken } from '../Middleware/authentication.js';
import { validateCreateTask, validateUpdateTaskByProjectName, validateDeleteTaskByProjectName} from '../Validators/taskValidation.js';
import handleValidationErrors from '../Middleware/handleValidationErrors.js';

const router = express.Router();

router.post('/create',validateCreateTask, handleValidationErrors, verifyToken, createNewTask);
router.get('/find/all', findAllTask);
router.get('/find/task/By/AssignedUser', verifyToken, findTaskByAssignedUser);
router.get('/find/task/By/Status', findTasksByStatus);
router.put('/update',validateUpdateTaskByProjectName, handleValidationErrors, verifyToken, updateTaskByProjectName);
router.delete('/delete',validateDeleteTaskByProjectName, handleValidationErrors, verifyToken, deleteTaskByProjectName);

export default router;