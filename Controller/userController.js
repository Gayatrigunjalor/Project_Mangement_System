import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../Models/userSchema.js';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY; 

//Signup route
const register = async (req, res) => {
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
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        });

  } catch (err) {
        res.status(500).json({ message: 'Error creating user', error: err.message });
    }
};

// Login route
const login = async (req, res) => {
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
        res.status(500).json({ message: 'Error fetching users', error: err.message });
    }
};

// User Profile
const userProfile = async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ message: 'Unauthorized' });
        }

        const profile = await User.findOne({ email: req.user.email });
        if (!profile) {
            res.status(404).json({ message: 'User not logedIn found' });
        }
        res.json({
            UserProfile: {
                Name: profile.name,
                Email: profile.email,
                Role: profile.role
            }
        });        
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
};

// update function
const updateLoginData = async (req, res) => {
    const { name, password } = req.body; 
    try {
        const userEmail = req.user.email;
        const updatedItem = await User.findOne({ email: userEmail });

        if (!updatedItem) {
            return res.status(404).json({ message: 'User not found. Please check information.' });
        }

        const updates = {};

        if (name) {
            updates.name = name; 
        }

        if (password) {
            const salt = await bcrypt.genSalt(10);
            updates.password = await bcrypt.hash(password, salt); 
        }

        const updatedUser = await User.findOneAndUpdate(
            { email: userEmail },
            { $set: updates },
            { new: true }
        );

        res.status(200).json({ message: "User updated successfully", updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
};

// Delete function
const deleteUserData = async (req, res) => {
    try {
        const deletedItem = await User.findOneAndDelete({ email:req.user.email });
        if (!deletedItem) {
            res.status(404).json({ message: 'User data not found.' });
        }

        res.json({ message: 'User data deleted successfully...' });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: err.message });
    }
};

// Logout route
const logout = (req, res) => {
    try {
        // Clear the token cookie on the client side
        res.clearCookie('token');

        // Send a response indicating successful logout
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: err.message });
    }
};


export {register, login, getUserById, getAllUsers, userProfile, updateLoginData, deleteUserData, logout};