const nicknameForm = document.querySelector('#nickname-form');
const personalizationForm = document.querySelector('#personalization-form');
const resultDiv = document.querySelector('#result');
const outputUl = document.querySelector('#output');
// const manageInterfaceForm = document.querySelector('#manageInterface');
const elInput = document.querySelector('input[name="element"]');
const addButton = document.querySelector('#add');
const removeButton = document.querySelector('#remove');

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

      console.log('Содержимое файла user.json:', resultData.user);
      console.log('Содержимое файла result.json:', resultData.result);
    } else {
      throw new Error('Ошибка при сохранении данных о персонализации');
    }
  } catch (error) {
    console.error('Ошибка при отправке данных:', error);
  }

  personalizationForm.classList.add('hidden');
  resultDiv.classList.remove('hidden');
});

addButton.addEventListener('click', (e) => {
  e.preventDefault();
  const { value } = elInput;
  const li = document.createElement('li');
  li.textContent = value;
  li.id = value;
  outputUl.append(li);
});

removeButton.addEventListener('click', (e) => {
  e.preventDefault();
  // const { value } = elInput;
  console.log(outputUl);
  console.log(outputUl.childNodes);
  console.log(outputUl.children);
});
