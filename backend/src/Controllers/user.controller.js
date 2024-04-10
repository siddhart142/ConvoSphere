import { User } from "../Models/user.model.js";
import { ApiError } from "../utlis/ApiError.js";
import { ApiResponse } from "../utlis/ApiResponse.js";
import { asyncHandler } from "../utlis/asyncHandler.js";

const register = asyncHandler(async (req, res) => {
    const { name, email, bio, password, pic } = req.body;

    if (!name || !email || !bio || !password) {
        throw new ApiError(400, "All Fields are required");
    }

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            throw new ApiError(401, "User already Exists");
        }

        const user = await User.create({
            name,
            email,
            password,
            bio,
            pic
        });

        const createdUser = await User.findOne({ email }).select("-password");

        if (!createdUser) {
            throw new ApiError(400, "Could not register the user");
        }

        res.status(200).json(new ApiResponse(200, createdUser, "User Created Successfully"));
    } catch (error) {
        console.log("Could not Create User", error.message);
        throw new ApiError(401, error.message);
    }
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email.trim() || !password) {
        throw new ApiError(400, "All fields are required");
    }

    try {
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            throw new ApiError(404, "No Such User Found");
        }

        const isValidUser = await user.isPasswordCorrect(password);

        if (!isValidUser) {
            throw new ApiError(401, "Invalid user credentials");
        }

        res.status(200).json(new ApiResponse(200, user, "Successfully Logged In"));
    } catch (error) {
        console.error("Error during login:", error.message);
        throw new ApiError(401, error.message);
    }
});

// api/user?search=sid
const allUsers = asyncHandler(async(req,res)=>{

    const keyword = req.query.search ? {
        $or: [
            {name : {$regex : req.query.search, $options: "i"}},
            {email : {$regex : req.query.search, $options: "i"}},
        ]
    }: {}

    // console.log(keyword)

    const users = await User.find(keyword).find({_id: {$ne : req.user._id}})

    res.send(users)
})

export {
    register,
    login,
    allUsers
};
