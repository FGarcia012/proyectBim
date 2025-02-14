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
                email: 'fgarcia-2023012@kinal.edu.gt'
            }
        },
        servers: [
            {
                url: 'http://127.0.0.1:3003/salesManagement/v1'
            }
        ]
    },
    apis:[
        './src/auth/auth.routes.js'
    ]
}

const swaggerDocs = swaggerJSDoc(options);

export { swaggerDocs, swaggerUi };