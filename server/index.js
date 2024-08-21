import express from "express";
import 'dotenv/config';
import cors from 'cors';
import connectDatabase from "./config/dbConn.js";
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import { notFound ,errorHandler} from "./middlewares/errorMiddlewares.js";
const app=express();
const PORT=process.env.PORT;
app.use(express.json())
app.use(cors())
connectDatabase();

app.use('/api/user',userRoutes)
app.use('/api/chat',chatRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(PORT,()=>{
    console.log(`App is running at ${PORT}`);
})