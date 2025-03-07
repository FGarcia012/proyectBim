import { Router } from "express";
import { uploadProductImage } from "../middlewares/multer-uploads.js";
import { createProduct, updateProductImage, updateProduct, getProduct, getProducts, deleteProduct, getOutOfStockProducts, getTopSellingProducts } from "./product.controller.js";
import { createProductValidator, updateProductImageValidator, updateProductValidator, getProductValidator, deleteProductValidator } from "../middlewares/product-validators.js";

const router = Router();

/**
 * @swagger
 * /salesManagement/v1/product/createProduct:
 *   post:
 *     summary: Create a new product
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Product name
 *               description:
 *                 type: string
 *                 description: Product description
 *               price:
 *                 type: number
 *                 description: Product price
 *               image:
 *                 type: string
 *                 format: binary
 *               inventory:
 *                 type: number
 *                 description: Product inventory
 *     responses:
 *       201:
 *         description: Product has been created
 *       500:
 *         description: Product creation failed
 */
router.post("/createProduct", uploadProductImage.single("image"), createProductValidator, createProduct);

/**
 * @swagger
 * /salesManagement/v1/product/updateImage/{pid}:
 *   patch:
 *     summary: Update product image
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: pid
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Product image has been updated
 *       400:
 *         description: No file provided
 *       500:
 *         description: Error updating product image
 */
router.patch("/updateImage/:pid", uploadProductImage.single("image"), updateProductImageValidator, updateProductImage);

/**
 * @swagger
 * /salesManagement/v1/product/updateProduct/{pid}:
 *   put:
 *     summary: Update product details
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: pid
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Product name
 *               description:
 *                 type: string
 *                 description: Product description
 *               price:
 *                 type: number
 *                 description: Product price
 *               category:
 *                 type: string
 *                 description: Category ID
 *               inventory:
 *                 type: number
 *                 description: Product inventory
 *     responses:
 *       200:
 *         description: Product updated
 *       500:
 *         description: Error updating product
 */
router.put("/updateProduct/:pid", updateProductValidator, updateProduct);

/**
 * @swagger
 * /salesManagement/v1/product/getProduct/{pid}:
 *   get:
 *     summary: Get product details
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: pid
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product details fetched
 *       404:
 *         description: Product not found
 *       500:
 *         description: Error fetching product
 */
router.get("/getProduct/:pid", getProductValidator, getProduct);

/**
 * @swagger
 * /salesManagement/v1/product/getProducts:
 *   get:
 *     summary: Get all products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: Products fetched
 *       500:
 *         description: Error fetching products
 */
router.get("/getProducts", getProducts);

/**
 * @swagger
 * /salesManagement/v1/product/deleteProduct/{pid}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: pid
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted
 *       404:
 *         description: Product not found
 *       500:
 *         description: Error deleting product
 */
router.delete("/deleteProduct/:pid", deleteProductValidator, deleteProduct);

/**
 * @swagger
 * /salesManagement/v1/product/outOfStockProducts:
 *   get:
 *     summary: Get out of stock products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: Out of stock products fetched
 *       500:
 *         description: Error fetching out of stock products
 */
router.get("/outOfStockProducts", getOutOfStockProducts);

/**
 * @swagger
 * /salesManagement/v1/product/topSellingProducts:
 *   get:
 *     summary: Get top selling products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: Top selling products fetched
 *       500:
 *         description: Error fetching top selling products
 */
router.get("/topSellingProducts", getTopSellingProducts);

export default router;