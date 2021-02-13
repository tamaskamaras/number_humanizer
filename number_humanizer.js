const { PLACE_VALUES } = require('./constants/place_values');
const { STEPS } = require('./constants/steps');

const toTens = (number) => {
  switch (number.length) {
    case 1:
      return PLACE_VALUES.ones[number];
    case 2:
      let result = PLACE_VALUES.tens[number[0]];

      if (number[0] === '1') {
        return result[number[1]]
      }
      if (number[1] !== '0') {
        result += `-${PLACE_VALUES.ones[number[1]]}`
      }
      return result;
    default:
      console.error('length of argument must be between 1..2')
  }
};

exports.humanizedNumberFrom = (inputNumber) => {
  return toTens(inputNumber.toString().slice(-2));
}
