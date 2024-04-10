import { Router } from "express";
import { register, login, allUsers } from "../Controllers/user.controller.js";

const router = Router();

router.route("/register").post(register).get(allUsers)
router.route("/login").post(login)


export default router