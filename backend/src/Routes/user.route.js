import { Router } from "express";
import { register, login, allUsers } from "../Controllers/user.controller.js";
import { upload } from "../MiddleWares/multer.middleware.js";

const router = Router();

router.route("/register").post(upload.fields([
    {
        name: "avatar", // Field name for the avatar file
        maxCount: 1 // Maximum number of files allowed for the avatar
    },
]),register)
router.route("/login").post(login)


export default router