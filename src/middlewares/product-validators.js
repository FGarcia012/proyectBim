import { body, param } from "express-validator"
import { productExists } from "../helpers/db-validators.js"
import { validarCampos } from "./validate-fields.js"
import { deleteFileOnError } from "./delete-file-on-error.js"
import { handleErrors } from "./handle-errors.js"

export const createProductValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("price").isNumeric().withMessage("Price is required"),
    
    body("inventory").isInt({ min: 0 }).withMessage("Inventory must be a non-negative integer"),
    validarCampos,
    deleteFileOnError,
    handleErrors
]

export const updateProductImageValidator = [
    param("pid").isMongoId().withMessage("No es un ID válido "),
    param("pid").custom(productExists),
    validarCampos,
    handleErrors
]

export const updateProductValidator = [
    param("pid").isMongoId().withMessage("No es un ID válido "),
    param("pid").custom(productExists),
    body("name").optional().notEmpty().withMessage("Name is required"),
    body("description").optional().notEmpty().withMessage("Description is required"),
    body("price").optional().isNumeric().withMessage("Price is required"),
    body("category").optional().isMongoId().withMessage("Category is required"),
    body("inventory").optional().isInt({ min: 0 }).withMessage("Inventory must be a non-negative integer"),
    validarCampos,
    handleErrors
]

export const getProductValidator = [
    param("pid").isMongoId().withMessage("No es un ID válido "),
    param("pid").custom(productExists),
    validarCampos,
    handleErrors
]

export const deleteProductValidator = [
    param("pid").isMongoId().withMessage("No es un ID válido "),
    param("pid").custom(productExists),
    validarCampos,
    handleErrors
]