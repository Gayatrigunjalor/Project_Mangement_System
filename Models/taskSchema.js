import mongoose from 'mongoose';
import { getCurrentISTDateTime } from '../Time/times.js';

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  taskName: { 
    type: String, 
    required: [true, 'Task name is required'] 
  },
  description: { 
    type: String, 
    required: [true, 'Description is required'] 
  },
  status: { 
    type: String,
    enum: {
      values: ['Backlog', 'In Discussion', 'In Progress', 'Done'],
      message: 'Status is not valid' 
    },
    default: 'Backlog' 
  },
  assignedUser: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: [true, 'Assigned user is required'] 
  },
  project: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Project', 
    required: [true, 'Project is required'] 
  },
  assignDate: { 
    type: String, 
    default: getCurrentISTDateTime, 
    immutable: true 
  },
  dueDate: { 
    type: String, 
    required: [true, 'Due date is required'] 
  },
});

const task = mongoose.model('Task', taskSchema);
export { task };
