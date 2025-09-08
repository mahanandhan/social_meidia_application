import express from 'express';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import connectDB from './db/connectDB.js';
import router from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
import postRouter from './routes/post.router.js';
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.get('/', (req, res) => {
    res.send("Welcome to the backend server of the social media application!");
})
app.use('/api/auth', router);
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter)

app.listen(3000, () => {
    connectDB();
    console.log("Server is running on port 3000");
});