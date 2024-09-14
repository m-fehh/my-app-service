import express from 'express';
import { syncDatabase } from './services/database.service';
import routes from './routers';
import { swaggerUi, swaggerSetup } from './config/swagger';
import { sequelizeMaster } from './config/database';

const app = express();
const port = 3000;

app.use('/api-docs', swaggerUi.serve, swaggerSetup);

app.use(express.json());
app.use('/api', routes);

app.listen(port, async () => {
  try {
    // Sincronizar o banco de dados e tabelas
    await syncDatabase(sequelizeMaster);

    console.log('Conectado ao banco de dados com sucesso.');
    console.log(`Servidor rodando em http://localhost:${port}`);
  } catch (error) {
    console.error('Erro durante a inicialização da API:', error);
  }
});
