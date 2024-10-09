import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  projectName: {
    type: String,
    ref: 'Project', 
    required: true,
  },
  taskName: {type: String, required: true},
  description: {type: String, required: true},
  status: {
    type: String,
    enum: {
      values: ['Backlog', 'In Discussion', 'In Progress', 'Done'],
      message: 'Status is not valid',
    },
    default: 'Backlog',
  },
  createdAt: {type: Date, default: Date.now, immutable: true},
});

const Task = mongoose.model('Task', taskSchema);
export { Task };