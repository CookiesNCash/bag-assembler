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

  try {
    const response = await fetch('/save-personalization', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        days,
        city,
      }),
    });

    if (response.ok) {
      console.log('Данные о персонализации успешно сохранены.');

      const resultResponse = await fetch('/get-result');
      const resultData = await resultResponse.json();
      const result = resultData;
      console.log(result);

      const consoleOutput = result.join(', ');
      console.log(consoleOutput);
    } else {
      throw new Error('Ошибка при сохранении данных о персонализации');
    }
  } catch (error) {
    console.error('Ошибка при отправке данных:', error);
  }
});
