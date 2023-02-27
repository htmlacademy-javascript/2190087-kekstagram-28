//Функция для проверки длины строки
const validateLength = (string, number) => string.length <= number;
validateLength();

//Функция для проверки, является ли строка палиндромом
const isPalindrome = (string) => {
  string = string.toLowerCase().replace(/ /g,'');
  let stringReverse = '';
  for (let i = string.length - 1; i >= 0; i--) {
    stringReverse += string[i];
  }
  return string === stringReverse;
};

isPalindrome();

//Функция, которая принимает строку, извлекает цифры от 0 до 9 и возвращает их в виде целого положительного числа

const extractNumber = (string) => {
  if (typeof string === 'number') {
    return string;
  }
  let resultNumber = '';
  for (let i = 0; i <= string.length; i++) {
    if (!Number.isNaN(parseInt(string.at(i), 10))) {
      resultNumber += string.at(i);
    }
  }
  return parseInt(resultNumber, 10);
};

extractNumber();

//Функция принимает три параметра: исходную строку, минимальную длину и строку с добавочными символами
//возвращает исходную строку, дополненную указанными символами до заданной длины.
//Символы добавляются в начало строки.
//Если исходная строка превышает заданную длину, она не должна обрезаться.
//Если «добивка» слишком длинная, она обрезается с конца.
const newPadStart = (string, targetLength, pad) => {
  const actualPad = targetLength - string.length;
  if (actualPad <= 0) {
    return string;
  }
  return pad.slice(0, actualPad % pad.length) + pad.repeat(actualPad / pad.length) + string;
};
newPadStart();
