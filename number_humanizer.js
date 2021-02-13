const { PLACE_VALUES } = require('./constants/place_values');
const { STEPS } = require('./constants/steps');

const toTens = (number) => {
  switch (number.length) {
    case 1:
      return PLACE_VALUES.ones[number];
    case 2:
      let first, second;
      [firstDigit, secondDigit] = number.split('');
      let result = PLACE_VALUES.tens[firstDigit];

      if (firstDigit === '1') {
        return result[secondDigit];
      }
      if (secondDigit !== '0') {
        result += `-${PLACE_VALUES.ones[secondDigit]}`;
      }
      return result;
    default:
      console.error('length of argument must be between 1..2')
  }
};

exports.humanizedNumberFrom = (inputNumber) => {
  return toTens(inputNumber.toString().slice(-2));
}
