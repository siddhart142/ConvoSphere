import dotenv from "dotenv"

dotenv.config({
    path : './.env'
})
import app from "./App.js";

import connectDB from "./Db/index.js";
import { Server } from "socket.io";
import { createServer } from "http";
const httpServer = createServer(app);
const io = new Server(httpServer,{ 
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000",
    },
 });
connectDB()
.then(()=>{
    httpServer.listen(process.env.PORT,()=>{
        console.log(`\nServer is listening at port ${process.env.PORT}\n\n`);
    })
})
.catch((error)=>{
    console.log("\n\nMONGODB CONNECTION FAILED!!!", error);
})

io.on("connection", (socket) => {
  // ...
  console.log("connected to socket.io")

  socket.on('setup',(userData)=>{
    socket.join(userData._id)
    socket.emit('connected')
  })

  socket.on('join chat',(room)=>{
    socket.join(room)
    console.log("user join room",room)
  })

  socket.on('new message',(newMessageReceived)=>{
    
    if(!newMessageReceived.chat.users)  console.log("user not defined")
    newMessageReceived.chat.users.forEach(user=>{
        if(user._id !== newMessageReceived.sender._id) {
        socket.in(user._id).emit("message received",newMessageReceived)
        }
    })
  })
  socket.on("typing", (room) => {
    console.log(`User in room ${room} is typing`);
    socket.in(room).emit("typing");
  });
  
  socket.on("stop typing", (room) => {
    console.log(`User in room ${room} stopped typing`);
    socket.in(room).emit("stop typing");
  });
  

});
