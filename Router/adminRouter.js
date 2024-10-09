import express from 'express';
import { getAllUsersAndAdmins, assignProject, assignTaskToUser, findAllTasks } from '../Controllers/adminController.js'; 
import { isAdmin } from '../Middleware/adminMiddleware.js';
import { verifyToken } from '../Middleware/authentication.js';

const router = express.Router();

// Define the route to get all users and admins
router.get('/all/admin/user',verifyToken, isAdmin, getAllUsersAndAdmins);

// Route to assign a project and tasks to users
router.post('/project/assign', verifyToken, isAdmin, assignProject);

// Route to assign a task to a user
router.post('/assign/task', verifyToken, isAdmin, assignTaskToUser);

// Route to find all tasks
router.get('/find/all/task', findAllTasks);

export default router;