import { Router } from "express";
import { createInvoice, getInvoicesByUser, updateInvoice } from "./invoice.controller.js";
import { createInvoiceValidator, getInvoicesByUserValidator, updateInvoiceValidator } from "../middlewares/invoice-validators.js";

const router = Router();

/**
 * @swagger
 * /salesManagement/v1/invoice/createInvoice:
 *   post:
 *     summary: Create a new invoice
 *     tags: [Invoice]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 description: User ID
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     product:
 *                       type: string
 *                       description: Product ID
 *                     quantity:
 *                       type: integer
 *                       description: Quantity of the product
 *     responses:
 *       201:
 *         description: Invoice created
 *       500:
 *         description: Error creating invoice
 */
router.post("/createInvoice", createInvoiceValidator, createInvoice);

/**
 * @swagger
 * /salesManagement/v1/invoice/getInvoicesByUser/{uid}:
 *   get:
 *     summary: Get invoices by user
 *     tags: [Invoice]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: Invoices fetched
 *       500:
 *         description: Error fetching invoices
 */
router.get("/getInvoicesByUser/:uid", getInvoicesByUserValidator, getInvoicesByUser);

/**
 * @swagger
 * /salesManagement/v1/invoice/updateInvoice/{iid}:
 *   put:
 *     summary: Update an invoice
 *     tags: [Invoice]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: iid
 *         schema:
 *           type: string
 *         required: true
 *         description: Invoice ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     product:
 *                       type: string
 *                       description: Product ID
 *                     quantity:
 *                       type: integer
 *                       description: Quantity of the product
 *     responses:
 *       200:
 *         description: Invoice updated
 *       500:
 *         description: Error updating invoice
 */
router.put("/updateInvoice/:iid", updateInvoiceValidator, updateInvoice);

export default router;