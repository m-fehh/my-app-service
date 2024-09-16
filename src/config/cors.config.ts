import { CorsOptions } from 'cors';

// Função para criar opções de CORS com base nas variáveis de ambiente
const corsOptions: CorsOptions = {
  origin: process.env.FRONTEND_ORIGIN || '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
};

export default corsOptions;
