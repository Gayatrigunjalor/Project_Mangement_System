import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import accountRouter from './Router/accountRouter.js';
import projectCreateRouter from './Router/projectCreateRouter.js';
import { logging } from './Middleware/logger.js';
import errorHandler from './Middleware/errorHandler.js';
import notFoundHandler from './Middleware/notFoundHandler.js';
import adminRouter from './Router/adminRouter.js'
import taskCreateRoutes from './Router/taskCreateRoutes.js';
import employeeTaskBoardRouter from './Router/employeeTaskBoardRouter.js';
import cors from 'cors';

import 'dotenv/config';

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(logging);

const corsOptions = {
    origin: true,
    optionsSuccessStatus: 200,
    credentials:true
}

app.use(cors(corsOptions))

app.use('/api/account', accountRouter);
app.use('/api/project', projectCreateRouter); 
app.use('/api/admin', adminRouter)
app.use('/api/task', taskCreateRoutes);
app.use('/task/dashboard', employeeTaskBoardRouter);

// Error handling
app.use(notFoundHandler); 
app.use(errorHandler); 

mongoose.connect(process.env.Connect)
    .then(() => {
        console.log("Database connected");
    })
    .catch((err) => {
        console.error("Database connection error:", err);
    });

app.listen(port, () => {
  console.log(`Server is working on ${port}`);
});
