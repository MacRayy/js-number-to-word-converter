'use strict'

import test from 'tape'
import NumberToStringConverter from './converter.js'

test('A passing test', (t) => {
	t.pass('This test will pass.')
	t.end()
})

test('Test for one digit number and decimals', (t) => {
	t.plan(6)
	t.equal(NumberToStringConverter.createWord(0), 'zero')
	t.equal(NumberToStringConverter.createWord(1), 'one'),

	t.equal(NumberToStringConverter.createWord(-5), 'minus five')

	t.equal(NumberToStringConverter.createWord(6.7), 'six point seven')
	t.equal(NumberToStringConverter.createWord(5.723), 'five point seven two three')

	t.equal(NumberToStringConverter.createWord(-2.3), 'minus two point three')
	t.end()
})

test('Test setSign function', (t) => {
	t.equal(NumberToStringConverter.setSign(-5), 'minus ')
	t.equal(NumberToStringConverter.setSign(5), '')
	t.end()
})

test('Test buildDecimal function', (t) => {
	t.equal(NumberToStringConverter.buildDecimal(9), '')
	t.equal(NumberToStringConverter.buildDecimal(9.123), ' point one two three')
	t.end()
})

test('Test for splitting the number into smaller arrays', (t) => {
	t.deepEqual(NumberToStringConverter.splitIntoThreeDigits(11), ['11']),
	t.deepEqual(NumberToStringConverter.splitIntoThreeDigits(111), ['1', '11']),
	t.deepEqual(NumberToStringConverter.splitIntoThreeDigits(1222), ['1', '222']),
	t.deepEqual(NumberToStringConverter.splitIntoThreeDigits(11222), ['11', '222']),
	t.deepEqual(NumberToStringConverter.splitIntoThreeDigits(111222), ['111', '222']),
	t.deepEqual(NumberToStringConverter.splitIntoThreeDigits(1222333), ['1', '222', '333']),
	t.end()
})

test('Test for creating numbers', (t) => {
	t.equal(NumberToStringConverter.createHundreds(100), 'one hundred')
	t.equal(NumberToStringConverter.createHundreds(111), 'one hundred and eleven')
	t.end()
})

test('Test for two digit number', (t) => {
	t.equal(NumberToStringConverter.createWord(21), 'twenty-one')
	t.equal(NumberToStringConverter.createWord(99), 'ninety-nine')
	t.equal(NumberToStringConverter.createWord(-55), 'minus fifty-five')
	t.end()
})

test('Test for three digit number', (t) => {
	t.equal(NumberToStringConverter.createWord(100), 'one hundred')
	t.equal(NumberToStringConverter.createWord(109), 'one hundred and nine')
	t.equal(NumberToStringConverter.createWord(111), 'one hundred and eleven')
	t.equal(NumberToStringConverter.createWord(222), 'two hundred and twenty-two')
	t.equal(NumberToStringConverter.createWord(200), 'two hundred')
	t.end()
})

test('Test for four digit number', (t) => {
	t.equal(NumberToStringConverter.createWord(2000), 'twenty hundred')
	t.equal(NumberToStringConverter.createWord(2001), 'twenty hundred and one')
	t.equal(NumberToStringConverter.createWord(2011), 'twenty hundred and eleven')
	t.equal(NumberToStringConverter.createWord(2055), 'twenty hundred and fifty-five')
	t.equal(NumberToStringConverter.createWord(2202), 'twenty-two hundred and two')
	t.equal(NumberToStringConverter.createWord(2211), 'twenty-two hundred and eleven')
	t.equal(NumberToStringConverter.createWord(2222), 'twenty-two hundred and twenty-two')
	t.end()
})

test('Test for big numbers', (t) => {
	t.equal(NumberToStringConverter.createWord(123456789), 'one hundred and twenty-three million four hundred and fifty-six thousand seven hundred and eighty-nine')
	t.equal(NumberToStringConverter.createWord(123456789.98), 'one hundred and twenty-three million four hundred and fifty-six thousand seven hundred and eighty-nine point nine eight')
	t.end()
})

