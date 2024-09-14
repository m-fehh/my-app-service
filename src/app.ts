import express from 'express';
import sequelize from './config/database';
import routes from './routers'; 
import { swaggerUi, swaggerSetup } from './config/swagger';

const app = express();
const port = 3000;

app.use('/api-docs', swaggerUi.serve, swaggerSetup);

app.use(express.json());
app.use('/api', routes);

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log('Conectado ao banco de dados com sucesso.');
    console.log(`Servidor rodando em http://localhost:${port}`);
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error);
  }
});
