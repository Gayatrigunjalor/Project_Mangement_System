# Project name – A Task Management System / Project Menegement System

## Project Overview
TaskFlow is a web-based task management system built using the MERN stack (MongoDB, Express, React, Node.js). It allows users to create, organize, and manage tasks effectively, with real-time updates on task statuses and progress. TaskFlow is designed for collaboration, enabling users to assign tasks, track changes, and receive notifications instantly.

## Key Features

1. **User Authentication & Authorization**
   - Secure user authentication using JWT tokens.
   - Role-based access control (Admin, Manager, Regular User) with different permissions.

2. **Real-Time Updates**
   - Real-time task updates are pushed to users when tasks are created, updated, reassigned, or completed.
   - Collaborative notifications for seamless team interaction.

3. **Task Management**
   - Create, update, delete, and organize tasks.
   - Tasks can have detailed descriptions, deadlines, priorities, and status labels (e.g., To-Do, In Progress, Done).
   - Assign tasks to users and notify them.

4. **Project Management**
   - Manage multiple projects, each with its own set of tasks.
   - Track overall project progress and task completion percentage.

5. **Collaborative Environment**
   - Team members can comment on tasks, upload files, and view task history.
   - Real-time collaboration within projects.

6. **Real-Time Notifications**
   - Receive instant notifications for task assignments, updates, or completion.
   - Option for email notifications for critical updates.

7. **Task History & Activity Log**
   - Track task changes (status, assigned users, deadlines) and view a detailed activity log.

8. **Responsive UI**
   - The UI is built with React and styled using Tailwind CSS or Material UI for a modern, responsive design across devices.

9. **Search & Filter**
   - Search tasks by keywords, assigned users, or task status.
   - Advanced filtering by project, deadline, priority, etc.

10. **Data Persistence**
    - MongoDB stores task, project, and user data, with relationships managed via references.

## Tech Stack

- **Frontend:**
  - React.js – Interactive user interface.
  - Tailwind CSS / Material UI – Styling and responsive design.

- **Backend:**
  - Node.js – Server-side logic.
  - Express.js – Routing and server functionality.

- **Database:**
  - MongoDB – Stores user, project, and task data.

- **Authentication:**
  - JWT – Secure authentication and session management.

## Folder Structure

### Backend
```
├── Controller/
│   ├── projectController.js
│   ├── taskController.js
│   └── userController.js
├── Middleware/
│   ├── authentication.js
│   ├── handleValidationError.js
│   ├── notFoundHandler.js
│   ├── errorHandler.js
│   └── logger.js
├── Models/
│   ├── projectSchema.js
│   ├── taskSchema.js
│   └── userSchema.js
├── Router/
│   ├── projectRouter.js
│   ├── taskRouter.js
│   └── userRouter.js
├── Time/
│   └── times.js
├── Validators/
│   ├── projectValidation.js
│   ├── taskValidation.js
│   └── userValidation.js
├── .env
├── .gitignore
├── index.js
├── package.json
├── package-lock.json
└── README.md
```
# User Information
## User Schema 
```
import mongoose from 'mongoose';
import moment from 'moment-timezone';

// Define the time zone for India
const indianTimeZone = 'Asia/Kolkata';
const getCurrentISTDateTime = () => moment().tz(indianTimeZone).format('YYYY-MM-DD HH:mm:ss');

const RegisterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createAccountDate: { type: String, default: getCurrentISTDateTime, immutable: true }
});

const Register = mongoose.model("Register", RegisterSchema);
export { Register };
```
### User Routes
- **Register User**  
  - Method: `POST`  
  - URL: `/api/users/register`  
  - Request Body: 
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string",
    "role": "string"
  }
  ```  
  - Response: `{ "message": "User registered successfully." }`

- **Login User**  
  - Method: `POST`  
  - URL: `/api/users/login`  
  - Request Body: 
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```  
  - Response: `{ "message": "User logged in successfully." }`

- **Find User by ID**  
  - Method: `GET`  
  - URL: `/api/users/:id`
  - Request Body:{}
  - Response:
      - Success: `{ "message": "User registered successfully." }`

- **Find All User**  
  - Method: `GET`  
  - URL: `/api/all/users`
  - Request Body:{}
  - Response:
      - Success: `{ "message": "User Logouted." }`
  
- **Find User Profile (Log in User)**  
  - Method: `GET`  
  - URL: `/api/users/profile`
  - Request Body:{}
  - Response:
      - Success: `{ "message": "User Profile." }`
  
- **Update User (update only log in user)**  
  - Method: `PUT`  
  - URL: `/api/users/update`
  - Request Body:
  ```json
  {
  "email": "string"
  }
  ```
  - Response:
      - Success: `{ "message": "User Updated." }` 

- **Delete User (delete only log in user)**  
  - Method: `DELETE`  
  - URL: `/api/users/delete`
  - Request Body: {}
  - Response:
      - Success: `{ "message": "User Deleted." }` 

- **User logout (delete only log in user)**  
  - Method: `POST`
  - URL: `/api/users/logout`
  - Request Body:
    ```json
    {
    "email": "string"
    }
    ```
  - Response:
      - Success: `{ "message": "User Logouted." }`

# Project Information
## Project Schema
```
import mongoose from 'mongoose';
import { getCurrentISTDateTime } from '../Time/time.js'
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  projectName:{type: String, required: true},
  description: {type: String},
  user: {ref: 'User'},
  status: {type: String, enum: ['active', 'canceled'], default: 'active'},
  createdAt:{type: String, default: getCurrentISTDateTime, immutable:true}
});
const Project = mongoose.model('Project', projectSchema);
export { Project }
```
### Project Routes
- **Create Project**  
  - Method: `POST`  
  - URL: `/api/project/create`  
  - Request Body: 
  ```json
  {
    "projectName": "string",
    "description": "string",
    "status": "string"
  }
  ```  
  - Response: `{ "message": "Project created successfully." }`

- **Find All Project**  
  - Method: `GET`  
  - URL: `/api/project/findProjects`  
  - Request Body:{}  
  - Response: `{ "message": "Project All Project successfully." }`

- **Update Project By ID (update only log in user)**  
  - Method: `POST`  
  - URL: `/api/project/update/:id`  
  - Request Body: 
  ```json
  {
    "projectName": "string",
    "description": "string",
    "user": "string",
    "status": "string"
  }
  ```  
  - Response: `{ "message": "Project updated successfully." }`

- **Delete Project By projectName(delete only log in user)**  
  - Method: `DELETE`  
  - URL: `/api/project/delete`  
  - Request Body: 
  ```json
  {
    "projectName": "string"
  }
  ```  
  - Response: `{ "message": "Project updated successfully." }`


# Task Information
## Task Schema
```
import mongoose from 'mongoose';
import { getCurrentISTDateTime } from '../Time/time.js'
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  taskName: {type: String, required: [true, 'Task name is required']},
  description: {type: String, required: [true, 'Description is required']},
  status: {type: String,
    enum: {
      values: ['Backlog', 'In Discussion', 'In Progress', 'Done'],
      message: 'Status is not valid' },
    default: 'Backlog' 
},
  assignedUser: type: String, ref: 'User', required: [true, 'Assigned user is required']},
  project: {type: String, ref: 'Project', required: [true, 'Project is required']},
  assignDate: {type: String, default: getCurrentISTDateTime, immutable: true},
  dueDate: {type: String, required: [true, 'Due date is required']},
});
const Task = mongoose.model('Task', taskSchema);
export { Task };
```
### Task Routes
- **Create Task**  
  - Method: `POST`  
  - URL: `/api/tasks/create`  
  - Request Body: 
  ```json
  {
    "taskName": "string",
    "description": "string",
    "status": "string",
    "dueDate": "string"
  }
  ```  
  - Response: `{ "message": "Task created successfully." }`

- **Find All Task**  
  - Method: `GET`  
  - URL: `/api/tasks/findAllTask`  
  - Request Body: {}
  - Response: `{ "message": "Find All Task." }`

- **Update Task By ID(delete only log in user)**  
  - Method: `PUT`  
  - URL: `/api/tasks/update/:id`  
  - Request Body: 
  ```json
  {
    "taskName": "string",
    "description": "string",
    "status": "string",
    "dueDate": "string"
  }
  ```  
  - Response: `{ "message": "Task updated successfully." }`

- **Delete Task By taskName(delete only log in user)**  
  - Method: `DLETE`  
  - URL: `/api/tasks/delete`  
  - Request Body: 
  ```json
  {
    "taskName": "string"
  }
  ```  
  - Response: `{ "message": "Task deleted successfully." }`