// src/controllers/user.controller.ts
import { Request, Response } from 'express';
import { IRepository } from '../repositories/IRepository';  
import User from '../models/user.model'; 
import { sequelizeMaster } from '../config/database';  
import { Repository } from '../repositories/Repository';  

// Criar uma instância do repositório genérico
const userRepository: IRepository<User> = new Repository<User>(User, sequelizeMaster);

// Criar um novo usuário
export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password, isActive = true } = req.body;

    // Validação dos parâmetros obrigatórios
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Username, email, and password are required.' });
    }

    // Criação do usuário com os campos recebidos
    const user = await userRepository.create({ username, email, password, isActive });
    return res.status(201).json({ message: 'User created successfully.', user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error creating user.' });
  }
};

// Obter todos os usuários
export const getUsers = async (req: Request, res: Response) => {
  try {
    // Buscar todos os usuários
    const users = await userRepository.findAll();
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching users.' });
  }
};

// Obter um usuário por ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Buscar usuário por ID
    const user = await userRepository.findById(Number(id));

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching user.' });
  }
};

// Atualizar um usuário
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { username, email, password, isActive } = req.body;

    // Atualizar o usuário
    const user = await userRepository.update(Number(id), { username, email, password, isActive });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    return res.status(200).json({ message: 'User updated successfully.', user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error updating user.' });
  }
};

// Deletar um usuário
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Deletar o usuário
    const success = await userRepository.delete(Number(id));

    if (!success) { 
      return res.status(404).json({ message: 'User not found.' });
    }

    return res.status(200).json({ message: 'User deleted successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error deleting user.' });
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

    // Buscar o usuário por email
    const user = await userRepository.findOne({ email });

    // Validar senha
    if (!user || !(await user.validatePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    return res.status(200).json({ message: 'Authentication successful.', user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error authenticating user.' });
  }
};

// Desativar um usuário
export const deactivateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Buscar usuário por ID
    const user = await userRepository.findById(Number(id));

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Desativar o usuário
    user.isActive = false;
    await userRepository.update(Number(id), user);

    return res.status(200).json({ message: 'User deactivated successfully.', user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error deactivating user.' });
  }
};
