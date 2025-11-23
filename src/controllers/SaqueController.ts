import { Request, Response } from 'express';
import { SaqueService } from '../services/SaqueService';
import { SaqueRequest, SaqueResponse, ErrorResponse } from '../types/Types';

/**
 * Controller responsável por lidar com requisições relacionadas a saques
 */
export class SaqueController {
  private saqueService: SaqueService;

  constructor() {
    this.saqueService = new SaqueService();
  }

  /**
   * Handler para requisições POST em /api/saque
   * Processa solicitação de saque e retorna distribuição de cédulas
   * 
   * @param req - Requisição Express
   * @param res - Resposta Express
   */
  realizarSaque = async (req: Request, res: Response): Promise<void> => {
    try {
      const { valor }: SaqueRequest = req.body;

      this.saqueService.validarValor(valor);

      const resultado: SaqueResponse = this.saqueService.calcularSaque(valor);

      res.status(200).json(resultado);
    } catch (error) {
      if (error instanceof Error) {
        const errorResponse: ErrorResponse = {
          error: 'Erro ao processar saque',
          message: error.message
        };
        res.status(400).json(errorResponse);
      } else {
        const errorResponse: ErrorResponse = {
          error: 'Erro interno',
          message: 'Ocorreu um erro inesperado ao processar o saque'
        };
        res.status(500).json(errorResponse);
      }
    }
  };

  /**
   * Handler para requisições GET em /api/health
   * Verifica se a API está funcionando
   */
  healthCheck = async (req: Request, res: Response): Promise<void> => {
    res.status(200).json({
      status: 'OK',
      message: 'API de Caixa Eletrônico está funcionando',
      timestamp: new Date().toISOString()
    });
  };
}