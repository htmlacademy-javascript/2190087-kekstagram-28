const NUMBER_OF_RANDOM_PHOTOS = 10;
const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const filterContainer = document.querySelector('.img-filters');
let currentFilter = Filter.DEFAULT;
let photos = [];

const filterRandomly = () => Math.random() - 0.5;

const filterByComments = (photoA, photoB) =>
  photoB.comments.length - photoA.comments.length;

export const getFilteredPhotos = () => {
  switch(currentFilter) {
    case Filter.DEFAULT:
      return [...photos].sort(filterRandomly).slice(0, NUMBER_OF_RANDOM_PHOTOS);
    case Filter.DISCUSSED:
      return [...photos].sort(filterByComments);
    default:
      return [...photos];
  }
};

const setFiterClick = (cb) => {
  filterContainer.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }
    const clickedButton = evt.target;
    if (clickedButton.id === currentFilter) {
      return;
    }
    filterContainer.querySelector('.img-filters__button--active')
      .classList.remove('.img-filters__button--active');

    clickedButton.classList.add('.img-filters__button--active');
    currentFilter = clickedButton.id;
    cb(getFilteredPhotos());
  });
};

export const activateFilters = (loadedPhotos, cb) => {
  filterContainer.classList.remove('img-filters--inactive');
  photos = [...loadedPhotos];
  setFiterClick(cb);
};


