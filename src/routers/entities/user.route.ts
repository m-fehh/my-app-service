import { Router } from 'express';
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  authenticateUser,
  refreshJwt,
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
 *                 description: Nome de usuário
 *               email:
 *                 type: string
 *                 description: Email do usuário
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *               isActive:
 *                 type: boolean
 *                 description: "Status ativo do usuário (padrão: true)"
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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
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
 *                 description: Nome de usuário
 *               email:
 *                 type: string
 *                 description: Email do usuário
 *               password:
 *                 type: string
 *                 description: Senha do usuário (opcional)
 *               isActive:
 *                 type: boolean
 *                 description: Status ativo do usuário (opcional)
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
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
 *                 description: Email do usuário
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Autenticação bem-sucedida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
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
 * /auth/refresh-token:
 *   post:
 *     summary: Atualizar o JWT usando um refresh token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: Refresh token fornecido
 *             required:
 *               - refreshToken
 *     responses:
 *       200:
 *         description: Token atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Novo token JWT gerado
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Refresh token inválido ou expirado
 *       500:
 *         description: Erro ao atualizar token
 */
router.post('/auth/refresh-token', refreshJwt);

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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao desativar usuário
 */
router.patch('/users/:id/deactivate', deactivateUser);

export default router;
