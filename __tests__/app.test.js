import request from 'supertest';
import app from '../src/front/server.js';

describe('API tests', () => {
  it('should return status 200 for root endpoint', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });

  it('should save username to file', async () => {
    const userData = {
      name: 'John Doe',
      sex: 'Male',
      age: 30,
      placeLive: 'City',
      citizenship: 'USA',
      religion: 'Christianity',
    };

    const response = await request(app)
      .post('/save-username')
      .send(userData);

    expect(response.status).toBe(200);
  });

  it('should save personalization info to file', async () => {
    const personalizationData = {
      days: 5,
      cities: ['New York'],
      health: 'Good',
      children: false,
      pets: true,
      accommodation: 'Hotel',
    };

    const response = await request(app)
      .post('/save-personalization')
      .send(personalizationData);

    expect(response.status).toBe(200);
  });
});
