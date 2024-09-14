import { Sequelize } from 'sequelize';
import { sequelizeMaster, useDatabase } from '../config/database';
import { QueryTypes } from 'sequelize';

// Função para criar o banco de dados e o esquema se não existir
const createDatabaseIfNotExists = async (databaseName: string, schemaName: string): Promise<Sequelize> => {
  try {
    // Executar uma consulta SQL para criar o banco de dados
    await sequelizeMaster.query(`IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = '${databaseName}')
    BEGIN
      CREATE DATABASE ${databaseName};
    END`, { type: QueryTypes.RAW });

    // Atualizar a instância do Sequelize para usar o novo banco de dados
    const sequelize = useDatabase(databaseName);

    // Testar a conexão
    await sequelize.authenticate();
    console.log('Banco de dados conectado com sucesso.');

    // Criar o esquema se não existir
    await sequelize.query(`IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = '${schemaName}')
    BEGIN
      EXEC sp_executesql N'CREATE SCHEMA ${schemaName}';
    END`, { type: QueryTypes.RAW });

    // Retornar a instância do Sequelize
    return sequelize;
  } catch (error) {
    console.error('Erro ao criar o banco de dados ou esquema:', error);
    throw error;
  }
};

// Função para sincronizar tabelas
const syncDatabase = async (sequelize: Sequelize) => {
  try {
    // Sincronizar os modelos e tabelas
    await sequelize.sync({ alter: true });
    console.log('Tabelas sincronizadas com sucesso.');
  } catch (error) {
    console.error('Erro ao sincronizar o banco de dados:', error);
    throw error;
  }
};

export { createDatabaseIfNotExists, syncDatabase };
