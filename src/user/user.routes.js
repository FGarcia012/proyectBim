import { Router } from "express"
import { getUserById } from "./user.controller.js"
import { getUserByIdValidator } from "../middlewares/user-validators.js"

const router = Router()

/**
 * @swagger
 * /adoptionSystem/v1/user/findUser/{uid}:
 *   get:
 *     summary: Retrieve a user by ID
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A user object
 */
router.get("/findUser/:uid", getUserByIdValidator, getUserById)

export default router