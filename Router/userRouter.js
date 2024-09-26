import express from 'express';
import { register, login, getUserById, getAllUsers, userProfile, updateLoginData, deleteUserData, logout } from '../Controller/userController.js';
import { verifyToken } from '../Middleware/authentication.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/all', getAllUsers); 
router.get('/userProfile', verifyToken, userProfile);
router.get('/:id',  getUserById); 
router.put('/update', verifyToken, updateLoginData);
router.delete('/delete', verifyToken, deleteUserData);
router.post('/logout', verifyToken, logout);

export default router;