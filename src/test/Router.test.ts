import request from 'supertest';
import { createApp } from '../App'; 
import { Application } from 'express';

describe('POST /api/saque', () => {
  let app: Application;

  beforeAll(() => {
    app = createApp();
  });

  it('Deve retornar 200 e distribuição correta de cédulas para 380', async () => {
    const response = await request(app)
      .post('/api/saque')
      .send({ valor: 380 })
      .expect(200);

    expect(response.body).toEqual({
      100: 3,
      50: 1,
      20: 1,
      10: 1,
      5: 0,
      2: 0
    });
  });

  it('deve retornar 200 para valor mínimo (2)', async () => {
    const response = await request(app)
      .post('/api/saque')
      .send({ valor: 2 })
      .expect(200);

    expect(response.body).toEqual({
      100: 0,
      50: 0,
      20: 0,
      10: 0,
      5: 0,
      2: 1
    });
  });

  it('deve retornar 400 se valor não for fornecido', async () => {
    const response = await request(app)
      .post('/api/saque')
      .send({})
      .expect(400);

    expect(response.body).toHaveProperty('error');
    expect(response.body.message).toContain('obrigatório');
  });

  it('deve retornar 400 se valor não for número', async () => {
    const response = await request(app)
      .post('/api/saque')
      .send({ valor: 'abc' })
      .expect(400);

    expect(response.body).toHaveProperty('error');
  });

  it('deve retornar 400 para valor zero', async () => {
    const response = await request(app)
      .post('/api/saque')
      .send({ valor: 0 })
      .expect(400);

    expect(response.body).toHaveProperty('error');
    expect(response.body.message).toContain('maior que zero');
  });

  it('deve retornar 400 para valor negativo', async () => {
    const response = await request(app)
      .post('/api/saque')
      .send({ valor: -50 })
      .expect(400);

    expect(response.body).toHaveProperty('error');
  });

  it('deve retornar 400 para valor decimal', async () => {
    const response = await request(app)
      .post('/api/saque')
      .send({ valor: 100.5 })
      .expect(400);

    expect(response.body).toHaveProperty('error');
    expect(response.body.message).toContain('inteiro');
  });

  it('deve retornar 400 para valor que não pode ser representado (73)', async () => {
    const response = await request(app)
      .post('/api/saque')
      .send({ valor: 73 })
      .expect(400);

    expect(response.body).toHaveProperty('error');
    expect(response.body.message).toContain('Não é possível sacar');
  });

  it('deve retornar 200 para valores grandes', async () => {
    const response = await request(app)
      .post('/api/saque')
      .send({ valor: 1000 })
      .expect(200);

    expect(response.body).toEqual({
      100: 10,
      50: 0,
      20: 0,
      10: 0,
      5: 0,
      2: 0
    });
  });
});

describe('GET /api/health', () => {
  let app: Application;

  beforeAll(() => {
    app = createApp();
  });

  it('deve retornar status OK', async () => {
    const response = await request(app)
      .get('/api/health')
      .expect(200);

    expect(response.body).toHaveProperty('status', 'OK');
    expect(response.body).toHaveProperty('message');
    expect(response.body).toHaveProperty('timestamp');
  });
});

describe('GET /', () => {
  let app: Application;

  beforeAll(() => {
    app = createApp();
  });

  it('deve retornar informações da API', async () => {
    const response = await request(app)
      .get('/')
      .expect(200);

    expect(response.body).toHaveProperty('message');
    expect(response.body).toHaveProperty('version');
    expect(response.body).toHaveProperty('endpoints');
  });
});