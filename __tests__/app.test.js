import request from 'supertest';
import app from '../src/front/server.js';

describe('API tests', () => {
  let userData;
  let personalizationData;

  beforeAll(async () => {
    userData = {
      name: 'John Doe',
      sex: 'Male',
      age: 30,
      placeLive: 'City',
      citizenship: 'USA',
      religion: 'Christianity',
    };

    personalizationData = {
      days: 5,
      cities: ['New York'],
      health: 'Good',
      children: false,
      pets: true,
      accommodation: 'Hotel',
    };

    // Сохранение имени пользователя
    await request(app)
      .post('/save-username')
      .send(userData);

    // Сохранение информации из формы персонализации
    await request(app)
      .post('/save-personalization')
      .send(personalizationData);
  });

  it('should return status 200 for root endpoint', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });

  it('should save username to file', async () => {
    const response = await request(app)
      .post('/save-username')
      .send(userData);

    expect(response.status).toBe(200);
  });

  it('should save personalization info to file', async () => {
    const response = await request(app)
      .post('/save-personalization')
      .send(personalizationData);

    expect(response.status).toBe(200);
  });

  it('should get saved data', async () => {
    // Получение сохраненных данных
    const response = await request(app).get('/get-data');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      user: userData,
      personalization: personalizationData,
    });
  });
});
