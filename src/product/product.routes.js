import { Router } from "express";
import { uploadProductImage } from "../middlewares/multer-uploads.js";
import { createProduct, updateProductImage, updateProduct, getProduct, getProducts, deleteProduct, getOutOfStockProducts, getTopSellingProducts } from "./product.controller.js";
import { createProductValidator, updateProductImageValidator, updateProductValidator, getProductValidator, deleteProductValidator } from "../middlewares/product-validators.js";

const router = Router();

router.post("/createProduct", uploadProductImage.single("image"), createProductValidator, createProduct);

router.patch("/updateImage/:pid", uploadProductImage.single("image"), updateProductImageValidator, updateProductImage);

router.put("/updateProduct/:pid", updateProductValidator, updateProduct);

router.get("/getProduct/:pid", getProductValidator, getProduct);

router.get("/getProducts", getProducts);

router.delete("/deleteProduct/:pid", deleteProductValidator, deleteProduct);

router.get("/outOfStockProducts", getOutOfStockProducts);

router.get("/topSellingProducts", getTopSellingProducts);

export default router;