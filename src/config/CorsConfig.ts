import { CorsOptions } from 'cors';

/**
 * Configuração do CORS (Cross-Origin Resource Sharing)
 * 
 */

const allowedOrigins = [
  'http://localhost:3000',      
  'http://localhost:3001',      
  'http://localhost:4200',      
  'http://localhost:8080',      
  'http://localhost:5173',      
];

export const corsConfig: CorsOptions = {
  /**
   * Define quais origens podem acessar a API
   */
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(null, true);
  },

  /**
   * Métodos HTTP permitidos
   */
  methods: ['GET', 'POST'],

  /**
   * Headers permitidos nas requisições
   */
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
  ],

  /**
   * Headers que o navegador pode acessar na resposta
   */
  exposedHeaders: ['Content-Length', 'X-Request-Id'],

  /**
   * Permite envio de cookies e credenciais
   */
  credentials: true,
};

/**
 * Configuração CORS simplificada para desenvolvimento
 */
export const corsConfigDev: CorsOptions = {
  origin: true,  
  credentials: true,
};

