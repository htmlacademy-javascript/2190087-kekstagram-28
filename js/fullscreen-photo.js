import {isEscapeKey} from './util.js';

const body = document.querySelector('body');
const fullscreenPhoto = document.querySelector('.big-picture');
const commentsLoader = document.querySelector('.comments-loader');
const commentCount = document.querySelector('.social__comment-count');
const closeButton = document.querySelector('.big-picture__cancel');

//Отрисовывет фото
export const renderFullPhoto = ({url, description, likes}) => {
  fullscreenPhoto.querySelector('.big-picture__img img').src = url;
  fullscreenPhoto.querySelector('.likes-count').textContent = likes;
  fullscreenPhoto.querySelector('.social__caption').textContent = description;
  fullscreenPhoto.querySelector('.big-picture__img img').alt = description;
};

//Закрывает фото
const onEscape = (evt) => {
  if (isEscapeKey (evt)) {
    evt.preventDefault();
    fullscreenPhoto.classList.add('hidden');
    body.classList.remove('modal-open');
  }
};

const hideFullscreenPhoto = () => {
  fullscreenPhoto.classList.add('hidden');
  body.classList.remove('modal-open');
  closeButton.removeEventListener('click', hideFullscreenPhoto);
  document.removeEventListener('keydown', onEscape);
};

//Открывет фото
export const showFullscreenPhoto = (data) => {
  fullscreenPhoto.classList.remove('hidden');
  body.classList.add('modal-open');
  commentsLoader.classList.add('hidden');
  commentCount.classList.add('hidden');
  closeButton.addEventListener('click', hideFullscreenPhoto);
  document.addEventListener('keydown', onEscape);

  renderFullPhoto(data);
};
