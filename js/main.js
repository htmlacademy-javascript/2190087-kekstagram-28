import { getPhotos } from './data.js';
import { renderFullscreenPhoto } from './gallery.js';
import './upload-modal.js';


renderFullscreenPhoto(getPhotos());
