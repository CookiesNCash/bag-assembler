import app from '../src/server.js';

app.listen(8081, () => {
  console.log('Сервер запущен на порту 8081');
  console.log('Перейдите по ссылке http://localhost:8081/');
});
