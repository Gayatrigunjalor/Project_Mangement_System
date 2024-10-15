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
export { employeeTaskDashboard };