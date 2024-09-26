import bcrypt from 'bcrypt';
import { Register } from '../Models/userSchema.js';
import { createToken } from '../middleware/authentication.js';

// Register function
const signup = async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
        // Check if user already exists
        let user = await Register.findOne({ email });
        if (user) {
            const err = new Error("User already exists. Please Login!")
            err.status = 400;
            return next(err)
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user instance
        const newUser = new Register({
            name,
            email,
            password: hashedPassword,
        });

        // Save the new user to the database
        const result = await newUser.save();
        res.status(200).json({ message: "Signup successful", result });
    } catch (error) {
        console.error('Signup Error:', error);
        const err = new Error("Server Error")
        err.status = 500;
        return next(err)
    }
};


// Login function
const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        // Check if user exists
        let user = await Register.findOne({ email });
        if (!user) {
            const err = new Error("Invalid Email. Please check..")
            err.status = 400;
            return next(err)
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = createToken(email)
            res.cookie('token', token)
            res.status(200).json({ message: "user login successfully..", user, token })
        } else {
            const err = new Error("invalid password..")
            err.status = 400;
            return next(err)
        }
    } catch (error) {
        console.error(error.message);
        const err = new Error("Server Error")
        err.status = 500;
        return next(err)
    }
};

// Get all signup data function
const getAllUsers = async (req, res, next) => {
    try {
        const users = await Register.find({});
        res.json(users);
    } catch (error) {
        console.error(error.message);
        const err = new Error("Server Error")
        err.status = 500;
        return next(err)
    }
};

// Get login data function
const GetLoginData = async (req, res, next) => {
    try {
        // Assuming req.user is set by authentication middleware
        if (!req.user) {
            const err = new Error("Unauthorized")
            err.status = 401;
            return next(err)
        }

        const loginData = await Register.findOne({ email: req.user.email });
        if (!loginData) {
            const err = new Error("User not logedIn found")
            err.status = 404;
            return next(err)
        }
        res.json(loginData);
    } catch (error) {
        console.error(error.message);
        const err = new Error("server Error!")
        err.status = 500;
        return next(err)
    }
};

// update function
const UpdateLoginData = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const updatedItem = await Register.findOne({ email });
        if (!updatedItem) {
            const err = new Error("User not found. Please check information.")
            err.status = 404;
            return next(err)
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        const submit = ({ ...req.body, password: hashedPassword })
        const updateData = await Register.findOneAndUpdate({ email }, { $set: submit }, { new: true })
        res.status(200).json({ message: "user update successfully...", updateData })
    } catch (error) {
        const err = new Error("Server Error !")
        err.status = 500;
        return next(err)
    }
};

// Delete function
const DeleteUserData = async (req, res, next) => {
    const { email } = req.body;
    try {
        const deletedItem = await Register.findOneAndDelete({ email: email });
        if (!deletedItem) {
            const err = new Error("User data not found.")
            err.status = 404;
            return next(err)
        }

        res.json({ message: 'User data deleted successfully...' });
    } catch (error) {
        const err = new Error("Server Error !")
        err.status = 500;
        return next(err)
    }
};


// Logout function
const logout = (req, res, next) => {
    try {
        // Clear the token cookie on the client side
        res.clearCookie('token');

        // Send a response indicating successful logout
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error(error.message);
        const err = new Error("Server Error !")
        err.status = 500;
        return next(err)
    }
};

export { signup, login, getAllUsers, GetLoginData, DeleteUserData, UpdateLoginData, logout };