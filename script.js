function add(a, b) {
    return a + b;
}

function substract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

let n;
let m;
let o;

function operate(a, b, op) {
    if (op == "+") return add(a, b);
    if (op == "-") return substract(a, b);
    if (op == "*") return multiply(a, b);
    if (op == "/") return divide(a, b);
}

const body = document.querySelector("body");

const calculator = document.createElement("div");
calculator.id = "calculator";

const display = document.createElement("div");
display.id = "display";
display.innerText = "1234567890";

const keys = document.createElement("div");
keys.id = "keys";

const digits = document.createElement("div");
digits.id = "digits";

const operators = document.createElement('div');
operators.id = "operators";

for (let j = 9; j >= 0; j -= 3) {
    const row = document.createElement("div");
    row.classList = "row";
    for (let i = 0; i <= 2; i++) {
        if (j - i >= 0) {
            const digit = document.createElement('div');
            digit.innerText = j - i;
            digit.classList = `key`;
            digit.id = j - i;
            row.appendChild(digit);
        }
    }
    if(row.childElementCount==1){
        const digit = document.createElement('div');
        digit.classList = `key`;
        digit.id = "clear";
        digit.innerText = "Clear";
        row.appendChild(digit);
    }
    digits.appendChild(row);
}


keys.appendChild(digits);
keys.appendChild(operators);
calculator.appendChild(display);
calculator.appendChild(keys);
body.appendChild(calculator);