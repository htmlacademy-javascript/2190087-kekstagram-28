const scaleCounter = document.querySelector('.scale__control--value');
const scaleSmallerButton = document.querySelector('.scale__control--smaller');
const scaleBiggerButton = document.querySelector('.scale__control--bigger');
const photoPreview = document.querySelector('.img-upload__preview img');

const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const SCALE_STEP = 25;

const setScaleOnImg = () => {
  const currentValue = parseFloat(scaleCounter.value);
  photoPreview.style.transform = `scale(${currentValue / 100})`;
};

const prevScaleClickHandler = () => {
  const currentValue = parseFloat(scaleCounter.value);

  if (currentValue === MIN_SCALE_VALUE) {
    return false;
  }

  scaleCounter.value = `${currentValue - SCALE_STEP}%`;

  setScaleOnImg();
};

const nextScaleClickHandler = () => {
  const currentValue = parseFloat(scaleCounter.value);

  if (currentValue === MAX_SCALE_VALUE) {
    return false;
  }

  scaleCounter.value = `${currentValue + SCALE_STEP}%`;

  setScaleOnImg();
};

const resetScaleModifier = () => {
  photoPreview.style.transform = '';
};

scaleSmallerButton.addEventListener('click', prevScaleClickHandler);
scaleBiggerButton.addEventListener('click', nextScaleClickHandler);
