const photosContainer = document.querySelector('.pictures');
const similarThumbnailsTemplate = document.querySelector('#picture').content
  .querySelector('.picture');

export const createThumbnail = ({url, likes, comments}) => {
  const thumbnailElement = similarThumbnailsTemplate.cloneNode(true);

  thumbnailElement.querySelector('.picture__img').src = url;
  thumbnailElement.querySelector('.picture__likes').textContent = likes;
  thumbnailElement.querySelector('.picture__comments').textContent = comments.length;

  return thumbnailElement;
};

export const renderThumbnails = (photos) => {
  const thumbnailFragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    const thumbnail = createThumbnail(photo);
    thumbnailFragment.append(thumbnail);
  });
  photosContainer.append(thumbnailFragment);
};

