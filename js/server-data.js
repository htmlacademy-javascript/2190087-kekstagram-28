import { renderGallery } from './gallery.js';
import { getData, sendData } from './api.js';
import { showSuccessMessage, showErrorMessage, showAlert } from './message.js';
import { onFormSubmit, hideUploadModal } from './upload-modal.js';

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
  renderGallery(data);
} catch (err) {
  showAlert(err.message);
}
