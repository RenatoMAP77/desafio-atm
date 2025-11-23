import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { configureRoutes } from './routes/Router';
import { corsConfig } from './config/CorsConfig';
import { swaggerSpec, swaggerUiOptions } from './config/SwaggerConfig';
import swaggerUi from 'swagger-ui-express';

/**
 * Cria e configura a aplicação Express
 */
export const createApp = (): Application => {
  const app: Application = express();

  app.use(cors(corsConfig)); 
  app.use(express.json()); 
  app.use(express.urlencoded({ extended: true })); 

  app.get('/api-docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  app.use('/api-docs', swaggerUi.serve);
  app.get('/api-docs', swaggerUi.setup(swaggerSpec, swaggerUiOptions));

  // Rotas da API
  app.use('/api', configureRoutes());

  app.get('/', (req: Request, res: Response) => {
    res.json({
      message: 'API de Caixa Eletrônico',
      version: '1.0.0',
      endpoints: {
        health: 'GET /api/health',
        saque: 'POST /api/saque'
      }
    });
  });

  app.use((req: Request, res: Response) => {
    res.status(404).json({
      error: 'Not Found',
      message: `Rota ${req.method} ${req.path} não encontrada`
    });
  });

  return app;
};