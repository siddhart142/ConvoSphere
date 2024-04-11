import mongoose, {Schema} from "mongoose"

const chatSchema = new Schema({

    chatName : { type: String, trim: true},
    isGroupChat : {type: Boolean, default: false},
    user: [
        {type: Schema.Types.ObjectId, ref: "User"}
    ],
    latestMsg: {type: Schema.Types.ObjectId, ref: "Message"},
    groupAdmin: {type: Schema.Types.ObjectId, ref: "User"}
},{
    timestamps: true
})

export const Chat = mongoose.model("Chat",chatSchema)