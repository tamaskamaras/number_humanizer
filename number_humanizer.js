const { PLACE_VALUES } = require('./constants/place_values');
const { STEPS } = require('./constants/steps');

const toTens = (number) => {
  switch (number.length) {
    case 1:
      return PLACE_VALUES.ones[number];
    case 2:
      let [firstDigit, secondDigit] = number.split('');
      let result = PLACE_VALUES.tens[firstDigit];

      if (firstDigit === '1') {
        return result[secondDigit];
      }
      if (secondDigit !== '0') {
        result += `-${PLACE_VALUES.ones[secondDigit]}`;
      }
      return result;
    default:
      console.error('length of argument must be between 1..2');
  }
};

exports.humanizedNumberFrom = (inputNumber) => {
  let baseNumber = inputNumber.toString();
  let result = toTens(baseNumber.slice(-2));
  baseNumber = baseNumber.slice(0, -2)

  for (const stepName of STEPS) {
    if (baseNumber.length) {
      current = `${toTens(baseNumber.slice(-2))} ${stepName}`
      result = result ? `${current} and ${result}` : current
      baseNumber = baseNumber.slice(0, -2)
    } else {
      break;
    }
  }

  return result;
}
