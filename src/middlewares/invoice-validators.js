import { body, param } from "express-validator";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";
import { productExists, userExists } from "../helpers/db-validators.js";

export const createInvoiceValidator = [
    validateJWT,
    hasRoles("ADMIN"),
    body("user").isMongoId().withMessage("No es un ID válido"),
    body("user").custom(userExists),
    body("products").isArray({ min: 1 }).withMessage("Debe proporcionar al menos un producto"),
    body("products.*.product").isMongoId().withMessage("No es un ID válido"),
    body("products.*.product").custom(productExists),
    body("products.*.quantity").isInt({ min: 1 }).withMessage("La cantidad debe ser un número entero positivo"),
    validarCampos,
    handleErrors
];

export const getInvoicesByUserValidator = [
    validateJWT,
    param("uid").isMongoId().withMessage("No es un ID válido"),
    param("uid").custom(userExists),
    validarCampos,
    handleErrors
];

export const updateInvoiceValidator = [
    validateJWT,
    hasRoles("ADMIN"),
    param("iid").isMongoId().withMessage("No es un ID válido"),
    body("products").isArray({ min: 1 }).withMessage("Debe proporcionar al menos un producto"),
    body("products.*.product").isMongoId().withMessage("No es un ID válido"),
    body("products.*.product").custom(productExists),
    body("products.*.quantity").isInt({ min: 1 }).withMessage("La cantidad debe ser un número entero positivo"),
    validarCampos,
    handleErrors
];