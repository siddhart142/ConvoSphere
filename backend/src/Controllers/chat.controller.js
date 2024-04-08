import {chats} from "../Constants/dummy.data.js"
const getChats = async(req,res)=>{
    try{
        console.log("helo",req)
        res.status(200)
        .json(chats)
        .message("chats fetched Successfully")
    }catch(error){
        console.log(error)
    }
}

export {getChats}