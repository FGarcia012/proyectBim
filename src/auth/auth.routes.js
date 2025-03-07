import { Router } from "express"
import { register, login} from "./auth.controller.js"
import { registerValidator, loginValidator } from "../middlewares/user-validators.js"
import { uploadProfilePicture } from "../middlewares/multer-uploads.js"

const router = Router()

/**
 * @swagger
 * /salesManagement/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: User's name
 *               surname:
 *                 type: string
 *                 description: User's surname
 *               username:
 *                 type: string
 *                 description: User's username
 *               email:
 *                 type: string
 *                 description: User's email
 *               password:
 *                 type: string
 *                 description: User's password
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *               phone:
 *                 type: string
 *                 description: User's phone number
 *     responses:
 *       201:
 *         description: User has been created
 *       500:
 *         description: User registration failed
 */
router.post("/register",uploadProfilePicture.single("profilePicture"), registerValidator, register)

/**
 * @swagger
 * /salesManagement/v1/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email
 *               username:
 *                 type: string
 *                 description: User's username
 *               password:
 *                 type: string
 *                 description: User's password
 *     responses:
 *       200:
 *         description: Login success
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Login failed, server error
 */
router.post("/login",loginValidator,login)

export default router