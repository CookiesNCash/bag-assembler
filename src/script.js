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
  bag.forEach(([el, quantity, isChecked]) => {
    const li = document.createElement('li');
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = isChecked;
    const span = document.createElement('span');
    span.textContent = el;
    li.append(input);
    li.append(span);
    li.append(` - ${quantity}`);
    const minusButton = document.createElement('button');
    minusButton.textContent = '-';
    const plusButton = document.createElement('button');
    plusButton.textContent = '+';
    li.append(' ');
    li.append(minusButton);
    li.append(plusButton);
    li.id = el;
    ul.append(li);

    minusButton.addEventListener('click', (e) => {
      const { id } = e.target.parentNode;
      state.bag.forEach((bagEl) => {
        const [, num] = bagEl;
        if (bagEl[0] === id) bagEl[1] = num - 1; //eslint-disable-line
      });
      renderBag(state.bag, outputUl);
    });

    plusButton.addEventListener('click', (e) => {
      const { id } = e.target.parentNode;
      state.bag.forEach((bagEl) => {
        const [, num] = bagEl;
        if (bagEl[0] === id) bagEl[1] = num + 1; //eslint-disable-line
      });
      renderBag(state.bag, outputUl);
    });

    input.addEventListener('change', (e) => {
      const checkedBool = e.target.checked;
      const { id } = e.target.parentNode;
      state.bag.forEach((bagEl) => {
        if (bagEl[0] === id) bagEl[2] = checkedBool; //eslint-disable-line
      });
    });
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
  const cityFrom = formData.get('city-from');
  const cityTo = formData.get('city-to');
  const bagSize = formData.get('bag-size');
  const tripPurpose = formData.get('trip-purpose');

  await fetch('/save-personalization', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      days,
      cityFrom,
      cityTo,
      bagSize,
      tripPurpose,
    }),
  }).then(async (response) => {
    if (response.ok) {
      const resultResponse = await fetch('/get-result');
      const resultData = await resultResponse.json();

      const { result } = resultData;

      state.bag = result.map(([el, quantity]) => [el, quantity, false]);
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
  if (value === '') {
    elInput.focus();
    return;
  }
  const newBag = [...state.bag, [value, 1, false]];
  state.bag = newBag;
  renderBag(state.bag, outputUl);
  interfaceForm.reset();
  elInput.focus();
});

removeButton.addEventListener('click', (e) => {
  e.preventDefault();
  const { value } = elInput;
  state.bag = state.bag.filter(([el]) => el !== value);
  renderBag(state.bag, outputUl);
  interfaceForm.reset();
  elInput.focus();
});
