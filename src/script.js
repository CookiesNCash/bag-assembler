const nicknameForm = document.querySelector('#nickname-form');
nicknameForm.reset();
const personalizationForm = document.querySelector('#personalization-form');
personalizationForm.reset();

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
  const daysNum = formData.get('days');
  const city = formData.get('city');
  console.log(daysNum, city);
});
