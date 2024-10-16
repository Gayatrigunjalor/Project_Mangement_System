import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  projectName: {type: String, required: true},
  description: {type: String, required: true},
  createdBy: {type: String, ref: 'User'},
  status: {type: String, enum: ['active', 'canceled'], default: 'active'},
  createdAt: {type: Date, default: Date.now, immutable:true}
});
const Project = mongoose.model('Project', projectSchema);
export { Project }