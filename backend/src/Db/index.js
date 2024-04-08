import mongoose from "mongoose"

const DB_NAME = "ConvoSphere"

const connectDB = async(()=>{
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log("\n\n MONGODB CONNECTED SUCCESSFULLY !!!\n\n")
    }
    catch(error){
        console.log("\n\n MONGODB CONNECTION FAILED!!\n\n")
        process.exit(1)
    }
})

export default connectDB