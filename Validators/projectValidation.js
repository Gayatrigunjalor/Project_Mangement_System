import { body } from 'express-validator';

const validatecreateProject = [
    body('projectName')
        .notEmpty().withMessage('Project field is required')
        .isString().withMessage('Project must be a string'),
    body('description')
        .notEmpty().withMessage('Description field is required')
        .isString().withMessage('Description must be a string')
];

const validateupdateProject = [
    body('projectName')
        .notEmpty().withMessage('ProjectName field is required')
        .isString().withMessage('ProjectName must be a string'),
    body('newName')
        .notEmpty().withMessage('newName field is required')
        .isString().withMessage('newName must be a string'),
    body('description')
        .notEmpty().withMessage('description field is required')
        .isString().withMessage('Description must be a string'),
    body('status')
        .notEmpty().withMessage('status field is required')
        .isString().withMessage('status must be a string'),
];

const validatechangeProjectStatus = [
    body('projectName')
        .notEmpty().withMessage('ProjectName field is required')
        .isString().withMessage('ProjectName must be a string'),
    body('status')
        .notEmpty().withMessage('Status field is required')
        .isString().withMessage('Status must be a string'),
];

export { validatecreateProject, validateupdateProject, validatechangeProjectStatus };