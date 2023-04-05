import { renderGallery } from './gallery.js';
import './photo-scale.js';
import './photo-effects.js';
import { getData, sendData } from './api.js';
import { showAlert } from './util.js';
import { onFormSubmit, hideUploadModal } from './upload-modal.js';

onFormSubmit (async (data) => {
  try {
    await sendData(data);
    hideUploadModal();
  } catch {
    showAlert();
  }
});

try {
  const data = await getData();
  renderGallery(data);
} catch (err) {
  showAlert();
}
