const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.get('/users', UserController.getUsers);

// Adicione outras rotas conforme necessário

module.exports = router;
