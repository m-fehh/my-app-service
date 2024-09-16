import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import path from 'path';

// Carregar variáveis de ambiente
dotenv.config({ path: path.resolve(__dirname, '../../environments/.env') });

// Configuração principal para o banco de dados SystemDB
const sequelizeMaster = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASSWORD!, {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!, 10),
  dialect: 'mssql',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
});

// Função para criar a conexão para um banco de dados específico
const useDatabase = (databaseName: string) => {
  return new Sequelize(databaseName, process.env.DB_USER!, process.env.DB_PASSWORD!, {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT!, 10),
    dialect: 'mssql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
  });
};

export { sequelizeMaster, useDatabase };
