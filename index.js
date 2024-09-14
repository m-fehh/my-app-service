// index.js

const express = require('express');
// const bodyParser = require('body-parser');
const dotenv = require('dotenv');
// const helmet = require('helmet');
// const compression = require('compression');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

// Configuração do ambiente
dotenv.config();

// Inicialização do aplicativo Express
const app = express();
const port = process.env.PORT || 3000;

// Middlewares
// app.use(helmet());          // Segurança
// app.use(compression());     // Compressão
// app.use(bodyParser.json()); // Parsing de JSON

// Configuração do Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API do Meu App',
      version: '1.0.0',
      description: 'Documentação da API para o Meu App',
    },
    servers: [
      {
        url: `http://localhost:${port}/api`,
        description: 'Servidor local',
      },
    ],
  },
  apis: [path.join(__dirname, 'src/routes/*.js')], // Diretório das rotas
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rotas
const apiRoutes = require('./src/routes');
app.use('/api', apiRoutes);

// Middleware de erro
const errorHandler = require('./src/middlewares/errorMiddleware');
app.use(errorHandler);

// Inicialização do servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

module.exports = app; // Para testes ou outras utilizações
