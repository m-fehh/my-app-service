import { Request, Response } from 'express';
import { IRepository } from '../repositories/IRepository';
import User from '../models/user.model';
import { sequelizeMaster } from '../config/database';
import { Repository } from '../repositories/Repository';
import { generateToken, refreshToken as refreshAuthToken, authenticateUser as authenticateUserService } from '../services/auth.service';

// Criar uma instância do repositório genérico
const userRepository: IRepository<User> = new Repository<User>(User, sequelizeMaster);

// Função auxiliar para tratar erros
const handleError = (res: Response, message: string, statusCode: number) => {
  console.error(message);
  return res.status(statusCode).json({ message });
};

// Criar um novo usuário
export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password, isActive = true } = req.body;

    // Validação dos parâmetros obrigatórios
    if (!username || !email || !password) {
      return handleError(res, 'Username, email, and password are required.', 400);
    }

    // Criação do usuário com os campos recebidos
    const user = await userRepository.create({ username, email, password, isActive });
    return res.status(201).json({ message: 'User created successfully.', user });
  } catch (error) {
    return handleError(res, 'Error creating user.', 500);
  }
};

// Obter todos os usuários
export const getUsers = async (req: Request, res: Response) => {
  try {
    // Buscar todos os usuários
    const users = await userRepository.findAll();
    return res.status(200).json(users);
  } catch (error) {
    return handleError(res, 'Error fetching users.', 500);
  }
};

// Obter um usuário por ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Buscar usuário por ID
    const user = await userRepository.findById(Number(id));

    if (!user) {
      return handleError(res, 'User not found.', 404);
    }

    return res.status(200).json(user);
  } catch (error) {
    return handleError(res, 'Error fetching user.', 500);
  }
};

// Atualizar um usuário
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { username, email, password, isActive } = req.body;

    // Verifica se a senha está sendo atualizada e cria o hash
    if (password) {
      req.body.password = await User.hashPassword(password);
    }

    // Atualizar o usuário
    const user = await userRepository.update(Number(id), { username, email, password, isActive });

    if (!user) {
      return handleError(res, 'User not found.', 404);
    }

    return res.status(200).json({ message: 'User updated successfully.', user });
  } catch (error) {
    return handleError(res, 'Error updating user.', 500);
  }
};

// Deletar um usuário
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Deletar o usuário
    const success = await userRepository.delete(Number(id));

    if (!success) {
      return handleError(res, 'User not found.', 404);
    }

    return res.status(200).json({ message: 'User deleted successfully.' });
  } catch (error) {
    return handleError(res, 'Error deleting user.', 500);
  }
};

// Autenticar um usuário (Login)
export const authenticateUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validação dos parâmetros obrigatórios
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Utilizar o serviço de autenticação para validar o usuário
    const token = await authenticateUserService(email, password);

    return res.status(200).json({ message: 'Authentication successful.', token });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Invalid email or password.' });
  }
};

// Atualizar o JWT caso expire
export const refreshJwt = async (req: Request, res: Response) => {
  try {
    // Obter o token do corpo da requisição
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: 'Refresh token not provided.' });
    }

    // Usar o serviço de autenticação para tentar renovar o token
    const newToken = await refreshAuthToken(refreshToken);

    return res.status(200).json({ message: 'Token refreshed successfully.', token: newToken });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Could not refresh token.' });
  }
};


// Desativar um usuário
export const deactivateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Buscar usuário por ID
    const user = await userRepository.findById(Number(id));

    if (!user) {
      return handleError(res, 'User not found.', 404);
    }

    // Desativar o usuário
    user.isActive = false;
    await userRepository.update(Number(id), user);

    return res.status(200).json({ message: 'User deactivated successfully.', user });
  } catch (error) {
    return handleError(res, 'Error deactivating user.', 500);
  }
};
