const { PLACE_VALUES } = require('./constants/place_values');
const { STEPS } = require('./constants/steps');

const tensFrom = (number) => {
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
        let currentNumber = PLACE_VALUES.ones[secondDigit];
        result = result ? `${result}-${currentNumber}` : currentNumber
      }
      return result || '';
    default:
      console.error('length of argument must be between 1..2');
  }
};

const hundredsFrom = () => {
  // TODO
};

exports.humanizedNumberFrom = (inputNumber) => {
  let baseNumber = inputNumber.toString();
  let result = tensFrom(baseNumber.slice(-2));
  baseNumber = baseNumber.slice(0, -2)

  const irregularHundredsNeeded = () => {
    let [firstDigit, secondDigit] = baseNumber.slice(-2).split('');
    return baseNumber.length === 2 && firstDigit === '1' && secondDigit !== '0';
  };

  const setHundred = () => {
    if (baseNumber) {
      let hundred = `${tensFrom(baseNumber.slice(-1))} hundred`;
      result = result ? `${hundred} and ${result}` : hundred
      baseNumber = baseNumber.slice(0, -1)
    }
  };

  if (irregularHundredsNeeded()) {
    let resultWithIrregular = `${tensFrom(baseNumber)} hundred`
    if (result) { resultWithIrregular += ` and ${result}` }
    return resultWithIrregular;
  }

  setHundred();

  for (const stepName of STEPS) {
    if (!baseNumber.length) { break; }
    currentNumber  = tensFrom(baseNumber.slice(-2))
    currentNumber += ` ${stepName}`

    result = result ? `${currentNumber} and ${result}` : currentNumber
    baseNumber = baseNumber.slice(0, -2)
  }

  return result;
}
