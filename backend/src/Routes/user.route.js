import { Router } from "express";
import { register, login, allUsers } from "../Controllers/user.controller.js";
import { upload } from "../MiddleWares/multer.middleware.js";
import {protectedRoute} from "../MiddleWares/auth.middleware.js"
const router = Router();

router.route("/register").post(upload.fields([
    {
        name: "avatar", // Field name for the avatar file
        maxCount: 1 // Maximum number of files allowed for the avatar
    },
]),register)
router.route("/login").post(login)

router.route("/").get(protectedRoute, allUsers);
export default router