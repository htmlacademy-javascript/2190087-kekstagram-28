import { isEscapeKey } from './util.js';

const ALERT_SHOW_TIME = 5000;

const successContainerTemplate = document.querySelector('#success').content.querySelector('.success');
const successContainer = successContainerTemplate.cloneNode(true);
const successButton = successContainer.querySelector('.success__button');
const errorContainerTemplate = document.querySelector('#error').content.querySelector('.error');
const errorContainer = errorContainerTemplate.cloneNode(true);
const errorButton = errorContainer.querySelector('.error__button');

//Ошибка запроса при загрузке данных с сервера
export const showAlert = (message) => {
  const alert = document.createElement('div');
  alert.style.zIndex = '100';
  alert.style.position = 'absolute';
  alert.style.left = '0';
  alert.style.top = '0';
  alert.style.right = '0';
  alert.style.padding = '10px 3px';
  alert.style.fontSize = '30px';
  alert.style.textAlign = 'center';
  alert.style.backgroundColor = 'red';
  alert.textContent = message;

  document.body.append(alert);

  setTimeout(() => {
    alert.remove();
  }, ALERT_SHOW_TIME);
};

//Ошибка загрузки на сервер
const onErrorModalKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeErrorModal();
  }
};

const onErrorWindowClick = (evt) => {
  if (!errorContainer.querySelector('.error__inner').contains(evt.target)) {
    evt.preventDefault();
    closeErrorModal();
  }
};

const onErrorCloseButtonClick = () => {
  closeErrorModal();
};

function closeErrorModal() {
  errorContainer.remove();
  errorButton.removeEventListener('click', onErrorCloseButtonClick);
  document.removeEventListener('keydown', onErrorModalKeydown);
  document.removeEventListener('click', onErrorWindowClick);
}

const showErrorMessage = () => {
  errorContainer.style.zIndex = 100;
  document.body.append(errorContainer);

  errorButton.addEventListener('click', onErrorCloseButtonClick);
  document.addEventListener('keydown', onErrorModalKeydown);
  document.addEventListener('click', onErrorWindowClick);
};

//Успех загрузки на сервер
const onSuccessModalKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccessModal();
  }
};

const onSuccessModalWindowClick = (evt) => {
  if (!successContainer.querySelector('.success__inner').contains(evt.target)) {
    evt.preventDefault();
    closeSuccessModal();
  }
};

const onSuccessCloseButtonClick = () => {
  closeSuccessModal();
};

function closeSuccessModal () {
  successContainer.remove();
  successButton.removeEventListener('click', onSuccessCloseButtonClick);
  document.removeEventListener('keydown', onSuccessModalKeydown);
  document.removeEventListener('click', onSuccessModalWindowClick);
}

const showSuccessMessage = () => {
  successContainer.style.zIndex = 100;
  document.body.append(successContainer);

  successButton.addEventListener('click', onSuccessCloseButtonClick);
  document.addEventListener('keydown', onSuccessModalKeydown);
  document.addEventListener('click', onSuccessModalWindowClick);
};


export {showErrorMessage, showSuccessMessage};
