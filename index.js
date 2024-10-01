import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import userRouter from './Router/userRouter.js';
import projectRouter from './Router/projectRouter.js';
import { logging } from './Middleware/logger.js';
import errorHandler from './Middleware/errorHandler.js';
import notFoundHandler from './Middleware/notFoundHandler.js';

import 'dotenv/config';

const app = express();
const port = process.env.PORT

app.use(express.json());
app.use(cookieParser());
app.use(logging);

app.use('/api/user', userRouter);
app.use('/api/project', projectRouter); 

app.use(notFoundHandler) 
app.use(errorHandler); 

mongoose.connect(process.env.Connect)
    .then(() => {
        console.log("Database connected");
    })
    .catch((err) => {
        console.error("Database connection error:", err);
    });

app.listen(port, () => {
  console.log(`server is working on ${port}`);
});