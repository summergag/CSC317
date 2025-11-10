// ===== Grab Display and Buttons =====
const display = document.querySelector('.display .value');
const buttons = document.querySelectorAll('.button');


// ===== Calculator State =====
const state = {
    firstOperand: null,
    operator: null,
    waitingForSecond: false,
    displayValue: '0',
};


// ===== Update Screen =====
function updateDisplay() {
    display.textContent = state.displayValue;
}


// ===== Digit Input =====
function inputDigit(digit) {
    if (state.waitingForSecond) {
        state.displayValue = digit;
        state.waitingForSecond = false;
    } else {
        state.displayValue =
            state.displayValue === '0' ? digit : state.displayValue + digit;
    }
}


// ===== Decimal Input =====
function inputDecimal() {
    if (state.waitingForSecond) {
        state.displayValue = "0.";
        state.waitingForSecond = false;
        return;
    }

    if (!state.displayValue.includes(".")) {
        state.displayValue += ".";
    }
}


// ===== Clear Button =====
function clearAll() {
    state.firstOperand = null;
    state.operator = null;
    state.waitingForSecond = false;
    state.displayValue = '0';
}


// ===== + / - Toggle =====
function toggleSign() {
    if (state.displayValue === "0") return;
    if (state.displayValue.startsWith("-")) {
        state.displayValue = state.displayValue.slice(1);
    } else {
        state.displayValue = "-" + state.displayValue;
    }
}


// ===== Percent =====
function percent() {
    state.displayValue = String(Number(state.displayValue) / 100);
}


// ===== Math Logic =====
function calculate(a, operator, b) {
    a = Number(a);
    b = Number(b);

    switch (operator) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return b === 0 ? 'Error' : a / b;
        default: return b;
    }
}


// ===== Operator Handling =====
function handleOperator(op) {
    const inputValue = state.displayValue;

    if (state.firstOperand === null) {
        state.firstOperand = inputValue;
    } else if (state.operator) {
        const result = calculate(state.firstOperand, state.operator, inputValue);
        state.displayValue = String(result);
        state.firstOperand = result;
    }

    state.operator = op;
    state.waitingForSecond = true;
}


// ===== Equals =====
function equals() {
    if (!state.operator) return;

    const result = calculate(
        state.firstOperand,
        state.operator,
        state.displayValue
    );

    state.displayValue = String(result);
    state.firstOperand = result;
    state.operator = null;
    state.waitingForSecond = true;
}



// ===== CLICK HANDLING (MATCHING YOUR HTML EXACTLY) =====
buttons.forEach(button => {
    button.addEventListener('click', () => {

        const digit = button.dataset.digit;
        const operator = button.dataset.operation;   // <--- YOU USED data-operation
        const decimal = button.dataset.decimal;       // <--- YOU USED data-decimal
        const action = button.dataset.action;

        if (digit !== undefined) {
            inputDigit(digit);
            updateDisplay();
            return;
        }

        if (operator !== undefined) {
            handleOperator(operator);
            updateDisplay();
            return;
        }

        if (decimal !== undefined) {
            inputDecimal();
            updateDisplay();
            return;
        }

        if (action === 'equals') {
            equals();
            updateDisplay();
            return;
        }

        if (action === 'clear') {
            clearAll();
            updateDisplay();
            return;
        }

        if (action === 'sign') {
            toggleSign();
            updateDisplay();
            return;
        }

        if (action === 'percent') {
            percent();
            updateDisplay();
            return;
        }
    });
});


// ===== INITIALIZE =====
updateDisplay();
