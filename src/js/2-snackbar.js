// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();
  const delay = form.elements.delay.value;
  const state = form.elements.state.value;
  const promis = createPromis(delay, state);

  function createPromis(delay, state) {
    const promis = new Promise((resolv, reject) => {
      setTimeout(() => {
        if (state.toUpperCase() === 'FULFILLED') {
          resolv(delay);
        } else {
          reject(delay);
        }
      }, delay);
    });
    return promis;
  }

  promis
    .then(result => {
      iziToast.success({
        position: 'topRight',
        message: `Fulfilled promise in ${result}ms`,
      });
    })
    .catch(result => {
      iziToast.error({
        position: 'topRight',
        message: `Rejected promise in ${result}ms`,
      });
    });
});