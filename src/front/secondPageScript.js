import algorithm from './draftAlgorithm.js';
import getWeatherApi from './weatherApi.js';

document.getElementById('personalization-form').addEventListener('submit', (event) => {
  event.preventDefault(); // Отменить отправку формы по умолчанию

  const days = document.getElementById('days').value;
  const cities = document.getElementById('cities').value;
  const health = document.getElementById('health').value;
  const children = document.getElementById('children').value;
  const pets = document.getElementById('pets').value;
  const accommodation = document.getElementById('accommodation').value;

  // Отправка данных на сервер
  fetch('/save-personalization', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      days,
      cities,
      health,
      children,
      pets,
      accommodation,
    }),
  })
    .then((response) => {
      if (response.ok) {
        console.log('Информация успешно сохранена на сервере.');
      } else {
        console.error('Ошибка при сохранении информации на сервере.');
      }
    })
    .catch((error) => {
      console.error('Ошибка при отправке запроса:', error);
    });
});

document.addEventListener('DOMContentLoaded', async () => {
  const btn = document.getElementById('btn-analise');
  btn.addEventListener('click', async () => {
    try {
      const response = await fetch('/get-data'); // Fetch the saved data
      const jsonData = await response.json();
      const city = jsonData.cities;
      const link = `http://api.weatherapi.com/v1/current.json?key=6cf406ee732b442baa172614230806&lang=ru&q=${city}`;
      const api = getWeatherApi(link);
      console.log(api);
      const transformedData = algorithm(jsonData.user, jsonData.personalization).join(', ');
      const contentElement = document.getElementById('content');
      const formattedJson = JSON.stringify(transformedData, null, 2);
      contentElement.textContent = formattedJson;
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  });
});
