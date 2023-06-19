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

personalizationForm.addEventListener('submit', (e) => {
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
      daysNum: days,
      city,
    }),
  }).then((response) => {
    if (response.ok) {
      console.log('Данные успешно сохранены на сервере.');
    }
  }).catch((error) => {
    console.error('Ошибка при отправке запроса:', error);
  });
});
