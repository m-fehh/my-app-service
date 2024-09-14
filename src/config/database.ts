import { Sequelize } from 'sequelize';

// Configuração principal para o banco de dados SystemDB
const sequelizeMaster = new Sequelize('SystemDB', 'admin', 'admin', {
  host: 'localhost',
  dialect: 'mssql',
  logging: false,
});

// Função para criar a conexão para um banco de dados específico
const useDatabase = (databaseName: string) => {
  return new Sequelize(databaseName, 'admin', 'admin', {
    host: 'localhost',
    dialect: 'mssql',
    logging: false,
  });
};

export { sequelizeMaster, useDatabase };
