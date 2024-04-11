import { Router } from "express";
import { accessChat,fetchChats,createGroupChat, renameGroup, removeFromGroup, addToGroup  } from "../Controllers/chat.controller.js";
import {protectedRoute} from "../MiddleWares/auth.middleware.js"
const router = Router()

// router.route("/chats").get(getChats)

router.route('/').post(protectedRoute, accessChat)
router.route("/rename").put(protectedRoute,renameGroup)
router.route("/removeGroup").put(protectedRoute,removeFromGroup)
router.route("/add").put(protectedRoute,addToGroup)
router.route("/group").post(protectedRoute,createGroupChat)
router.route("/").get(protectedRoute,fetchChats)

export default router