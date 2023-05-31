let n = 0;
let m = 0;
let o = "";
let first = true;
let ope;
let result = false;

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

function operate(a, b, op) {
    if (op == "+") return add(a, b);
    if (op == "-") return substract(a, b);
    if (op == "*") return multiply(a, b);
    if (op == "/") {
        if (b == 0) {
            alert("Error, cannot divide by 0");
            return "";
        } else {
            return divide(a, b);
        }

    }
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
            digit.id = "dot";
            digit.innerText = ".";
            row.appendChild(digit);
            digit = document.createElement('div');
            digit.classList = `key`;
            digit.id = "clear";
            digit.innerText = "Clear";
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

function clear() {
    console.log('clear');
    first = true;
    o = "";
    m = 0;
    n = 0;
    ope = "";
    display.innerText = o;
}

function digit(x) {
    if (!o.includes("err")) {
        o += x;
        display.innerText = o;
    }

}

function dot() {
    if (o == "") {
        o = "0.";
        display.innerText = o;
    } else if (first && !o.includes(".") && o !== "error") {
        o += ".";
        display.innerText = o;
    } else {
        o = "error";
        display.innerText = o;
    }
}

function operator(opera) {

    if (o == "") {
        o = "0";
        display.innerText = o;
    }

    if (first) {
        if (opera == "=") {
            return;
        }
        n = Number(o);
        o = "";
        ope = opera;
        first = false;
    } else {
        if (opera == "=") {
            first = true;
            display.innerText = operate(n, Number(o), ope);
            o = "";
            n = 0;
        } else {
            n = Math.round(1000*operate(n, Number(o), ope))/1000;
            display.innerText = n;
            o = "";
            ope = opera;
        }
    }



}


calculator();
const allKeys = document.querySelectorAll(".key");
allKeys.forEach(k => {
    k.addEventListener('click', e => addPressed(e.target));
    k.addEventListener('transitionend', e => removePressed(e.target));
    k.addEventListener('click', e => {

        console.log(k.innerText);

        if (k.attributes.key) { //if key is a digit
            digit(k.attributes.key.value);
        }

        if (k.id == "dot") { //if key is dot
            dot();
        }

        if (k.id == "clear") { //if key is clear
            clear();
        }

        if ("+=-/*".includes(k.innerText)) { //if key is an operator

            operator(k.innerText);
        }
        let obj = {
            o,
            first,
            n,
            m,
            ope,
        }
        console.log(obj);
    });
}); //key-click handle event