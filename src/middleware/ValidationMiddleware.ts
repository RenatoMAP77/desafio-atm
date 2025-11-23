import { Request, Response, NextFunction } from 'express';
import { ErrorResponse } from '../types/Types';

/**
 * Middleware para validar a requisição de saque
 * Verifica se o corpo da requisição contém o campo 'valor' válido
 */
export const validateSaqueRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { valor } = req.body;

  if (valor === undefined || valor === null) {
    const errorResponse: ErrorResponse = {
      error: 'Validação falhou',
      message: 'O campo "valor" é obrigatório'
    };
    res.status(400).json(errorResponse);
    return;
  }

  if (typeof valor !== 'number') {
    const errorResponse: ErrorResponse = {
      error: 'Validação falhou',
      message: 'O campo "valor" deve ser um número'
    };
    res.status(400).json(errorResponse);
    return;
  }

  next();
};