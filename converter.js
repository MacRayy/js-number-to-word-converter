'use strict'

const NumberToStringConverter = (function () {
	const numbers = {
		0: 'zero',
		1: 'one',
		2: 'two',
		3: 'three',
		4: 'four',
		5: 'five',
		6: 'six',
		7: 'seven',
		8: 'eight',
		9: 'nine',
		10: 'ten',
		11: 'eleven',
		12: 'twelve',
		13: 'thirteen',
		14: 'fourteen',
		15: 'fifteen',
		16: 'sixteen',
		17: 'seventeen',
		18: 'eighteen',
		19: 'ninteen',
		20: 'twenty',
		30: 'thirty',
		40: 'fourty',
		50: 'fifty',
		60: 'sixty',
		70: 'seventy',
		80: 'eighty',
		90: 'ninety'
	}
	const scale = ['ten', 'hundred', 'thousand', 'million', 'billion']

	// CRETE WORD FROM NUMBER
	const createWord = (number) => {
		const num = Math.floor(Math.abs(number))
		const numString = num.toString()
		const sign = setSign(number)
		const fraction = buildDecimal(number)

		let phrase = ''
		let word = numbers[num]

		if (!numbers.hasOwnProperty(numString)) {
			const digitGroups = splitIntoThreeDigits(num)

			let wordArray = digitGroups.map(el => createHundreds(parseInt(el)))

			let wordArrayWithScale = wordArray.reverse().map((el, index) => {
				if (num >= 10000) {
					index++
					if (el !== '' && index > 1) {
						return addScale(el, index)
					} else {
						index--
						return addScale(el, index)
					}

				} else if (num < 10000 && el !== '') {
					return addScale(el, index)
				}
			})

			word = reverseAndJoin (num, wordArrayWithScale)

			if (number > 1000 && number % 1000 < 100 && number % 1000 > 0) {
				word = remoweAnd(word)
			}
		}

		phrase = `${sign}${word.trim()}${fraction}`

		return phrase
	}

	// SET MINUS
	const setSign = number => number < 0 ? 'minus ' : ''

	// ADD DECIMAL NUMBERS
	const buildDecimal = number => {
		let fractionWord = ''

		if (number % 1 !== 0) {
			const fraction = number.toString().split('.')[1]
			fractionWord = ' point'
			Array.from(fraction).forEach(el => fractionWord += ` ${numbers[parseInt(el)]}`)
		}

		return fractionWord
	}

	// CREATE NUMBER TEXT
	const splitIntoThreeDigits = number => {
		const digitGroups = []

		let numStr = number.toString()
		let counter = numStr.length

		if (numStr.length > 4) {

			while (counter > 0) {
				counter -= 3
				digitGroups.unshift(numStr.slice(counter))
				numStr = numStr.slice(0, counter)
				if (numStr.length === 2) {
					digitGroups.unshift(numStr)
					break
				}
			}
		} else if (numStr.length >=  2) {
			while (counter > 0) {
				counter -= 2
				digitGroups.unshift(numStr.slice(counter))
				numStr = numStr.slice(0, counter)
				if (numStr.length === 1) {
					digitGroups.unshift(numStr)
					break
				}
			}
		} else {
			digitGroups.push(numStr)
		}

		return digitGroups
	}

	const createHundreds = num => {
		const hundreds = Math.floor(num / 100)
		const tens = num % 100

		let hundredText = ''

		if (hundreds !== 0) {
			hundredText = `${numbers[hundreds]} hundred`

			if (tens !== 0) {
				hundredText += ' and '
			}
		}
		hundredText += createTens(tens)

		return hundredText
	}

	const createTens = num => {
		const tens = Math.floor(num / 10)
		const unit = num % 10

		let tensText = ''

		if (tens > 1) {
			tensText = numbers[tens * 10]
			if (unit !== 0) {
				tensText += `-${numbers[unit]}`
			}
		} else if (num !== 0) {
			tensText = numbers[num]
		}

		return tensText
	}

	const addScale = (text, position) => position !== 0 ? `${text} ${scale[position]}` : text

	const remoweAnd = word => {
		if (!word.includes(' and ')) {
			let wordArr = word.split(' ')
			let wordArrWithAnd = wordArr.splice(wordArr.length - 1, 0, 'and')
			wordArr = wordArr.join(' ')

			return wordArr
		}
	}

	const reverseAndJoin = (number, reversedWord) => {
		if (number % 1000 === 0 && reversedWord.length > 2) {
			return reversedWord.reverse().slice(0, 2).join(' ')
		} else {
			return reversedWord.reverse().join(' ')
		}
	}

	return {
		createWord,
		buildDecimal,
		splitIntoThreeDigits,
		createHundreds,
		setSign
	}
})()

export default NumberToStringConverter
