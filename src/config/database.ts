import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('SystemDB', 'admin', 'admin', {
  host: 'localhost',
  dialect: 'mssql',
  logging: false, 
});

export default sequelize;
