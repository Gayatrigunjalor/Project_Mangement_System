import { AssignTask } from '../Models/projectAssignmentSchema.js';
import { User } from '../Models/accountSchema.js';

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
        console.log(error);
        const err = new Error("Internal Server Error!");
        err.status = 500;
        return next(err);
    }
};

// Update Task Status
const updateTaskStatus = async (req, res, next) => {
    const { taskID } = req.params; 
    const { status } = req.body; 

    try {
        // Check if the user is an employee
        if (req.user.role !== 'employee') {
            const err = new Error("Unauthorized User! Only employees can update task status.");
            err.status = 403;
            return next(err);
        }

        // Update the task status
        const updatedTask = await AssignTask.findByIdAndUpdate(
            taskID,
            { 'taskDetails.status': status },
            { new: true, populate: ['project', 'user', 'task'] }
        );

        if (!updatedTask) {
            const err = new Error("Task not found.");
            err.status = 404;
            return next(err);
        }

        // Extract the necessary details to send in the response
        const responseTaskDetails = {
            projectDetails: {
                projectName: updatedTask.projectDetails.projectName,
                description: updatedTask.projectDetails.description,
                createdBy: updatedTask.projectDetails.createdBy,
                createdAt: updatedTask.projectDetails.createdAt,
            },
            userDetails: {
                name: updatedTask.userDetails.name,
                email: updatedTask.userDetails.email,
                role: updatedTask.userDetails.role,
            },
            taskDetails: {
                taskName: updatedTask.taskDetails.taskName,
                description: updatedTask.taskDetails.description,
                status: updatedTask.taskDetails.status,
            },
            _id: updatedTask._id,
            project: updatedTask.project,
            user: updatedTask.user,
            task: updatedTask.task,
            assignedAt: updatedTask.assignedAt,
        };

        res.status(200).json({
            message: "Task status updated successfully",
            updatedTask: responseTaskDetails,
        });
    } catch (error) {
        console.error(error);
        const err = new Error("Internal Server Error!");
        err.status = 500;
        return next(err);
    }
};

export { employeeTaskDashboard, updateTaskStatus };