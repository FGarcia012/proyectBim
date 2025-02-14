import { body, param } from "express-validator"
import { validarCampos } from "./validate-fields.js"
import { deleteFileOnError } from "./delete-file-on-error.js"
import { handleErrors } from "./handle-errors.js"

export const createProductValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("price").isNumeric().withMessage("Price is required"),
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