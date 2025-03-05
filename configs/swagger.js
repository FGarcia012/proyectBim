import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Sales Management API',
            version: '1.0.0',
            description: 'API para un sistema de gestion de ventas',
            module: {
                name: 'Fredy Alexander García Sicajau',
                email: 'alexander.garcia.sicajau@gmail.com'
            }
        },
        servers: [
            {
                url: 'http://127.0.0.1:3006/salesManagement/v1'
            }
        ]
    },
    apis:[
        './src/auth/auth.routes.js',
        './src/user/user.routes.js',
        './src/product/product.routes.js',
        './src/category/category.routes.js',
    ]
}

const swaggerDocs = swaggerJSDoc(options);

export { swaggerDocs, swaggerUi };