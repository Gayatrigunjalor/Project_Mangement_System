import express from 'express';
import { resistor, Login, logout,getUserById, getAllUsers } from '../controller/userController.js';

const router = express.Router();

// Define routes and attach handlers
router.post('/resistor', resistor);
router.post('/login', Login);
router.get('/all', getAllUsers); 
router.get('/:id',  getUserById); 
router.post('/logout',  logout);

export default router;
