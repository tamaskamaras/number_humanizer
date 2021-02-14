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
      return result;
    default:
      console.error('length of argument must be between 1..2');
  }
};

exports.humanizedNumberFrom = (inputNumber) => {
  let baseNumber = inputNumber.toString();
  let result = tensFrom(baseNumber.slice(-2));
  baseNumber = baseNumber.slice(0, -2)

  const irregularHundredsNeeded = () => {
    let [firstDigit, secondDigit] = baseNumber.slice(-2).split('');
    return baseNumber.length === 2 && firstDigit === '1' && secondDigit !== '0';
  };

  const prependSingleHundredIfNeeded = (number, text) => {
    if (number.slice(-1).match(/[1-9]/)) {
      let hundred = `${tensFrom(number.slice(-1))} hundred`;
      text = text ? `${hundred} and ${text}` : hundred
    }
    return text;
  };

  const setSingleHundred = () => {
    if (baseNumber.slice(-1).match(/[1-9]/)) {
      let hundred = `${tensFrom(baseNumber.slice(-1))} hundred`;
      result = result ? `${hundred} and ${result}` : hundred
    }
    baseNumber = baseNumber.slice(0, -1)
  };

  const hundredsFrom = (number) => {
    return prependSingleHundredIfNeeded(
      number.slice(-3, -2),
      tensFrom(number.slice(-2))
    );
  };

  if (irregularHundredsNeeded()) {
    let resultWithIrregular = `${tensFrom(baseNumber)} hundred`
    if (result) { resultWithIrregular += ` and ${result}` }
    return resultWithIrregular;
  }

  setSingleHundred()

  for (const stepName of STEPS) {
    if (!baseNumber.length) { break; }
    let currentNumber = hundredsFrom(baseNumber.slice(-3))
    currentNumber += ` ${stepName}`

    result = result ? `${currentNumber} ${result}` : currentNumber
    baseNumber = baseNumber.slice(0, -3)
  }

  return result;
}
