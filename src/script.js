document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registrationForm');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const userData = {
      name: form.name.value,
      sex: form.sex.value,
      age: form.age.value,
      placeLive: form.placeLive.value,
    };

    console.log(userData);
  });
});
