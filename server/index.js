import express from "express";
import 'dotenv/config';
import cors from 'cors';
import connectDatabase from "./config/dbConn.js";
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import { notFound ,errorHandler} from "./middlewares/errorMiddlewares.js";
import {Server} from 'socket.io'
const app=express();
const PORT=process.env.PORT||3000;
app.use(express.json())
app.use(cors())
connectDatabase();

app.use('/api/user',userRoutes)
app.use('/api/chat',chatRoutes)
app.use('/api/message',messageRoutes)

app.use(notFound)
app.use(errorHandler)

const server=app.listen(PORT,()=>{
    console.log(`App is running at ${PORT}`);
})

const io=new Server(server,{
    pingTimeout:60000,
    cors:{
        origin:"https://chatease-frontend-4ips.onrender.com"
    }
})

io.on("connection",(socket)=>{
    console.log("socket.io connected")
    socket.on("setup",(userData)=>{
        socket.join(userData._id);
        socket.emit("connected");
    })
    socket.on("join chat",(room)=>{
        socket.join(room)
    })
    socket.on("typing",(room)=>{
        socket.in(room).emit("typing")  
    })
    socket.on("stop typing",(room)=>{
        socket.in(room).emit("stop typing")
    })
    socket.on("new message",(newMessageRecieved)=>{
        var chat=newMessageRecieved.chat
        if(!chat.users) return
        chat.users.forEach(user=>{
            if(user._id==newMessageRecieved.sender._id){
                 return;
            }
            socket.in(user._id).emit("message received",newMessageRecieved);
        })
    })
    socket.off("setup",()=>{
        console.log("USER DISCONNECTED")
        socket.leave(userData._id)
    })
    
})