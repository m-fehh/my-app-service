const UserModel = require('../models/userModel');

class UserController {
  static async getUsers(req, res) {
    try {
      const users = await UserModel.getUsers();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao obter usuários' });
    }
  }

  // Adicione métodos adicionais conforme necessário
}

module.exports = UserController;
