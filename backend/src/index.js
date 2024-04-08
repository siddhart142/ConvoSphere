import dotenv from "dotenv"
dotenv.config({
    path : './.env'
})
import app from "./app.js";

import connectDB from "./Db/index.js";

connectDB()
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`\nServer is listening at port ${process.env.PORT}\n\n`);
    })
})
.catch((error)=>{
    console.log("\n\nMONGODB CONNECTION FAILED!!!", error);
})