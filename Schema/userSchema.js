import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, required: true, minlength: 8 },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },  // Adding role enum
  CreateAccountDate: { type: String, default: () => new Date().toISOString(), immutable: true }
});

const User = mongoose.model('User', userSchema);

export default User;
