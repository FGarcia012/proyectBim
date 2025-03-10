"use strict"

import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { dbConnection } from "./mongo.js"
import authRoutes from "../src/auth/auth.routes.js"
import userRoutes from "../src/user/user.routes.js"
import productRoutes from "../src/product/product.routes.js"
import categoryRoutes from "../src/category/category.routes.js"
import cartRoutes from "../src/cart/cart.routes.js"
import orderRoutes from "../src/order/order.routes.js"
import invoiceRoutes from "../src/invoice/invoice.routes.js" // Importar las rutas de facturas
import apiLimiter from "../src/middlewares/rate-limit-validator.js"
import { createAdminUser } from "../src/utils/createAdminuser.js"
import { createDefaultCategory } from "../src/utils/createCategory.js"
import { swaggerDocs, swaggerUi } from "../configs/swagger.js"

const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false }))
    app.use(express.json())
    app.use(cors())
    app.use(helmet())
    app.use(morgan("dev"))
    app.use(apiLimiter)
}

const routes = (app) => {
    app.use("/salesManagement/v1/auth", authRoutes)
    app.use("/salesManagement/v1/user", userRoutes)
    app.use("/salesManagement/v1/product", productRoutes)
    app.use("/salesManagement/v1/category", categoryRoutes)
    app.use("/salesManagement/v1/cart", cartRoutes)
    app.use("/salesManagement/v1/order", orderRoutes)
    app.use("/salesManagement/v1/invoice", invoiceRoutes) 
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
}

const conectarDB = async () => {
    try {
        await dbConnection()
    } catch (err) {
        console.log(`Database connection failed: ${err}`)
        process.exit(1)
    }
}

export const initServer = () => {
    const app = express()
    try {
        middlewares(app)
        conectarDB()
        routes(app)
        createAdminUser()
        createDefaultCategory()
        const port = process.env.PORT || 3006
        app.listen(port, () => {
            console.log(`Server running on port ${port} matutina`)
        })
    } catch (err) {
        console.log(`Server init failed: ${err}`)
    }
}