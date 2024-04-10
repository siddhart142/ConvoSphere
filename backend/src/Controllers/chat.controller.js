import {chats} from "../Constants/dummy.data.js"
import { Chat } from "../Models/chat.model.js";
import { User } from "../Models/user.model.js";
import { ApiError } from "../utlis/ApiError.js";
import { ApiResponse } from "../utlis/ApiResponse.js";
import { asyncHandler } from "../utlis/asyncHandler.js"
// const getChats = async(req,res)=>{
//     try{
//         console.log("helo",req)
//         res.status(200)
//         .json(chats)
//         .message("chats fetched Successfully")
//     }catch(error){
//         console.log(error)
//     }
// }

const accessChat = asyncHandler(async(req,res)=>{

    const {userId} = req.body;

    if(!userId){
        throw new ApiError(404,"UserId Not provided")
    }

    const isChat = await Chat.find({
        isGroupChat : false,
        $and : [
            {users: {$elemMatch : {$eq : req.user_id}}},
            {users: {$elemMatch : {$eq : userId}}},
        ]
    }).populate("users","-password").populate("latestMsg")

    isChat = await User.populate(isChat,{
        path : "latestMsg.sender",
        select: "name pic email",
    })

    if(isChat.length > 0)
    {
        res.send(isChat[0])
    }else{
        var chatData ={
            ChatName : "sender",
            isGroupChat : false,
            users: [req.user._id,userId]
        }
    }

    try{
        const createdChat = await Chat.create(chatData)

        const FullChat = await Chat.findOne({_id : createdChat._id}).populate("users","-password")

        res.status(200).json(
            new ApiResponse(200,FullChat,"Chat Created")
        )
    }catch(error){
        throw new ApiError(401,error.message)
    }
})

const fetchChats = asyncHandler(async(req,res)=>{

    try{
        const chats = await Chat.find({users:{$elemMatch:{req.user._id}}})
        .populate("users","-password")
        .populate("groupAdmin","-password")
        .populate("latestMsg")
        .sort({updatedAt: -1})
        .then(async(results) => {
            results = await User.populate(results,{
                path : "latestMsg.sender",
                select : "name email pic"
            })
        })
        res.status(200).send(results)
        
    }catch(error)
    {
        throw new ApiError(401,error.message)
    }
})

const createGroupChat = asyncHandler(async(req,res)=>{

    if(!req.body.users || !req.body.users){
        return res.status(400).send({message: "Please fill all the fields"})
    }

    const users = req.body.users
    if(users.length < 2){
        throw new ApiError(400,"2 or more than 2 members are required")
    }

    users.push(req.user)

    try{
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users : users,
            isGroupChat : true,
            groupAdmin: req.user._id
        })

        const fullGroupChat = await Chat.findOne({_id : groupChat._id})
        .populate("users","-passowrd")
        .populate("groupAdmin","-password")

        res.status(200)
        .json(200,fullGroupChat,"chat created")
    }catch(error)
    {
        throw new ApiError(400,"failed to create groupchat")
    }
})

const renameGroup = asyncHandler(async(req,res)=>{

    const {chatId, chatName} = req.body;

    const updatedChat = await findByIdAndUpdate(
        chatId,{
            chatName
        },{
            new : true
        }
    ).populate("users","-password")
    .populate("groupAdmin",-"password");

    if(!updatedChat){
        throw new ApiError(400,"Chat not found")
    }

    res.status(200)
    .json(
        new ApiResponse(200,updatedChat,"Name Changed")
    )
})

const addToGroup = asyncHandler(async(req,res)=>{

    const {chatId, userId} = req.body;

    const added = await findByIdAndUpdate(chatId,{
        $push: {users: userId}
    },
    {
        new : true
    })
    .populate("users","-password")
    .populate("groupAdmin",-"password");

    if(!added){
        throw new ApiError(400,"Failed to add")
    }

    res.status(200)
    .json(
        new ApiResponse(200,added,"added")
    )
})

const removeFromGroup = asyncHandler(async(req,res)=>{

    const {chatId, userId} = req.body;

    const removed = await findByIdAndUpdate(chatId,{
        $pull: {users: userId}
    },
    {
        new : true
    })
    .populate("users","-password")
    .populate("groupAdmin",-"password");

    if(!removed){
        throw new ApiError(400,"Failed to remove")
    }

    res.status(200)
    .json(
        new ApiResponse(200,removed,"removed")
    )
})


export {getChats,
        accessChat,
        fetchChats,
        createGroupChat,
        renameGroup,
        removeFromGroup,
        addToGroup 
}