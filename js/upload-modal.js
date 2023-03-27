import { isEscapeKey } from './util.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const photoInput = uploadForm.querySelector('.img-upload__input');
const hashtagField = uploadForm.querySelector('.text__hashtags');
const closeButton = document.querySelector('#upload-cancel');
const body = document.querySelector('body');

const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;


//Валидация формы загрузки
const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error'
});

// Закрывает модальное окно
function hideUploadModal() {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  uploadForm.reset();
  pristine.reset();

  closeButton.removeEventListener('click', hideUploadModal);
  document.removeEventListener('keydown', onEscape);
}

function onEscape(evt) {
  const inputFocus = evt.target.matches('input:focus') ||
  evt.target.matches('textarea:focus');

  if (inputFocus) {
    return false;
  }

  if (isEscapeKey(evt)) {
    evt.preventDefault();

    hideUploadModal();
  }
}

const onCloseButtonClick = () => hideUploadModal();

const onFileInputChange = () => showUploadModal();

// Открывает модальное окно
function showUploadModal() {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  closeButton.addEventListener('click', hideUploadModal);
  document.addEventListener('keydown', onEscape);
}

//Проверяет хэштеги
const isValidTag = (tag) => VALID_SYMBOLS.test(tag);
const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateTags = (value) => {
  const tags = value
    .trim()
    .split('')
    .filter((tag) => tag.trim().length);
  return hasUniqueTags(tags) && tags.every(isValidTag);
};

pristine.addValidator(
  hashtagField,
  validateTags,
);

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

photoInput.addEventListener('change', onFileInputChange);
closeButton.addEventListener('click', onCloseButtonClick);
uploadForm.addEventListener('submit', onFormSubmit);

