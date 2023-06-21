import express from 'express';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs/promises';
import algorithm from './algorithm.js';

const { dataHandler } = algorithm;

const app = express();

app.use(express.json());

const __filename = fileURLToPath(import.meta.url); // eslint-disable-line
const __dirname = dirname(__filename); // eslint-disable-line

const usersDirectory = path.resolve(__dirname, '../database/users/');
const userFilePath = path.join(usersDirectory, 'user.json');
const resultFilePath = path.join(usersDirectory, 'result.json');

app.post('/save-personalization', async (req, res) => {
  const { days, city } = req.body;

  try {
    const userData = await fs.readFile(userFilePath, 'utf-8');
    const userDataParsed = JSON.parse(userData);

    userDataParsed.days = days;
    userDataParsed.city = city;

    await fs.writeFile(userFilePath, JSON.stringify(userDataParsed));
    console.log('Данные о персонализации успешно сохранены в user.json');
    res.sendStatus(200);
  } catch (error) {
    console.error('Ошибка при сохранении данных о персонализации:', error);
    res.status(500).json({ error: 'Ошибка при сохранении данных о персонализации' });
  }
});

app.get('/get-result', async (req, res) => {
  try {
    const userData = await fs.readFile(userFilePath, 'utf-8');
    const userDataParsed = JSON.parse(userData);
    const result = await dataHandler(userDataParsed);
    await fs.writeFile(resultFilePath, JSON.stringify(result));
    console.log('Результат успешно сохранен в result.json');
    res.status(200).json({ user: userDataParsed, result });
  } catch (error) {
    console.error('Ошибка при сохранении результата:', error);
    res.status(500).json({ error: 'Ошибка при сохранении результата' });
  }
});

app.use(express.static(__dirname));

export default app;
