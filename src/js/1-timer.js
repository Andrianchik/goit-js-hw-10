import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputTimer = document.querySelector('#datetime-picker');
const buttonTimer = document.querySelector('button[data-start]');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');

let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate < Date.now()) {
      buttonTimer.setAttribute('disabled', '');
      buttonTimer.style.backgroundColor = '#CFCFCF';
      buttonTimer.style.color = '#989898';

      iziToast.error({
        message: 'Please choose a date in the future',
      });
    } else {
      buttonTimer.removeAttribute('disabled');
      buttonTimer.style.backgroundColor = '';
      buttonTimer.style.color = '';
    }
  },
};

flatpickr('#datetime-picker', options);

buttonTimer.addEventListener('click', activeTimer);

function activeTimer() {
  inputTimer.setAttribute('disabled', '');
  buttonTimer.setAttribute('disabled', '');
  buttonTimer.style.backgroundColor = '#CFCFCF';
  buttonTimer.style.color = '#989898';

  let diffTime = userSelectedDate - Date.now(); // Використовуємо поточний час
  const secondInterval = setInterval(() => {
    if (diffTime > 0) {
      const newTimer = convertMs(diffTime);

      days.textContent = addZero(newTimer.days);
      hours.textContent = addZero(newTimer.hours);
      minutes.textContent = addZero(newTimer.minutes);
      seconds.textContent = addZero(newTimer.seconds);

      diffTime -= 1000;
    } else {
      clearInterval(secondInterval);
    }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addZero(num) {
  return num.toString().padStart(2, '0');
}
