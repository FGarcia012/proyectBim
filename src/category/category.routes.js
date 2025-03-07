import { Router } from "express";
import { addCategory, getCategorys, updateCategory, deleteCategory } from "./category.controller.js";
import { addCategoryValidator, updateCategoryValidator, deleteCategoryValidator } from "../middlewares/category-validators.js";

const router = Router();

/**
 * @swagger
 * /salesManagement/v1/category/addCategory:
 *   post:
 *     summary: Add a new category
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Category name
 *     responses:
 *       201:
 *         description: Category created
 *       500:
 *         description: Error adding category
 */
router.post("/addCategory", addCategoryValidator, addCategory);

/**
 * @swagger
 * /salesManagement/v1/category/getCategories:
 *   get:
 *     summary: Get all categories
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: Categories fetched
 *       500:
 *         description: Error fetching categories
 */
router.get("/getCategories", getCategorys);

/**
 * @swagger
 * /salesManagement/v1/category/updateCategory/{cid}:
 *   put:
 *     summary: Update category details
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cid
 *         schema:
 *           type: string
 *         required: true
 *         description: Category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Category name
 *     responses:
 *       200:
 *         description: Category updated
 *       500:
 *         description: Error updating category
 */
router.put("/updateCategory/:cid", updateCategoryValidator, updateCategory);

/**
 * @swagger
 * /salesManagement/v1/category/deleteCategory/{cid}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cid
 *         schema:
 *           type: string
 *         required: true
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category deleted
 *       500:
 *         description: Error deleting category
 */
router.delete("/deleteCategory/:cid", deleteCategoryValidator, deleteCategory);

export default router;