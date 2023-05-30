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

let n = 0;
let m = 0;
let o = "";

function operate(a, b, op) {
    if (op == "+") return add(a, b);
    if (op == "-") return substract(a, b);
    if (op == "*") return multiply(a, b);
    if (op == "/") return divide(a, b);
}

function addPressed(e) {
    e.classList.add("pressed");
}
function removePressed(e) {
    e.classList.remove("pressed");
}

function calculator() {
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

    for (let j = 9; j >= 0; j -= 3) {//generate digits
        const row = document.createElement("div");
        row.classList = "row";
        row.setAttribute("key", j);
        for (let i = 0; i <= 2; i++) {
            if (j - i >= 0) {
                const digit = document.createElement('div');
                digit.innerText = j - i;
                digit.classList = `key`;
                digit.setAttribute("key", j - i);
                row.appendChild(digit);
            }
        }
        if (row.childElementCount == 1) {
            let digit = document.createElement('div');
            digit.classList = `key`;
            digit.id = "clear";
            digit.innerText = "Clear";
            digit.addEventListener('click',(e)=>{
                o="";
                display.innerText = o; //clear event
            });
            row.appendChild(digit);
        }
        digits.appendChild(row);
    }

    for (el in "+-*/=".split("")) {//generate operators
        const op = document.createElement("div");
        op.classList = "key";
        op.innerText = "+-*/="[el];
        operators.appendChild(op);
    }


    keys.appendChild(digits);
    keys.appendChild(operators);
    calculator.appendChild(display);
    calculator.appendChild(keys);
    body.appendChild(calculator);
}
calculator();

const allKeys = document.querySelectorAll(".key");
allKeys.forEach(k => {
    k.addEventListener('click', e => addPressed(e.target));
    k.addEventListener('transitionend', e => removePressed(e.target));
}); //key-click animation

const numbers = document.querySelectorAll(".key[key]");
console.log(Array.from(numbers).map(el=>el.innerText));
numbers.forEach(key => key.addEventListener('click', (e)=>{
    o+=e.target.innerText;
    display.innerText = o;
})); //key-click changes display