import { Request, Response } from 'express';
import User from '../models/user.model';

// Criar um novo usuário
export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Username, email, and password are required.' });
    }

    const user = await User.create({ username, email, password });
    return res.status(201).json({ message: 'User created successfully.', user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error creating user.' });
  }
};

// Obter todos os usuários
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
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
    const user = await User.findByPk(id);

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

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    if (password) {
      await user.setPassword(password);
    }

    await user.update({ username, email, isActive });

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
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    await user.destroy();
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

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const user = await User.findOne({ where: { email } });

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
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    user.isActive = false;
    await user.save();

    return res.status(200).json({ message: 'User deactivated successfully.', user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error deactivating user.' });
  }
};
