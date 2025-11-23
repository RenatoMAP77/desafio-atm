import { SaqueService } from '../services/SaqueService';

describe('SaqueService', () => {
  let service: SaqueService;

  beforeEach(() => {
    service = new SaqueService();
  });

  describe('calcularSaque', () => {
    it('deve calcular corretamente o saque de 380', () => {
      const resultado = service.calcularSaque(380);
      
      expect(resultado).toEqual({
        100: 3,
        50: 1,
        20: 1,
        10: 1,
        5: 0,
        2: 0
      });
    });

    it('deve calcular corretamente o saque de 100', () => {
      const resultado = service.calcularSaque(100);
      
      expect(resultado).toEqual({
        100: 1,
        50: 0,
        20: 0,
        10: 0,
        5: 0,
        2: 0
      });
    });

    it('deve calcular corretamente o saque de 2', () => {
      const resultado = service.calcularSaque(2);
      
      expect(resultado).toEqual({
        100: 0,
        50: 0,
        20: 0,
        10: 0,
        5: 0,
        2: 1
      });
    });

    it('deve lançar erro para valor que não pode ser representado (73)', () => {
      expect(() => service.calcularSaque(73)).toThrow(
        'Não é possível sacar o valor de R$ 73'
      );
    });

    it('deve lançar erro para valor ímpar que não pode ser representado (1)', () => {
      expect(() => service.calcularSaque(1)).toThrow();
    });

    it('deve lançar erro para valor ímpar que não pode ser representado (3)', () => {
      expect(() => service.calcularSaque(3)).toThrow();
    });

    it('deve calcular corretamente valores grandes', () => {
      const resultado = service.calcularSaque(1000);
      
      expect(resultado).toEqual({
        100: 10,
        50: 0,
        20: 0,
        10: 0,
        5: 0,
        2: 0
      });
    });

    it('deve calcular corretamente combinações complexas (192)', () => {
      const resultado = service.calcularSaque(192);
      
      expect(resultado).toEqual({
        100: 1,
        50: 1,
        20: 2,
        10: 0,
        5: 0,
        2: 1
      });
    });
  });

  describe('validarValor', () => {
    it('deve validar valor positivo inteiro', () => {
      expect(() => service.validarValor(100)).not.toThrow();
    });

    it('deve lançar erro para valor zero', () => {
      expect(() => service.validarValor(0)).toThrow(
        'O valor deve ser maior que zero'
      );
    });

    it('deve lançar erro para valor negativo', () => {
      expect(() => service.validarValor(-100)).toThrow(
        'O valor deve ser maior que zero'
      );
    });

    it('deve lançar erro para valor decimal', () => {
      expect(() => service.validarValor(100.5)).toThrow(
        'O valor deve ser um número inteiro'
      );
    });

    it('deve lançar erro para NaN', () => {
      expect(() => service.validarValor(NaN)).toThrow(
        'O valor deve ser um número válido'
      );
    });

    it('deve lançar erro para valor menor que 2', () => {
      expect(() => service.validarValor(1)).toThrow(
        'O valor mínimo para saque é R$ 2'
      );
    });

    it('deve validar valor exatamente 2', () => {
      expect(() => service.validarValor(2)).not.toThrow();
    });
  });
});