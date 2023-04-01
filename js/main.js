import { getPhotos } from './data.js';
import { renderFullscreenPhoto } from './gallery.js';
import './upload-modal.js';
import './photo-scale.js';
import './photo-effects.js';

renderFullscreenPhoto(getPhotos());
