import { body, param } from "express-validator";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js"
import { hasRoles } from "./validate-roles.js"
import { categoryExists } from "../helpers/db-validators.js";

export const addCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN"),
    body("name").notEmpty().withMessage("Name is required"),
    validarCampos,
    handleErrors
];

export const updateCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN"),
    param("cid").isMongoId().withMessage("No es un ID válido"),
    param("cid").custom(categoryExists),
    body("name").optional().notEmpty().withMessage("Name is required"),
    validarCampos,
    handleErrors
];

export const deleteCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN"),
    param("cid").isMongoId().withMessage("No es un ID válido"),
    param("cid").custom(categoryExists),
    validarCampos,
    handleErrors
];