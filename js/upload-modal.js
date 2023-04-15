import { isEscapeKey } from './util.js';
import { resetScaleModifier } from './photo-scale.js';
import { resetEffectSettings } from './photo-effects.js';
import { uploadPhoto } from './photo-upload.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const photoInput = uploadForm.querySelector('.img-upload__input');
const hashtagField = uploadForm.querySelector('.text__hashtags');
const closeButton = document.querySelector('#upload-cancel');
const body = document.querySelector('body');
const submitButton = uploadForm.querySelector('.img-upload__submit');

const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG_COUNT = 5;
const ERROR_TAG = 'Неправильно заполнен хэштег';

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

//Валидация формы загрузки
const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error'
});

// Закрывает модальное окно
export function onUploadModalHide() {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  uploadForm.reset();
  pristine.reset();
  resetScaleModifier();
  resetEffectSettings ();

  closeButton.removeEventListener('click', onUploadModalHide);
  document.removeEventListener('keydown', onModalEscape);
}

export function onModalEscape(evt) {
  const inputFocus = evt.target.matches('input:focus') ||
  evt.target.matches('textarea:focus');

  if (inputFocus) {
    return false;
  }

  if (isEscapeKey(evt)) {
    evt.preventDefault();

    onUploadModalHide();
  }
}

// Открывает модальное окно
const showUploadModal = () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  uploadPhoto();

  closeButton.addEventListener('click', onUploadModalHide);
  document.addEventListener('keydown', onModalEscape);
};

const onFileInputChange = () => showUploadModal();

//Проверяет хэштеги
const isValidTag = (tag) => VALID_SYMBOLS.test(tag);

const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};
const isValidTagCount = (tags) => (tags.length <= MAX_HASHTAG_COUNT);


const validateTags = (value) => {
  const tags = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);
  return tags.every(isValidTag) && isValidTagCount(tags) && hasUniqueTags(tags);
};

pristine.addValidator(
  hashtagField,
  validateTags,
  ERROR_TAG
);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

//Отправляет форму
export const onFormSubmit = (cb) => {
  uploadForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      await cb(new FormData(uploadForm));
      unblockSubmitButton();
    }
  });
};

photoInput.addEventListener('change', onFileInputChange);
closeButton.addEventListener('click', onUploadModalHide);
