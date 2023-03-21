import {isEscapeKey} from './util.js';

const COMMENTS_TO_SHOW = 5;
let commentsShown = 0;

const body = document.querySelector('body');
const fullscreenPhoto = document.querySelector('.big-picture');
const commentsLoader = document.querySelector('.comments-loader');
const commentCount = document.querySelector('.social__comment-count');
const closeButton = document.querySelector('.big-picture__cancel');
const commentsList = document.querySelector('.social__comments');

//Отрисовывет комментарии
const createComment = ({ avatar, name, message }) => {
  const comment = document.createElement('li');
  comment.innerHTML = '<img class="social__picture" src="" alt="" width="35" height="35">';
  comment.classList.add('social__comment');

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;
};

const renderComments = (comments) => {
  commentsShown += COMMENTS_TO_SHOW;

  if (commentsShown >= comments.length) {
    commentsLoader.classList.add('hidden');
    commentsShown = comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++) {
    const commentElement = createComment(comments[i]);
    fragment.append(commentElement);
  }
  commentsList.innerHTML = '';
  commentsList.append(fragment);
  commentCount.innerHTML = `${commentsShown.length} из <span class="commnts-count">${comments.length}</span>комментариев`;
};

const onCommentsLoaderClick = () => renderComments();

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
  commentsShown = 0;
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
  renderComments(data);
  commentsLoader.addEventListener('click', onCommentsLoaderClick);
};

