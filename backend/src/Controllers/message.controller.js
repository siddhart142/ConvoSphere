import { Chat } from "../Models/chat.model.js";
import { Message } from "../Models/message.model.js";
import { User } from "../Models/user.model.js";
import { ApiError } from "../utlis/ApiError.js";
import { ApiResponse } from "../utlis/ApiResponse.js";
import { asyncHandler } from "../utlis/asyncHandler.js";


const sendMessage = asyncHandler(async(req,res)=>{
    
    const {content, chatId} = req.body

    if(!content || !chatId){
        throw new ApiError(400,"All fields are required")
    }

    const newMessage = {
        sender : req.user._id,
        content : content,
        chat : chatId
    }

    try {
        let message = await Message.create(newMessage)
        message = await message.populate("sender","name avatar");
        message = await message.populate("chat");
        message = await User.populate(message, {
            path : "chat.users",
            select: "name avatar email"
        })

        await Chat.findByIdAndUpdate(req.body.chatId,{
           latestMsg : message 
        })

        res.status(200)
        .json(
            new ApiResponse(200,message,"messaged")
        )
    } catch (error) {
        throw new ApiError(400,error.message)
    }

})

const allMessage = asyncHandler(async(req,res)=>{

    
    const chatId = req.params.chatId
    console.log("fetched called\n\n\n",chatId)


    try {
        const messages = await Message.find({chat : chatId})
        .populate("sender","name avatar email")
        .populate("chat")

        console.log("hehe",messages)
        res.status(200)
        .json(
            new ApiResponse(200,messages,"fetched messages")
        )
    } catch (error) {
        throw new ApiError(400,error.message)
    }
})

export {
    sendMessage,
    allMessage
}