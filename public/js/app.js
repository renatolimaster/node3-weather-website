const log = console.log;
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', e => {
  // prevent that browser refresh
  e.preventDefault();
  const location = search.value;

  const urlGeocode = 'http://localhost:3000/weather?address=' + location;

  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';

  fetch(urlGeocode).then(response => {
    response.json().then(data => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    });
  });
});
