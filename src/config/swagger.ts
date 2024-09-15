import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { userSchema } from './schemas/userSchema';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Financeira',
      version: '1.0.0',
      description: 'Documentação da API Financeira',
    },
    servers: [
      {
        url: 'http://localhost:3000/api', 
      },
    ],
  },
  components: {
    schemas: {
      User: userSchema,
    },
  },
  apis: ['./src/routers/entities/*.ts'], 
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

const swaggerSetup = swaggerUi.setup(swaggerSpec);

export { swaggerUi, swaggerSetup };
