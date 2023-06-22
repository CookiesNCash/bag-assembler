const nicknameForm = document.querySelector('#nickname-form');
const userNameInput = document.querySelector('#username');

const personalizationForm = document.querySelector('#personalization-form');
const daysInput = document.querySelector('#days');

const resultDiv = document.querySelector('#result');
const outputUl = document.querySelector('#output');
const interfaceForm = document.querySelector('#manageInterface');
const elInput = document.querySelector('input[name="element"]');
const addButton = document.querySelector('#add');
const removeButton = document.querySelector('#remove');

userNameInput.focus();

const state = {
  userName: null,
  bag: [],
};

const renderBag = (bag, ul) => {
  ul.innerHTML = ''; //eslint-disable-line
  bag.forEach((el) => {
    const li = document.createElement('li');
    li.textContent = el;
    li.id = el;
    ul.append(li);
  });
};

nicknameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const nickname = formData.get('nickname');
  state.userName = nickname;
  nicknameForm.classList.add('hidden');
  personalizationForm.classList.remove('hidden');
  nicknameForm.reset();
  daysInput.focus();
});

personalizationForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const days = formData.get('days');
  const city = formData.get('city');

  await fetch('/save-personalization', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      days,
      city,
    }),
  }).then(async (response) => {
    if (response.ok) {
      const resultResponse = await fetch('/get-result');
      const resultData = await resultResponse.json();

      const { result } = resultData;

      state.bag = [...result];
      renderBag(state.bag, outputUl);
    } else {
      throw new Error('Ошибка при сохранении данных о персонализации');
    }
  }).catch((error) => {
    console.error('Ошибка при отправке данных:', error);
  });

  personalizationForm.classList.add('hidden');
  resultDiv.classList.remove('hidden');

  personalizationForm.reset();
  elInput.focus();
});

addButton.addEventListener('click', (e) => {
  e.preventDefault();
  const { value } = elInput;
  const newBag = [...state.bag, value];
  state.bag = newBag;
  renderBag(state.bag, outputUl);
  interfaceForm.reset();
  elInput.focus();
});

removeButton.addEventListener('click', (e) => {
  e.preventDefault();
  const { value } = elInput;
  state.bag = state.bag.filter((el) => el !== value);
  renderBag(state.bag, outputUl);
  interfaceForm.reset();
  elInput.focus();
});
