import { Router } from "express";
import { uploadProductImage } from "../middlewares/multer-uploads.js";
import { createProduct, updateProductImage } from "./product.controller.js";
import { createProductValidator, updateProductImageValidator } from "../middlewares/product-validators.js";

const router = Router();

router.post("/create", uploadProductImage.single("image"), createProductValidator, createProduct);

router.patch("/update-image/:pid", uploadProductImage.single("image"), updateProductImageValidator, updateProductImage);

export default router;