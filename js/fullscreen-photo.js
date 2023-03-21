const body = document.querySelector('body');
const fullscreenPhoto = document.querySelector('.big-picture');
const commentsLoader = document.querySelector('.comments-loader');
const commentCount = document.querySelector('.social__comment-count');

export const renderFullPhoto = ({url, description, likes}) => {
  fullscreenPhoto.querySelector('.big-picture__img img').src = url;
  fullscreenPhoto.querySelector('.likes-count').textContent = likes;
  fullscreenPhoto.querySelector('.social__caption').textContent = description;
  fullscreenPhoto.querySelector('.big-picture__img img').alt = description;
};

export const showFullscreenPhoto = (data) => {
  fullscreenPhoto.classList.remove('hidden');
  body.classList.add('modal-open');
  commentsLoader.classList.add('hidden');
  commentCount.classList.add('hidden');

  renderFullPhoto(data);
};
