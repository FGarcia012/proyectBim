import { Router } from "express";
import { getOrderHistory } from "./order.controller.js";

const router = Router();

/**
 * @swagger
 * /salesManagement/v1/order/orderHistory/{uid}:
 *   get:
 *     summary: Get order history for a user
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: Order history fetched successfully
 *       500:
 *         description: Error fetching order history
 */
router.get("/orderHistory/:uid", getOrderHistory);

export default router;