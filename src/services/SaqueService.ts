import { SaqueResponse, CEDULAS_DISPONIVEIS } from '../types/Types';


export class SaqueService {
  /**
   * Calcula a quantidade mínima de cédulas necessárias para um saque
   * Utiliza algoritmo guloso para distribuição ótima
   * 
   * @param valor - Valor do saque desejado
   * @returns Objeto com quantidade de cada cédula
   * @throws Error se o valor não puder ser sacado com as cédulas disponíveis
   */
  public calcularSaque(valor: number): SaqueResponse {
    const resultado: SaqueResponse = {
      100: 0,
      50: 0,
      20: 0,
      10: 0,
      5: 0,
      2: 0
    };

    let valorRestante = valor;

    for (const cedula of CEDULAS_DISPONIVEIS) {
      if (valorRestante >= cedula) {
        const quantidadeCedulas = Math.floor(valorRestante / cedula);
        resultado[cedula] = quantidadeCedulas;

        valorRestante -= quantidadeCedulas * cedula;
      }
    }

    if (valorRestante > 0) {
      throw new Error(
        `Não é possível sacar o valor de R$ ${valor}. ` +
        `As cédulas disponíveis são: 100, 50, 20, 10, 5 e 2. ` +
        `Valor de R$ ${valorRestante} não pode ser representado com essas cédulas.`
      );
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