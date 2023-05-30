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
let first = true;
let ope;

function operate(a, b, op) {
    if (op == "+") return add(a, b);
    if (op == "-") return substract(a, b);
    if (op == "*") return multiply(a, b);
    if (op == "/") return divide(a, b);
}

function addPressed(e) {
    console.log(e.innerText);
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
            digit.id = "dot";
            digit.innerText = ".";
            digit.addEventListener('click', (e) => {
                if (o == "") {
                    o = "0.";
                } else if(o.includes(".")){
                    o="error";
                }else {
                    o += ".";
                }
                display.innerText = o;
            });
            row.appendChild(digit);
            digit = document.createElement('div');
            digit.classList = `key`;
            digit.id = "clear";
            digit.innerText = "Clear";
            digit.addEventListener('click', (e) => {
                o = "";
                first = true;
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
        op.addEventListener('click', (e) => {
            if (first && e.target.innerText == "=") {
                o = "error";
                display.innerText = o;
            } else if (first) {
                ope = e.target.innerText;
                first = false;
                n = Number(o);
                console.log(n);
                o="";
            } else if (!first) {
                first = true;
                m = Number(o);
                console.log(n, m, ope);
                o = Math.round(operate(n, m, ope) * 1000) / 1000;
                console.log(o);
                display.innerText = o;
                ope = e.target.innerText;
            }

        });
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
console.log(Array.from(numbers).map(el => el.innerText));
numbers.forEach(key => key.addEventListener('click', (e) => {
    if (first && !"+-*/=".includes(o[o.length - 1])) {
        o += e.target.innerText;
        display.innerText = o;
    } else {
        o = "";
        o += e.target.innerText;
        display.innerText = o;
    }

})); //key-click changes display

