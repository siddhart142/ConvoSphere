import mongoose, {Schema} from "mongoose"

const userSchema = new Schema({
    name: {type: String, required: true, trim: true},
    email: {type: String, required: true, trim: true},
    password: {type: String, required: true},
    pic: {type: String, required: true, default: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png"}
},{
    timestamps: true
})

export const User = mongoose.model("User",userSchema)