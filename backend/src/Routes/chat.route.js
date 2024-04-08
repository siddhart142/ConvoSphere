import { Router } from "express";
import { getChats } from "../Controllers/chat.controller.js";

const router = Router()

router.route("/chats").get(getChats)

export default router