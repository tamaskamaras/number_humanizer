'use strict';

const { humanizedNumberFrom } = require('./number_humanizer');

describe('humanizedNumberFrom', () => {
  describe('when input is single digit long', () => {
    test('returns the input in human text format', () => {
      expect(humanizedNumberFrom(0)).toEqual('zero')
      expect(humanizedNumberFrom(1)).toEqual('one')
      expect(humanizedNumberFrom(7)).toEqual('seven')
    })
  })

  describe('when input is 2 digit long', () => {
    test('returns the input in human text format', () => {
      expect(humanizedNumberFrom(20)).toEqual('twenty')
      expect(humanizedNumberFrom(42)).toEqual('fourty-two')
      expect(humanizedNumberFrom(70)).toEqual('seventy')
    })
  })

  describe('when input is 3 digit long', () => {
    test('returns the input in human text format', () => {
      expect(humanizedNumberFrom(100)).toEqual('one hundred')
      expect(humanizedNumberFrom(110)).toEqual('one hundred and ten')
      expect(humanizedNumberFrom(351)).toEqual('three hundred and fifty-one')
    })
  })

  describe('when input is 4 digit long', () => {
    test('returns the input in human text format', () => {
      expect(humanizedNumberFrom(1999)).toEqual('nineteen hundred and ninety-nine')
      expect(humanizedNumberFrom(2001)).toEqual('two thousand and one')
      expect(humanizedNumberFrom(3000)).toEqual('three thousand')
    })
  })

  describe('when input is 5 digit long', () => {
    test('returns the input in human text format', () => {
      expect(humanizedNumberFrom(17999))
      .toEqual('seventeen thousand nine hundred and ninety-nine')
      expect(humanizedNumberFrom(40000)).toEqual('fourty thousand')
    })
  })

  describe('when input is 6 digit long', () => {
    test('returns the input in human text format', () => {
      expect(humanizedNumberFrom(600000)).toEqual('six houndred thousand')
      expect(humanizedNumberFrom(824890))
      .toEqual('eight hundred and twenty-four thousand eight hundred and eighty')
    })
  })
})

