import mongoose from 'mongoose';
import { getCurrentISTDateTime } from '../Time/times.js'
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  projectName:{type: String, required: true},
  description: {type: String},
  user: {type: String, ref: 'User', required:true},
  status: {type: String, enum: ['active', 'canceled'], default: 'active'},
  createdAt:{type: String, default: getCurrentISTDateTime, immutable:true}
});
const Project = mongoose.model('Project', projectSchema);
export { Project }

