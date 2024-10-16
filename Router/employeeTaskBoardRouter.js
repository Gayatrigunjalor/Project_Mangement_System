import express from 'express';
import { employeeTaskDashboard, updateTaskStatus } from '../Controllers/employeeTaskDashboardController.js';
import { verifyToken } from '../Middleware/authentication.js';
import handleValidationErrors from '../Middleware/handleValidationErrors.js';

const router = express.Router();

router.get('/employeeTaskDashboard', handleValidationErrors, verifyToken, employeeTaskDashboard);
router.put('/update/taskstatus/:taskID', handleValidationErrors, verifyToken, updateTaskStatus);

export default router;