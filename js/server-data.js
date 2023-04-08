import { renderGallery } from './gallery.js';
import { getData, sendData } from './api.js';
import { showSuccessMessage, showErrorMessage, showAlert } from './message.js';
import { onFormSubmit, hideUploadModal } from './upload-modal.js';
import { activateFilters, getFilteredPhotos } from './filter.js';
import {debounce} from './debounce.js';


onFormSubmit(async (data) => {
  try {
    await sendData(data);
    hideUploadModal();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});

try {
  const data = await getData();
  const debouncedRenderGallery = debounce(renderGallery);
  activateFilters(data, debouncedRenderGallery);
  renderGallery(getFilteredPhotos());
} catch (err) {
  showAlert(err.message);
}
