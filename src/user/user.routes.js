import { Router } from "express"
import { getUserById } from "./user.controller.js"
import { getUserByIdValidator } from "../middlewares/user-validators.js"

const router = Router()

router.get("/findUser/:uid", getUserByIdValidator, getUserById)

export default router