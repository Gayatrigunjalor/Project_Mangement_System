import express from 'express';
import { employeeTaskDashboard } from '../Controllers/employeeTaskDashboardController.js';
import { verifyToken } from '../Middleware/authentication.js';
import handleValidationErrors from '../Middleware/handleValidationErrors.js';

const router = express.Router();

router.get('/employeeTaskDashboard', handleValidationErrors, verifyToken, employeeTaskDashboard);

export default router;