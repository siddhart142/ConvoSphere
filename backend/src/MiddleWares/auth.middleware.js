import { User } from "../Models/user.model.js";
import { ApiError } from "../utlis/ApiError.js";
import { asyncHandler } from "../utlis/asyncHandler.js";
import jwt from "jsonwebtoken";

const protectedRoute = asyncHandler(async(req,res,next)=>{

    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
    // console.log("t",req.cookies)
    if(!token){
        throw new ApiError(401,"Unauthorized Access")
    }

    try{
        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken._id)

        if(!user){
            throw new ApiError(401,"Invalid Token")
        }

        req.user = user
        next()
    }catch(error){
        throw new ApiError(401,error?.message)
    }
})

export {protectedRoute}