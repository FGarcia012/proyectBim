import { Router } from "express";
import { getOrderHistory } from "./order.controller.js";

const router = Router();

router.get("/orderHistory/:uid", getOrderHistory);

export default router;