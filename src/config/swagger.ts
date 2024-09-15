import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import schemas from '../schemas';

// Configurações do Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Financeira',
      version: '1.0.0',
      description: 'Documentação da API Financeira - Gerenciamento de finanças pessoais com funcionalidades avançadas para usuários e autenticação segura.',
      contact: {
        name: 'Suporte Técnico',
        email: 'suporte@apifinanceira.com',
        url: 'http://www.apifinanceira.com/suporte',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Servidor de desenvolvimento local',
      },
      {
        url: 'https://api.apifinanceira.com/v1',
        description: 'Servidor de produção',
      },
    ],
    components: {
      schemas,
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Autentique-se usando um token JWT. Inclua o token no cabeçalho da requisição no formato: `Authorization: Bearer <seu_token_jwt>`.',
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ['./src/routers/entities/*.ts'], 
};

// Gerar a especificação Swagger
const swaggerSpec = swaggerJsDoc(swaggerOptions);

// Configurar o Swagger UI
const swaggerSetup = swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { background-color: #4169E1 }'
});

export { swaggerUi, swaggerSetup };
