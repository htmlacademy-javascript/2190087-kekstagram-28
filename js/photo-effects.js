const EFFECT_CHROME = 'effects__preview--chrome';
const EFFECT_SEPIA = 'effects__preview--sepia';
const EFFECT_MARVIN = 'effects__preview--marvin';
const EFFECT_PHOBOS = 'effects__preview--phobos';
const EFFECT_HEAT = 'effects__preview--heat';

const uploadForm = document.getElementById('upload-select-image');
const slider = document.querySelector('.effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const photoPreview = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelector('.effects__list');
const effectLevelValue = document.querySelector('.effect-level__value');
const noEffect = document.getElementById('effect-none');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

sliderElement.noUiSlider.on('update', () => {
  effectLevelValue.value = sliderElement.noUiSlider.get();
});

const getChromeEffect = () => {
  slider.classList.remove('hidden');
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  });

  sliderElement.noUiSlider.on('update', () => {
    photoPreview.style.filter = `grayscale(${sliderElement.noUiSlider.get()})`;
  });
  photoPreview.removeAttribute('class');
  photoPreview.classList.add('effects__preview--chrome');
};

const getSepiaEffect = () => {
  slider.classList.remove('hidden');
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  });

  sliderElement.noUiSlider.on('update', () => {
    photoPreview.style.filter = `sepia(${sliderElement.noUiSlider.get()})`;
  });
  photoPreview.removeAttribute('class');
  photoPreview.classList.add('effects__preview--sepia');
};

const getMarvinEffect = () => {
  slider.classList.remove('hidden');
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
  });

  sliderElement.noUiSlider.on('update', () => {
    photoPreview.style.filter = `invert(${sliderElement.noUiSlider.get()}%)`;
  });
  photoPreview.removeAttribute('class');
  photoPreview.classList.add('effects__preview--marvin');
};

const getPhobosEffect = () => {
  slider.classList.remove('hidden');
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
  });

  sliderElement.noUiSlider.on('update', () => {
    photoPreview.style.filter = `blur(${sliderElement.noUiSlider.get()}px)`;
  });
  photoPreview.removeAttribute('class');
  photoPreview.classList.add('effects__preview--phobos');
};

const getHeatEffect = () => {
  slider.classList.remove('hidden');
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
  });

  sliderElement.noUiSlider.on('update', () => {
    photoPreview.style.filter = `brightness(${sliderElement.noUiSlider.get()})`;
  });
  photoPreview.removeAttribute('class');
  photoPreview.classList.add('effects__preview--heat');
};


uploadForm.addEventListener('change', () => {
  if (noEffect.checked) {
    slider.classList.add('hidden');
  }
});

effectsList.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('effects__preview')) {
    const filter = evt.target.classList[1];
    photoPreview.classList.add(filter);

    switch (filter) {
      case EFFECT_CHROME:
        getChromeEffect();
        break;
      case EFFECT_SEPIA:
        getSepiaEffect();
        break;

      case EFFECT_MARVIN:
        getMarvinEffect();
        break;

      case EFFECT_PHOBOS:
        getPhobosEffect();
        break;

      case EFFECT_HEAT:
        getHeatEffect();
        break;

      default:
        effectLevelValue.value = 0;
        photoPreview.removeAttribute('class');
        photoPreview.style.filter = 'none';
        slider.classList.add('hidden');
        break;
    }
  }
});

export const resetEffectSettings = () => {
  photoPreview.classList = '';
  photoPreview.style.filter = '';
};
