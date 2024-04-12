import {Router} from "express"
import { protectedRoute } from "../MiddleWares/auth.middleware.js"
import { allMessage, sendMessage } from "../Controllers/message.controller.js"
const router = Router()

router.route("/").post(protectedRoute,sendMessage)
router.route("/:chatId").get(protectedRoute,allMessage)

export default router