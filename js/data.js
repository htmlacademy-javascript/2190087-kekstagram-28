import {createIdGenerator} from './util.js';
import {getRandomArrayElement} from './util.js';
import {getRandomInteger} from './util.js';

const NAMES = [
  'Максим Щербаков',
  'Антуан Суханов',
  'Ефросиния Дроздова',
  'Людмила Беспалова',
  'Тарас Молчанов',
  'Маргарита Крюкова',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const PHOTO_DESCRIPTIONS = [
  'Я на море.',
  'Любуюсь закатом. Оцените и вы!',
  'Насмотрелся на соседей, выгуливающих с утра своих собак, и завел себе кота.',
  'Наслаждайтесь хотя бы одним закатом в день!',
  'Завтрак с друзьями',
  'Заказал пиццу, сижу жду…',
  'Кто-нибудь знает, как избавиться от кошачьих волос?',
];

const generateCommentId = createIdGenerator();
const generatePhotoId = createIdGenerator();
const generateUrlId = createIdGenerator();

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, NAMES.length - 1)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const createPhotoDescription = () => ({
  id: generatePhotoId(),
  url: `photos/${generateUrlId()}.jpg`,
  description: getRandomArrayElement(PHOTO_DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: createComment(),
});


function photos() {
  return Array.from({length: 25}, createPhotoDescription);
}

export {photos};
