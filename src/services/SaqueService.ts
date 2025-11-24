import { SaqueResponse, CEDULAS_DISPONIVEIS } from '../types/Types';


export class SaqueService {
  /**
   * Calcula a quantidade mínima de cédulas necessárias para um saque
   * Utiliza programação dinâmica para encontrar a solução ótima
   * 
   * @param valor - Valor do saque desejado
   * @returns Objeto com quantidade de cada cédula
   * @throws Error se o valor não puder ser sacado com as cédulas disponíveis
   */
  public calcularSaque(valor: number): SaqueResponse {

    const dp: number[] = new Array(valor + 1).fill(Infinity);
    dp[0] = 0;

    const cedulas: number[] = new Array(valor + 1).fill(-1);

    for (let i = 1; i <= valor; i++) {
      for (const cedula of CEDULAS_DISPONIVEIS) {
        if (cedula <= i && dp[i - cedula] !== Infinity) {
          if (dp[i - cedula] + 1 < dp[i]) {
            dp[i] = dp[i - cedula] + 1;
            cedulas[i] = cedula;
          }
        }
      }
    }

    if (dp[valor] === Infinity) {
      throw new Error(
        `Não é possível sacar o valor de R$ ${valor}. ` +
        `As cédulas disponíveis são: 100, 50, 20, 10, 5 e 2.`
      );
    }

    const resultado: SaqueResponse = {
      100: 0,
      50: 0,
      20: 0,
      10: 0,
      5: 0,
      2: 0
    };

    let valorAtual = valor;
    while (valorAtual > 0) {
      const cedulaUsada = cedulas[valorAtual] as keyof SaqueResponse;
      resultado[cedulaUsada]++;
      valorAtual -= cedulaUsada;
    }

    return resultado;
  }

  /**
   * Valida se o valor é elegível para saque
   * 
   * @param valor - Valor a ser validado
   * @throws Error se o valor for inválido
   */
  public validarValor(valor: number): void {
    if (typeof valor !== 'number' || isNaN(valor)) {
      throw new Error('O valor deve ser um número válido');
    }

    if (!Number.isInteger(valor)) {
      throw new Error('O valor deve ser um número inteiro');
    }

    if (valor <= 0) {
      throw new Error('O valor deve ser maior que zero');
    }

    if (valor < 2) {
      throw new Error('O valor mínimo para saque é R$ 2');
    }
  }
}