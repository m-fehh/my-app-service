import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { syncDatabase } from './services/database.service';
import routes from './routers';
import { swaggerUi, swaggerSetup } from './config/swagger';
import { sequelizeMaster } from './config/database';
import corsOptions from './config/cors.config';

// Carregar variáveis de ambiente
dotenv.config({ path: '../environments/.env' });

const app = express();
const port = process.env.PORT || 3000; 

app.use(cors(corsOptions));

app.use('/api-docs', swaggerUi.serve, swaggerSetup);

app.use(express.json());
app.use('/api', routes);

app.listen(port, async () => {
  try {
    // Sincronizar o banco de dados e tabelas
    await syncDatabase(sequelizeMaster);
    console.log(`Servidor rodando em http://localhost:${port}`);
  } catch (error) {
    console.error('Erro durante a inicialização da API:', error);
  }
});
