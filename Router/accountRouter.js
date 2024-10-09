import express from 'express';
import { register, login, getUserById, getAllUsers, userProfile, updateLoginData, deleteUserData, logout } from '../Controllers/accountController.js';
import { verifyToken } from '../Middleware/authentication.js';
import { validateAccountSignup, validateUserLogin, validateUserUpdate } from '../Validators/accountValidation.js';
import handleValidationErrors from '../Middleware/handleValidationErrors.js';

const router = express.Router();

router.post('/register', validateAccountSignup, handleValidationErrors, register);
router.post('/login', validateUserLogin, handleValidationErrors, login);
router.get('/all', getAllUsers); 
router.get('/userProfile', verifyToken, userProfile);
router.get('/:id',  getUserById); 
router.put('/update', verifyToken, validateUserUpdate, handleValidationErrors, updateLoginData);
router.delete('/delete', verifyToken, deleteUserData);
router.post('/logout', verifyToken, logout);

export default router;