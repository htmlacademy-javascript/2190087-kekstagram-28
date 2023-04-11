export const photosContainer = document.querySelector('.pictures');
const similarThumbnailsTemplate = document.querySelector('#picture').content
  .querySelector('.picture');

const createThumbnail = ({url, likes, comments, id}) => {
  const thumbnailElement = similarThumbnailsTemplate.cloneNode(true);

  thumbnailElement.querySelector('.picture__img').src = url;
  thumbnailElement.querySelector('.picture__likes').textContent = likes;
  thumbnailElement.querySelector('.picture__comments').textContent = comments.length;
  thumbnailElement.dataset.thumbnailId = id;

  return thumbnailElement;
};

export const renderThumbnails = (photos, container) => {
  photosContainer.querySelectorAll('.picture').forEach((element) => element.remove());
  const thumbnailFragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    const thumbnail = createThumbnail(photo);
    thumbnailFragment.append(thumbnail);
  });
  container.append(thumbnailFragment);
};
