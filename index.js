import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import userRouter from './router/userRouter.js';
import { logging } from './middleware/logger.js';
import 'dotenv/config';


const app = express();
const port = process.env.PORT

app.use(express.json())

app.use(cookieParser())

app.use(logging);

app.use('/api/user', userRouter);


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