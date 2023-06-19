const nicknameForm = document.querySelector('#nickname-form');
const personalizationForm = document.querySelector('#personalization-form');

nicknameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const nickname = formData.get('nickname');
  console.log(nickname);
  nicknameForm.classList.add('hidden');
  personalizationForm.classList.remove('hidden');
});

personalizationForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const days = formData.get('days');
  const city = formData.get('city');
  console.log(days, city);

  fetch('/save-username', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      days,
      city,
    }),
  }).then((response) => {
    if (response.ok) {
      console.log('Данные успешно сохранены на сервере.');
    }
  }).catch((error) => {
    console.error('Ошибка при отправке запроса:', error);
  });

  const result = await fetch('/get-data');
  try {
    const data = await result.json();
    console.log(data);
    const outputElement = document.querySelector('#output');
    outputElement.textContent = data;
    outputElement.classList.remove('hidden');
  } catch (error) {
    console.error('Ошибка при получении ответа:', result.status);
  }
});
