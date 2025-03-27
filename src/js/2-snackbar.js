import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();
  
  const delay = Number(form.elements.delay.value); // Перетворення рядка у число
  const state = form.elements.state.value;
  const promise = createPromise(delay, state);

  function createPromise(delay, state) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (state === 'fulfilled') {
          resolve(delay);
        } else if (state === 'rejected') {
          reject(delay);
        }
      }, delay);
    });
  }

  promise
    .then(result => {
      iziToast.success({
        message: `Fulfilled promise in ${result}ms`,
      });
    })
    .catch(result => {
      iziToast.error({
        message: `Rejected promise in ${result}ms`,
      });
    });
});
