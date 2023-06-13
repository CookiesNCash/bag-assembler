document.getElementById('registrationForm').addEventListener('submit', (event) => {
  event.preventDefault(); // Отменить отправку формы по умолчанию

  const name = document.getElementById('name').value;
  const sex = document.querySelector('input[name="sex"]:checked').value;
  const age = document.getElementById('age').value;
  const placeLive = document.getElementById('placeLive').value;

  // Отправка данных на сервер
  fetch('/save-username', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      sex,
      age,
      placeLive,
    }),
  })
    .then((response) => {
      if (response.ok) {
        console.log('Данные успешно сохранены на сервере.');
        // Перенаправление на другую страницу
        window.location.href = 'personalizationPage.html';
      } else {
        console.error('Ошибка при сохранении данных на сервере.');
      }
    })
    .catch((error) => {
      console.error('Ошибка при отправке запроса:', error);
    });
});
