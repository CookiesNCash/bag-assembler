import supertest from 'supertest';
import app from '../src/server.js';

describe('API tests', () => {
  it('should return status 200 for root endpoint', async () => {
    const response = await supertest(app).get('/');
    expect(response.status).toBe(200);
  });

  it('should save personalization info to file', async () => {
    const personalizationData = {
      days: 5,
      city: 'New York',
    };
    const savePersonalizationResponse = await supertest(app)
      .post('/save-personalization')
      .send(personalizationData);
    expect(savePersonalizationResponse.status).toBe(200);
    expect(savePersonalizationResponse.body).toEqual({});
  });

  it('should get saved data', async () => {
    const getSavedDataResponse = await supertest(app).get('/get-result');
    expect(getSavedDataResponse.status).toBe(200);
    expect(getSavedDataResponse.body.user.city).toEqual('New York');
    expect(getSavedDataResponse.body.user.days).toEqual(5);
    expect(getSavedDataResponse.body.result).toHaveLength(3);
  });
});

describe('Algorithm tests', () => {
  test('should return clothing rules for less than 7 days', async () => {
    const getSavedDataResponse = await supertest(app).get('/get-result');
    expect(getSavedDataResponse.status).toBe(200);
    expect(getSavedDataResponse.body.result).toEqual(['Немного одежды', 'Нормальная одежда', 'Зубная паста, зарядка, наушники, книги']);
  });

  //   test('should return clothing rules for more than 7 days', async () => {
  //     const getSavedDataResponse = await supertest(app).get('/get-result');
  //     expect(getSavedDataResponse.status).toBe(200);
  //     expect(getSavedDataResponse.body.result).toEqual(
  //      ['Средне одежды', 'Лёгкая одежда', 'Зубная паста, зарядка, наушники, книги']);
  //   });

  //   test('should return clothing rules for a city with temperature less than 13 degrees',
  //     async () => {
  //     const getSavedDataResponse = await supertest(app).get('/get-result');
  //     expect(getSavedDataResponse.status).toBe(200);
  //     expect(getSavedDataResponse.body.result).toEqual(
  //      ['Тёплая одежда', 'Нормальная одежда', 'Зубная паста, зарядка, наушники, книги']);
  //   });

//   test('should return clothing rules for a city with temperature more than 13 degrees',
//     async () => {
//     const getSavedDataResponse = await supertest(app).get('/get-result');
//     expect(getSavedDataResponse.status).toBe(200);
//     expect(getSavedDataResponse.body.result).toEqual(
//      ['Немного одежды', 'Лёгкая одежда', 'Зубная паста, зарядка, наушники, книги']);
//   });
// });
});
