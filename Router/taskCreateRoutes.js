import express from 'express';
import { createTask, getAllTasks, getTaskById, findTasksByStatus, updateTask, deleteTask } from '../Controllers/taskCreateController.js';
import { isAdmin } from '../Middleware/adminMiddleware.js';
import { verifyToken } from '../Middleware/authentication.js';
// import { validateCreateTask, validateUpdateTaskByProjectName, validateDeleteTaskByProjectName} from '../Validators/taskCreateValidation.js';
// import handleValidationErrors from '../Middleware/handleValidationErrors.js';

const router = express.Router();

router.post('/create', verifyToken, isAdmin, createTask);
router.get('/find/all', verifyToken, isAdmin, getAllTasks);
router.get('/find/by/:id', verifyToken, isAdmin, getTaskById);
router.get('/find/task/By/Status', verifyToken, isAdmin, findTasksByStatus);
router.put('/update/by/:id', verifyToken, isAdmin, updateTask);
router.delete('/delete/by/taskname', verifyToken, isAdmin, deleteTask);

export default router;