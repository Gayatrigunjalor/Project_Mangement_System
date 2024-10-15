import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../Models/accountSchema.js';
import dotenv from 'dotenv';
import { AssignTask } from '../Models/projectAssignmentSchema.js';

dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY;
const admin_Token = process.env.ADMINTOKEN;

//Signup route
const register = async (req, res, next) => {
    const { name, email, password, role, adminToken } = req.body;

    if (!name || !email || !password) {
        const err = new Error("Name, email, and password are compulsory !")
        err.status = 400;
        return next(err)
    }
    try {
        const userExiting = await User.findOne({ email });
        if (userExiting) {
            const err = new Error("User Email already exists. Please Login!")
            err.status = 400;
            return next(err)
        }

        // Validate admin token for admin role
        if (role === 'admin' && adminToken !== admin_Token) {
            return res.status(401).json({ message: 'Invalid admin token' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        let newUser;
        if (role === 'admin') {
            const hashedAdminToken = await bcrypt.hash(adminToken, salt);
            newUser = new User({
                name,
                email,
                password: hashedPassword,
                role,
                adminToken: hashedAdminToken,
            });
        } else {
            newUser = new User({
                name,
                email,
                password: hashedPassword,
                role,
            });
        }

        const userData = await newUser.save();

        res.status(201).json({
            message: 'created account successfully',
            userData
        });

    } catch (error) {
        console.log(error);

        const err = new Error("Internal Server Error !")
        err.status = 500;
        return next(err)
    }
};

// Login route
const login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        const err = new Error("Email and password are mandatory !")
        err.status = 400;
        return next(err)
    }


    try {
        const user = await User.findOne({ email });
        if (!user) {
            const err = new Error("User not found !")
            err.status = 400;
            return next(err)
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            const err = new Error("Invalid email or password !")
            err.status = 400;
            return next(err)
        }

        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role }, secretKey, { expiresIn: '1h' }
        );
        res.cookie('token', token)
        res.json({ message: 'Login successful', token });
    } catch (error) {
        const err = new Error("Internal Server Error !")
        err.status = 500;
        return next(err)
    }
};

//get user by id route
const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            const err = new Error("User not found !")
            err.status = 404;
            return next(err)
        }
        res.json(user);
    } catch (error) {
        const err = new Error("User already exists. Please Login!")
        err.status = 400;
        return next(err)
        res.status(500).json({ message: 'Error fetching user', error: err.message });
    }
};

//get all users
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users)
    } catch (error) {
        const err = new Error("User already exists. Please Login!")
        err.status = 400;
        return next(err)
        res.status(500).json({ message: 'Error fetching users', error: err.message });
    }
};

// User Profile
const userProfile = async (req, res, next) => {
    try {
        if (!req.user) {
            const err = new Error("Unauthorized User !")
            err.status = 401;
            return next(err)
        }

        const profile = await User.findOne({ email: req.user.email });
        if (!profile) {
            const err = new Error("User not logedIn found !")
            err.status = 404;
            return next(err)
        }
        res.json({
            UserProfile: {
                Name: profile.name,
                Email: profile.email,
                Role: profile.role
            }
        });
    } catch (error) {
        const err = new Error("INternal Server Error !")
        err.status = 500;
        return next(err)
    }
};

// Get logged-in user details and their assigned tasks
const employeeTaskDashboard = async (req, res, next) => {
    try {
        // Ensure the user is authenticated
        if (!req.user) {
            const err = new Error("Unauthorized User!");
            err.status = 401;
            return next(err);
        }

        // Fetch user details using the email from req.user
        const user = await User.findOne({ email: req.user.email });
        if (!user) {
            const err = new Error("User not found!");
            err.status = 404;
            return next(err);
        }

        // Fetch assigned tasks for the user
        const taskDetails = await AssignTask.find();

        // Prepare the response
        res.json({
            userDetails: {
                userID: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.CreateAt,
            },
            // taskDetails

            taskDetails: taskDetails.map(task => ({
                projectDetails: task.projectDetails,
                // userDetails: task.userDetails,
                taskDetails: task.taskDetails,
                ID: task._id,
                projectCreationID: task.project,
                // userCreationID: task.user,
                taskCreationID: task.task,
                assignedAt: task.assignedAt
            }))
        });
    } catch (error) {
        const err = new Error("Internal Server Error!");
        err.status = 500;
        return next(err);
    }
};

// update function
const updateLoginData = async (req, res, next) => {
    const { name, password } = req.body;
    try {
        const userEmail = req.user.email;
        const updatedItem = await User.findOne({ email: userEmail });

        if (!updatedItem) {
            const err = new Error("User not found. Please check information.")
            err.status = 404;
            return next(err)
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
        const err = new Error("Internal Server Error !")
        err.status = 500;
        return next(err)
    }
};

// Delete function
const deleteUserData = async (req, res, next) => {
    try {
        const deletedItem = await User.findOneAndDelete({ email: req.user.email });
        if (!deletedItem) {
            const err = new Error("User data not found.")
            err.status = 404;
            return next(err)
        }

        res.json({ message: 'User data deleted successfully...' });
    } catch (error) {
        const err = new Error("Internal Server Error !")
        err.status = 500;
        return next(err)
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
        const err = new Error("Internal Server Error")
        err.status = 500;
        return next(err)
    }
};


export { register, login, getUserById, getAllUsers, userProfile, employeeTaskDashboard, updateLoginData, deleteUserData, logout };