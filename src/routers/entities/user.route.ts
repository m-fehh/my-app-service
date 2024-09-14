import { Router } from 'express';
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  authenticateUser,
  deactivateUser
} from '../../controllers/user.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints para gerenciar usuários
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Criar um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro ao criar usuário
 */
router.post('/users', createUser);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obter todos os usuários
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de todos os usuários
 *       500:
 *         description: Erro ao buscar usuários
 */
router.get('/users', getUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obter um usuário por ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao buscar usuário
 */
router.get('/users/:id', getUserById);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualizar um usuário
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao atualizar usuário
 */
router.put('/users/:id', updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Deletar um usuário
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao deletar usuário
 */
router.delete('/users/:id', deleteUser);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Autenticar um usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Autenticação bem-sucedida
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Credenciais inválidas
 *       500:
 *         description: Erro ao autenticar usuário
 */
router.post('/auth/login', authenticateUser);

/**
 * @swagger
 * /users/{id}/deactivate:
 *   patch:
 *     summary: Desativar um usuário
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário desativado com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao desativar usuário
 */
router.patch('/users/:id/deactivate', deactivateUser);

export default router;
