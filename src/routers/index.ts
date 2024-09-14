import { Router } from 'express';
import userRoutes from './entities/user.route';

const router = Router();

// Definindo as rotas
router.use(userRoutes);

export default router;
