'use strict'

const UIController = (function () {
	const DOMStrings = {
		btn: '.btn',
		inputValue: '.form__input',
		outputText: '#phrase'
	}

	const getInput = () => parseFloat(document.querySelector(DOMStrings.inputValue).value)

	const displayText = text => document.querySelector(DOMStrings.outputText).innerHTML = text

	const clearField = () => document.querySelector(DOMStrings.inputValue).value = ''

	return {
		DOMStrings,
		getInput,
		displayText,
		clearField
	}
})()

export default UIController
