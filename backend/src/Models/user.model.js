import mongoose, {Schema} from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { ApiError } from "../utlis/ApiError.js"

const UserSchema = new Schema({
    name: {type: String, required: true, trim: true},
    email: {type: String, required: true, trim: true, unique: true},
    password: {type: String, required: true},
    bio: {type:String, required: true},
    avatar: {type: String, required: true, default: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png"},
    // accessToken : {type : String}
},{
    timestamps: true
})




UserSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10)
    next()
})

UserSchema.methods.isPasswordCorrect = async function(password){
    console.log("password",password)
    try {
        console.log(password,this.password)
        return await bcrypt.compare(password,this.password)
    } catch (error) {
        console.log(error)
    }
}


UserSchema.methods.generateAccessToken = function(){
    console.log("called")
    try{
        return jwt.sign(
            {
                _id : this._id,
                email : this.email,
                name : this.name
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn : process.env.ACCESS_TOKEN_EXPIRY
            }
        )
    }catch(error){
        throw new ApiError(500,"Error while generating Access Toekn")
    }
}

export const User = mongoose.model("User",UserSchema)