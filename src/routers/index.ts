import { Router } from 'express';
import userRoutes from './entities/user.routes';

const router = Router();

// Definindo as rotas
router.use('/users', userRoutes);

export default router;
