import { Sequelize } from 'sequelize';
import { sequelizeMaster, useDatabase } from '../config/database';
import { QueryTypes } from 'sequelize';

// Função para criar o banco de dados e o esquema se não existir
const createDatabaseIfNotExists = async (databaseName: string, schemaName: string): Promise<Sequelize> => {
  try {
    await sequelizeMaster.query(`IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = '${databaseName}')
    BEGIN
      CREATE DATABASE ${databaseName};
    END`, { type: QueryTypes.RAW });

    const sequelize = useDatabase(databaseName);
    await sequelize.authenticate();
    console.log('Banco de dados conectado com sucesso.');

    await sequelize.query(`IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = '${schemaName}')
    BEGIN
      EXEC sp_executesql N'CREATE SCHEMA ${schemaName}';
    END`, { type: QueryTypes.RAW });

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
