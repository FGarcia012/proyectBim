import { Router } from "express";
import { addCategory, getCategorys, updateCategory, deleteCategory } from "./category.controller.js";
import { addCategoryValidator, updateCategoryValidator, deleteCategoryValidator } from "../middlewares/category-validators.js";

const router = Router();

router.post("/addCategory", addCategoryValidator, addCategory);

router.get("/getCategories", getCategorys);

router.put("/updateCategory/:cid", updateCategoryValidator, updateCategory);

router.delete("/deleteCategory/:cid", deleteCategoryValidator, deleteCategory);

export default router;