import { body } from "express-validator";
import { productExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { hasRoles } from "./validate-roles.js";
import { validateJWT } from "./validate-jwt.js";
import { handleErrors } from "./handle-errors.js";

export const addToCartValidator = [
    validateJWT,
    hasRoles("USER"),
    body("product").isMongoId().withMessage("No es un ID válido"),
    body("product").custom(productExists),
    body("quantity").isInt({ min: 1 }).withMessage("La cantidad debe ser un número entero positivo"),
    validarCampos,
    handleErrors
];

export const purchasingProcessValidator = [
    validateJWT,
    hasRoles("USER"),
    validarCampos,
    handleErrors
];