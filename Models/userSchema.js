import mongoose from 'mongoose';
import moment from 'moment-timezone';

// Define the time zone for India
const indianTimeZone = 'Asia/Kolkata';
const getCurrentISTDateTime = () => moment().tz(indianTimeZone).format('YYYY-MM-DD HH:mm:ss');

const RegisterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: String, default: getCurrentISTDateTime, immutable: true }
});

const Register = mongoose.model("Register", RegisterSchema);

export { Register };