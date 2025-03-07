import { Router } from 'express';
import { addToCart, purchasingProcess } from './cart.controller.js';
import { addToCartValidator, purchasingProcessValidator } from "../middlewares/cart-validators.js";

const router = Router();

/**
 * @swagger
 * /salesManagement/v1/cart/addToCart:
 *   post:
 *     summary: Add a product to the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product:
 *                 type: string
 *                 description: The ID of the product to add
 *               quantity:
 *                 type: integer
 *                 description: The quantity of the product to add
 *     responses:
 *       200:
 *         description: Product added to cart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 cart:
 *                   $ref: '#/components/schemas/Cart'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Error adding product to cart
 */
router.post('/addToCart', addToCartValidator, addToCart);

/**
 * @swagger
 * /salesManagement/v1/cart/purchasingProcess:
 *   post:
 *     summary: Complete the purchasing process
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Checkout completed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 order:
 *                   $ref: '#/components/schemas/Order'
 *                 invoicePath:
 *                   type: string
 *       400:
 *         description: Cart is empty
 *       500:
 *         description: Error during checkout
 */
router.post('/purchasingProcess', purchasingProcessValidator, purchasingProcess);

export default router;