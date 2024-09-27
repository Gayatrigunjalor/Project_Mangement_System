import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import userRouter from './Router/userRouter.js';
import { logging } from './Middleware/logger.js';
import errorHandler from './middleware/errorHandler.js';
import notFoundHandler from './middleware/notFoundHandler.js';
import 'dotenv/config';


const app = express();
const port = process.env.PORT

// Middleware to parse JSON
app.use(express.json())

// Use cookieParser middleware
app.use(cookieParser())

app.use(logging);

app.use('/api/user', userRouter);

// notFound Handling Middleware
app.use(notFoundHandler) 

// Error Handling Middleware
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