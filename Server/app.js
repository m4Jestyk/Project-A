import express from 'express';
import dotenv from "dotenv"
import { connectDB } from "./data/database.js";
import userRouter from "./routes/user.js"
import cookieParser from 'cookie-parser';


 

dotenv.config();


const app = express();

connectDB();

const PORT = process.env.PORT || 3000;

//Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true})) //To parse data in req.body
app.use(cookieParser());


//Routes

app.use("/api/v1/users", userRouter);


app.listen(PORT, ()=>{
    console.log(`Server is running on PORT = ${PORT}`);
})

