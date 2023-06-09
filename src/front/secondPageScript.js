import { algorithm } from './draftAlgorithm.js';


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


document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('btn-analise');
  btn.addEventListener('click', async () => {
    const response = await fetch('user.json');
    const jsonData = await response.json();
    const response2 = await fetch('personalization.json');
    const jsonData2 = await response2.json();
    const transformedData = algorithm(jsonData, jsonData2).join(', ');
    const contentElement = document.getElementById('content');
    const formattedJson = JSON.stringify(transformedData, null, 2);
    contentElement.textContent = formattedJson;
  });
});