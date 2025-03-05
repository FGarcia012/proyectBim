import { body, param } from "express-validator";
import { emailExists, usernameExists, userExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { deleteFileOnError } from "./delete-file-on-error.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { isUserRole } from "../helpers/db-validators.js";

export const registerValidator = [
    body("name").notEmpty().withMessage("El nombre es requerido"),
    body("username").notEmpty().withMessage("El username es requerido"),
    body("email").notEmpty().withMessage("El email es requerido"),
    body("email").isEmail().withMessage("No es un email válido"),
    body("email").custom(emailExists),
    body("username").custom(usernameExists),
    body("password").isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }),
    validarCampos,
    deleteFileOnError,
    handleErrors
];

export const loginValidator = [
    body("email").optional().isEmail().withMessage("No es un email válido"),
    body("username").optional().isString().withMessage("Username es en formáto erróneo"),
    body("password").isLength({ min: 7 }).withMessage("El password debe contener al menos 8 caracteres"),
    validarCampos,
    handleErrors
];

export const updatePasswordValidator = [
    validateJWT,
    param("uid").isMongoId().withMessage("No es un ID válido"),
    param("uid").custom(userExists),
    param("uid").custom(isUserRole),
    body("newPassword").isLength({ min: 8 }).withMessage("El password debe contener al menos 8 caracteres"),
    validarCampos,
    handleErrors
];

export const updateUserValidator = [
    validateJWT,
    param("uid").isMongoId().withMessage("No es un ID válido"),
    param("uid").custom(userExists),
    param("uid").custom(isUserRole),
    validarCampos,
    handleErrors
];

export const updateProfilePictureValidator = [
    validateJWT,
    param("uid").isMongoId().withMessage("No es un id valido"),
    param("uid").custom(userExists),
    param("uid").custom(isUserRole),
    validarCampos,
    handleErrors
];

export const deleteUserValidator = [
    validateJWT,
    param("uid").isMongoId().withMessage("No es un id valido"),
    param("uid").custom(userExists),
    param("uid").custom(isUserRole),
    validarCampos,
    handleErrors
];

export const confirmDelete = [
    body("confirm").isString().withMessage("Confirmación no proporcionada"),
    body("confirm").isIn(["yes", "no"]).withMessage("Confirmación no válida"),
    validarCampos,
    handleErrors
];