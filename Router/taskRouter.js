import express from 'express';
import { createTask, getAllTasks, updateTaskById, deleteTaskByName } from '../Controllers/taskController.js';

const router = express.Router();

router.post('/create', createTask);         
router.get('/', getAllTasks);               
router.put('/update/:id', updateTaskById);  
router.delete('/delete', deleteTaskByName); 

export default router;
