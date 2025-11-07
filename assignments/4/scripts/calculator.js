// Grab display element
const display = document.querySelector('.display .value');

// Grab all buttons
const buttons = document.querySelectorAll('.button');

const state = {
    firstOperand: null,
    operator: null,
    waitingForSecond: false,
    displayValue: '0',
    lastPressesEquals: false
};

const MAX_LEN = 14;

const format = (num) => {
    
}