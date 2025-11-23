import swaggerJsdoc from 'swagger-jsdoc';
import { SwaggerOptions } from 'swagger-ui-express';

/**
 * Configuração do Swagger/OpenAPI
 * 
 * Swagger UI é uma interface interativa que permite:
 * - Visualizar endpoints da API
 * - Testar requisições diretamente no navegador
 * - Ver exemplos de request/response
 * - Gerar documentação automática
 */

/**
 * Definição básica da API seguindo padrão OpenAPI 3.0
 */
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API de Caixa Eletrônico',
    version: '1.0.0',
    description: 
      'API REST que simula o funcionamento de um caixa eletrônico. ' +
      'Recebe um valor de saque e retorna a quantidade mínima de cédulas necessárias.'
  },
  servers: [
    {
      url: 'http://localhost:5000',
      description: 'Dev',
    }
  ],
  tags: [
    {
      name: 'Saque',
      description: 'Operações relacionadas a saques',
    },
    {
      name: 'Health',
      description: 'Verificação de saúde da API',
    },
  ],
  components: {
    schemas: {
      SaqueRequest: {
        type: 'object',
        required: ['valor'],
        properties: {
          valor: {
            type: 'integer',
            description: 'Valor do saque desejado em reais',
            example: 380,
            minimum: 2,
          },
        },
      },
      SaqueResponse: {
        type: 'object',
        properties: {
          '100': {
            type: 'integer',
            description: 'Quantidade de cédulas de R$ 100',
            example: 3,
          },
          '50': {
            type: 'integer',
            description: 'Quantidade de cédulas de R$ 50',
            example: 1,
          },
          '20': {
            type: 'integer',
            description: 'Quantidade de cédulas de R$ 20',
            example: 1,
          },
          '10': {
            type: 'integer',
            description: 'Quantidade de cédulas de R$ 10',
            example: 1,
          },
          '5': {
            type: 'integer',
            description: 'Quantidade de cédulas de R$ 5',
            example: 0,
          },
          '2': {
            type: 'integer',
            description: 'Quantidade de cédulas de R$ 2',
            example: 0,
          },
        },
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          error: {
            type: 'string',
            description: 'Tipo do erro',
            example: 'Erro ao processar saque',
          },
          message: {
            type: 'string',
            description: 'Mensagem detalhada do erro',
            example: 'O valor deve ser um número inteiro',
          },
        },
      },
      HealthResponse: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            description: 'Status da API',
            example: 'OK',
          },
          message: {
            type: 'string',
            description: 'Mensagem de status',
            example: 'API de Caixa Eletrônico está funcionando',
          },
          timestamp: {
            type: 'string',
            format: 'date-time',
            description: 'Timestamp da verificação',
            example: '2024-01-15T10:30:00.000Z',
          },
        },
      },
    },
  },
};

/**
 * Opções do swagger-jsdoc
 * Define onde procurar as anotações de documentação
 */
const options: swaggerJsdoc.Options = {
  definition: swaggerDefinition,
  apis: [
    './src/routes/*.ts',      // Rotas
    './src/controllers/*.ts', // Controllers
  ],
};

/**
 * Gera a especificação Swagger a partir das opções
 */
export const swaggerSpec = swaggerJsdoc(options);

/**
 * Opções de customização do Swagger UI
 */
export const swaggerUiOptions: SwaggerOptions = {
  customCss: '.swagger-ui .topbar { display: none }', // Esconde barra superior
  customSiteTitle: 'API Caixa Eletrônico - Documentação',
  customfavIcon: '/favicon.ico',
  swaggerOptions: {
    persistAuthorization: true, // Mantém tokens entre reloads
    displayRequestDuration: true, // Mostra tempo de resposta
    filter: true, // Habilita busca de endpoints
    tryItOutEnabled: true, // Habilita "Try it out" por padrão
  },
};