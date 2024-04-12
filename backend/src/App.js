import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

import dotenv from "dotenv"
dotenv.config({
    path : './.env'
})
const app = express()


app.use(cors({
    origin : "http://localhost:3000",
    credentials : true
}))

// console.log(process.env.CORS_ORIGIN)

app.use(express.json({limit : "16kb"}))
app.use(express.urlencoded({extended : true, limit : "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

import chatRouter from "./Routes/chat.route.js"

app.use("/api/v1/chats",chatRouter)


import UserRouter from "./Routes/user.route.js"
app.use("/api/v1/users",UserRouter)

import MessageRouter from "./Routes/message.route.js"
app.use("/api/v1/messages",MessageRouter)
export default app