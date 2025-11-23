import { createApp } from './App';

const PORT = process.env.PORT || 5000;

const app = createApp();

app.listen(PORT, () => {
  console.log('---------------------------------------');
  console.log('  API de Caixa Eletrônico   ');
  console.log('---------------------------------------');
  console.log(` Servidor rodando na porta ${PORT}`);
  console.log(` API disponível em: http://localhost:${PORT}`);
  console.log(` Health check: http://localhost:${PORT}/api/health`);
  console.log(` Endpoint de saque: POST http://localhost:${PORT}/api/saque`);
  console.log(` Especificação Swagger OpenAPI: http://localhost:${PORT}/api-docs`);
});