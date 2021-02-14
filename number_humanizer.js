const { PLACE_VALUES } = require('./constants/place_values');
const { STEPS } = require('./constants/steps');

exports.humanizedNumberFrom = (inputNumber) => {
  const tensFrom = (number) => {
    switch (number.length) {
      case 1:
        return PLACE_VALUES.ones[number];
      case 2:
        let [firstDigit, secondDigit] = number.split('');
        let ret = PLACE_VALUES.tens[firstDigit];

        if (firstDigit === '1') {
          return ret[secondDigit];
        }
        if (secondDigit !== '0') {
          let currentNumber = PLACE_VALUES.ones[secondDigit];
          ret = ret ? `${ret}-${currentNumber}` : currentNumber
        }
        return ret;
      default:
        console.error('length of argument must be between 1..2');
    }
  };

  const irregularHundredsNeededFrom = (number) => {
    let [firstDigit, secondDigit] = number.slice(-2).split('');
    return number.length === 2 && firstDigit === '1' && secondDigit !== '0';
  };

  const prependSingleHundredIfNeeded = (number, text) => {
    if (number.slice(-1).match(/[1-9]/)) {
      let hundred = `${tensFrom(number.slice(-1))} hundred`;
      text = text ? `${hundred} and ${text}` : hundred
    }
    return text;
  };

  const hundredsFrom = (number) => {
    return prependSingleHundredIfNeeded(
      number.slice(-3, -2),
      tensFrom(number.slice(-2))
    );
  };

  let baseNumber = inputNumber.toString();
  let result = tensFrom(baseNumber.slice(-2));
  baseNumber = baseNumber.slice(0, -2)

  if (irregularHundredsNeededFrom(baseNumber)) {
    let resultWithIrregular = `${tensFrom(baseNumber)} hundred`
    if (result) { resultWithIrregular += ` and ${result}` }
    return resultWithIrregular;
  }

  result = prependSingleHundredIfNeeded(baseNumber, result)
  baseNumber = baseNumber.slice(0, -1)

  for (const stepName of STEPS) {
    if (!baseNumber.length) { break; }
    let currentNumber = hundredsFrom(baseNumber.slice(-3))
    currentNumber += ` ${stepName}`

    result = result ? `${currentNumber} ${result}` : currentNumber
    baseNumber = baseNumber.slice(0, -3)
  }

  return result;
}
