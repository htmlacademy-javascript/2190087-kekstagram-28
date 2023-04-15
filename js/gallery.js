import {showFullscreenPhoto} from './fullscreen-photo.js';
import {renderThumbnails, photosContainer} from './thumbnail.js';

let photos = [];

const onPhotoClick = (evt) => {
  const thumbnailPhoto = evt.target.closest('[data-thumbnail-id]');
  if (!thumbnailPhoto) {
    return;
  }

  evt.preventDefault();
  const photo = photos.find (
    (item) => item.id === +thumbnailPhoto.dataset.thumbnailId
  );
  showFullscreenPhoto(photo);
};

export const renderGallery = (currentPhotos) => {
  photos = currentPhotos;
  renderThumbnails(photos);
  photosContainer.addEventListener('click', onPhotoClick);
};
