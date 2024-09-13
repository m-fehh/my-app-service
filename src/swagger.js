const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Configurações do Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Smart Recruitment API',
      version: '1.0.0',
      description: 'API para um aplicativo de recrutamento inteligente, que utiliza inteligência artificial para otimizar o processo de contratação. Inclui funcionalidades como análise de currículos, matchmaking entre candidatos e vagas, e automação de entrevistas.',
      contact: {
        name: 'Equipe de Desenvolvimento',
        email: 'suporte@smartrecruitment.com',
        url: 'https://www.smartrecruitment.com'
      },
      license: {
        name: 'MIT License',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local de desenvolvimento'
      },
      {
        url: 'https://api.smartrecruitment.com',
        description: 'Servidor de produção'
      }
    ]
  },
  apis: ['./src/routes/*.js'], // Caminho para os arquivos de rotas
};

const specs = swaggerJsdoc(swaggerOptions);

module.exports = {
  swaggerUi,
  specs
};
