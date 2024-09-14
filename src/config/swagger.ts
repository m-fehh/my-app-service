import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Financeira',
      version: '1.0.0',
      description: 'Documentação da API Financeira',
    },
  },
  apis: ['./src/routers/entities/*.ts'], 
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

const swaggerSetup = swaggerUi.setup(swaggerSpec);

export { swaggerUi, swaggerSetup };
