const { poolPromise } = require('../config/db.service');

class UserModel {
  static async getUsers() {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Users');
    return result.recordset;
  }

  // Adicione métodos adicionais conforme necessário
}

module.exports = UserModel;
