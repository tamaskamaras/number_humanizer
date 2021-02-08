'use strict';

const { humanizedNumberFrom } = require('./app');

describe('humanizedNumberFrom', () => {
  describe('when input is single digit long', () => {
    test('returns the input in human text format', () => {
      expect(humanizedNumberFrom(1)).toEqual('one')
      expect(humanizedNumberFrom(7)).toEqual('seven')
    })
  })

  describe('when input is 2 digit long', () => {
    test('returns the input in human text format', () => {
      expect(humanizedNumberFrom(42)).toEqual('forty-two')
    })
  })

  describe('when input is 3 digit long', () => {
    test('returns the input in human text format', () => {
      expect(humanizedNumberFrom(351)).toEqual('three hundred and fifty-one')
    })
  })

  describe('when input is 4 digit long', () => {
    test('returns the input in human text format', () => {
      expect(humanizedNumberFrom(1999)).toEqual('nineteen hundred and ninety-nine')
      expect(humanizedNumberFrom(2001)).toEqual('two thousand and one')
    })
  })

  describe('when input is 5 digit long', () => {
    test('returns the input in human text format', () => {
      expect(humanizedNumberFrom(17999))
      .toEqual('seventeen thousand nine hundred and ninety-nine')
    })
  })

  describe('when input is 6 digit long', () => {
    test('returns the input in human text format', () => {
      expect(humanizedNumberFrom(824890))
      .toEqual('eight hundred and twenty-four thousand eight hundred and eighty')
    })
  })
})

