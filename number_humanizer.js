const { PLACE_VALUES } = require('./constants/place_values');
const { STEPS } = require('./constants/steps');

const toTens = (number) => {
  switch (number.length) {
    case 1:
      return PLACE_VALUES.ones[number];
    case 2:
      return PLACE_VALUES.tens[number];
  }
};

exports.humanizedNumberFrom = (inputNumber) => {
  return toTens(inputNumber.toString().slice(-2));
}
