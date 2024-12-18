import { body } from 'express-validator';

// Validation rules for signup
const validateAccountSignup = [
    body('name')
        .notEmpty().withMessage('Name field is required')
        .isString().withMessage('Name must be a string'),
    body('email')
        .notEmpty().withMessage('Email field is required')
        .isEmail().withMessage('Invalid email address')
        .isString().withMessage('Email must be a string'),
    body('password')
        .notEmpty().withMessage('Password field is required')
        .isString().withMessage('Password must be a string')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    // body('adminToken')
    //     .notEmpty().withMessage('adminToken field is required')
    //     .isString().withMessage('adminToken must be a string'),
];

// Validation rules for login
const validateUserLogin = [
    body('email')
        .notEmpty().withMessage('Email field is required')
        .isEmail().withMessage('Invalid email address')
        .isString().withMessage('Email must be a string'),
    body('password')
        .notEmpty().withMessage('Password field is required')
        .isString().withMessage('Email must be a string')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];


// Validation rules for update
const validateUserUpdate = [
    body('name')
        .notEmpty().withMessage('Name field is required')
        .isString().withMessage('Name must be a string'),
    body('password')
        .notEmpty().withMessage('Password field is required')
        .isString().withMessage('Password must be a string')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
];


export { validateAccountSignup, validateUserLogin, validateUserUpdate, }