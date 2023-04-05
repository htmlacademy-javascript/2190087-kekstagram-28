import {isEscapeKey} from './util.js';

const COMMENTS_TO_SHOW = 5;
let currentComments = [];

const body = document.querySelector('body');
const fullscreenPhoto = document.querySelector('.big-picture');
const commentsLoader = document.querySelector('.comments-loader');
const commentCount = document.querySelector('.social__comment-count');
const closeButton = document.querySelector('.big-picture__cancel');
const commentsList = document.querySelector('.social__comments');
const commentItem = document.querySelector('.social__comment');


//Отрисовывет комментарии
const createComments = (commentsData) => {
  const commentFragment = document.createDocumentFragment();

  commentsData.forEach(({ avatar, name, message }) => {
    const comment = commentItem.cloneNode(true);

    comment.querySelector('.social__picture').src = avatar;
    comment.querySelector('.social__picture').alt = name;
    comment.querySelector('.social__text').textContent = message;

    commentFragment.append(comment);
  });
  return commentFragment;
};

function showComments(comments) {
  const displayedComments = comments.slice(0, COMMENTS_TO_SHOW);
  const renderFirstComments = createComments(displayedComments);

  commentCount.innerHTML = `${displayedComments.length} из <span class="commnts-count">${comments.length}</span> комментариев`;
  commentsList.appendChild(renderFirstComments);

  if (displayedComments.length === comments.length) {
    commentsLoader.classList.add('hidden');
  }
}

function renderNewComments() {
  const additionalComments = currentComments.slice(
    commentsList.children.length,
    commentsList.children.length + COMMENTS_TO_SHOW,
  );
  const renderMoreComments = createComments(additionalComments);

  commentsList.appendChild(renderMoreComments);

  if (currentComments.length === commentsList.children.length) {
    commentsLoader.classList.add('hidden');
  }

  commentCount.firstChild.textContent = `${commentsList.children.length } из  `;
}

const onCommentsLoaderClick = () => renderNewComments();

//Отрисовывет фото
export const renderFullscreenPhoto = ({url, description, likes}) => {
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
  closeButton.addEventListener('click', hideFullscreenPhoto);
  document.addEventListener('keydown', onEscape);

  renderFullscreenPhoto(data);

  commentsList.innerHTML = '';
  currentComments = data.comments;
  showComments(data.comments);
  commentsLoader.addEventListener('click', onCommentsLoaderClick);
};

