import { Router } from 'express';
import { SaqueController } from '../controllers/SaqueController';
import { validateSaqueRequest } from '../middleware/ValidationMiddleware';

/**
 * Configura e retorna as rotas da aplicação
 */
export const configureRoutes = (): Router => {
  const router = Router();
  const saqueController = new SaqueController();

  /**
   * @swagger
   * /api/health:
   *   get:
   *     summary: Verifica status da API
   *     description: Retorna informações sobre o estado de funcionamento da API
   *     tags: [Health]
   *     responses:
   *       200:
   *         description: API está funcionando normalmente
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/HealthResponse'
   *             example:
   *               status: OK
   *               message: API de Caixa Eletrônico está funcionando
   *               timestamp: 2024-01-15T10:30:00.000Z
   */
  router.get('/health', saqueController.healthCheck);

  /**
   * @swagger
   * /api/saque:
   *   post:
   *     summary: Realiza um saque
   *     description: Calcula a distribuição mínima de cédulas para um valor de saque
   *     tags: [Saque]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/SaqueRequest'
   *           examples:
   *             exemplo1:
   *               summary: Saque de R$ 380
   *               value:
   *                 valor: 380
   *             exemplo2:
   *               summary: Saque de R$ 100
   *               value:
   *                 valor: 100
   *             exemplo3:
   *               summary: Saque mínimo (R$ 2)
   *               value:
   *                 valor: 2
   *     responses:
   *       200:
   *         description: Saque realizado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/SaqueResponse'
   *             examples:
   *               exemplo1:
   *                 summary: Distribuição para R$ 380
   *                 value:
   *                   100: 3
   *                   50: 1
   *                   20: 1
   *                   10: 1
   *                   5: 0
   *                   2: 0
   *               exemplo2:
   *                 summary: Distribuição para R$ 100
   *                 value:
   *                   100: 1
   *                   50: 0
   *                   20: 0
   *                   10: 0
   *                   5: 0
   *                   2: 0
   *       400:
   *         description: Erro de validação ou valor impossível de representar
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   *             examples:
   *               valorNegativo:
   *                 summary: Valor negativo
   *                 value:
   *                   error: Erro ao processar saque
   *                   message: O valor deve ser maior que zero
   *               valorDecimal:
   *                 summary: Valor decimal
   *                 value:
   *                   error: Erro ao processar saque
   *                   message: O valor deve ser um número inteiro
   *               valorImpossivel:
   *                 summary: Valor impossível (73)
   *                 value:
   *                   error: Erro ao processar saque
   *                   message: Não é possível sacar o valor de R$ 73. As cédulas disponíveis são 100, 50, 20, 10, 5 e 2
   *               campoObrigatorio:
   *                 summary: Campo ausente
   *                 value:
   *                   error: Validação falhou
   *                   message: O campo "valor" é obrigatório
   */
  router.post('/saque', validateSaqueRequest, saqueController.realizarSaque);

  return router;
};
