import mongoose from 'mongoose';
import {getCurrentISTDateTime} from '../Time/times.js'

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true, minlength: 8 },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    CreateAccountDate: { type: String, default: getCurrentISTDateTime, immutable: true }
  });

const User = mongoose.model('User', userSchema);

export {User};