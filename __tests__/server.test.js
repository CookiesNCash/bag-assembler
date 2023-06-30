// server.test.js
import request from 'supertest';
import app from '../src/server.js';

describe('POST /save-personalization', () => {
  it('should save personalization data and return 200', async () => {
    const userData = {
      days: 5,
      cityFrom: 'Moscow',
      cityTo: 'Saint Petersburg',
      bagSize: 'Рюкзак',
      tripPurpose: 'Vacation',
    };

    const response = await request(app)
      .post('/save-personalization')
      .send(userData);

    expect(response.status).toBe(200);
  });
});

describe('GET /get-result', () => {
  it('should return the result with user data and 200', async () => {
    const response = await request(app).get('/get-result');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('user');
    expect(response.body).toHaveProperty('result');
  });
});
