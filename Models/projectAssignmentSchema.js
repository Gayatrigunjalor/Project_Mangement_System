import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const assignTaskSchema = new Schema({
  project: {
    type: String,
    ref: 'Project',
    required: true,
  },
  user: {
    type: String,
    ref: 'User',
    required: true,
  },
  task: {
    type: String,
    ref: 'Task',
    required: true,
  },
  projectDetails: {
    projectName: { type: String, required: true },
    description: { type: String },
    createdBy: { type: String },
    createdAt: { type: Date },
  },
  userDetails: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String },
  },
  taskDetails: {
    taskName: { type: String, required: true },
    description: { type: String },
    status: { type: String },
    dueDate: { type: Date },
  },
  assignedAt: { type: Date, default: Date.now },
});

const AssignTask = mongoose.model('AssignTask', assignTaskSchema);
export { AssignTask };