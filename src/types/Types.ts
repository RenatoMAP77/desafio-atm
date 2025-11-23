/**
 * Interface para requisição de saque
 */
export interface SaqueRequest {
  valor: number;
}

/**
 * Interface para resposta de saque
 * Representa a quantidade de cada cédula necessária
 */
export interface SaqueResponse {
  100: number;
  50: number;
  20: number;
  10: number;
  5: number;
  2: number;
}

/**
 * Interface para resposta de erro
 */
export interface ErrorResponse {
  error: string;
  message: string;
}

/**
 * Tipo para as cédulas disponíveis
 */
export type Cedula = 100 | 50 | 20 | 10 | 5 | 2;

/**
 * Array ordenado das cédulas disponíveis (da maior para a menor)
 */
export const CEDULAS_DISPONIVEIS: Cedula[] = [100, 50, 20, 10, 5, 2];