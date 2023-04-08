import {showFullscreenPhoto} from './fullscreen-photo.js';
import {renderThumbnails, photosContainer} from './thumbnail.js';

export const renderGallery = (photos) => {
  renderThumbnails(photos, photosContainer);

  photosContainer.addEventListener('click', (evt) => {
    const thumbnailPhoto = evt.target.closest('[data-thumbnail-id]');
    if (!thumbnailPhoto) {
      return;
    }

    evt.preventDefault();
    const photo = photos.find (
      (item) => item.id === +thumbnailPhoto.dataset.thumbnailId
    );
    showFullscreenPhoto(photo);
  });
};
