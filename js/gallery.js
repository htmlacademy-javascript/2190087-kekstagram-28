import {showFullscreenPhoto} from './fullscreen-photo.js';
import {renderThumbnails, photosContainer} from './thumbnail.js';

export const renderGallery = (pictures) => {
  renderThumbnails(pictures);

  photosContainer.addEventListener('click', (evt) => {
    const thumbnailPicture = evt.target.closest('[data-thumbnail-id]');
    if (!thumbnailPicture) {
      return;
    }
    const picture = pictures.find (
      (item) => item.id === +thumbnailPicture.dataset.thumbnailId
    );
    showFullscreenPhoto(picture);
  });
};
