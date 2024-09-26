
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/userSchema.js';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY; 
const tokenBlacklist = [];


//Signup route
const resistor = async (req, res) => {
    const { name, email, password} = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email, and password are compulsory' });
    }


  

    try {
        const userExiting = await User.findOne({ email });
        if (userExiting) {
            return res.status(400).json({ message: 'Email is exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });


        await newUser.save();

        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: newUser._id,
                email: newUser.email,
                role: newUser.role
            }
        });

  } catch (err) {
        res.status(500).json({ message: 'Error creating user', error: err.message });
    }
};

// Login route
const Login = async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are mandatory' });
    }


  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role }, secretKey, { expiresIn: '1h' }
    );
    res.cookie('token', token)
    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
};



// Logout route
const logout = (req, res, next) => {
    try {
        // Clear the token cookie on the client side
        res.clearCookie('token');

        // Send a response indicating successful logout
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: err.message });
    }
};



//get user by id route
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching user', error: err.message });
    }
};


//get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users)
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 'Error fetching users', error: err.message });
    }
};

export {resistor, Login, logout, getUserById, getAllUsers};

