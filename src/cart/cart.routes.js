import { Router } from 'express';
import { addToCart, purchasingProcess } from './cart.controller.js';
import { addToCartValidator, purchasingProcessValidator } from "../middlewares/cart-validators.js";

const router = Router();

router.post('/addToCart', addToCartValidator, addToCart);

router.post('/purchasingProcess',purchasingProcessValidator, purchasingProcess);

export default router;