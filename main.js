const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const equalBtn = document.querySelector('.equal');
const resetBtn = document.querySelector('.reset');
const deleteBtn = document.querySelector('.delete');
const screen = document.querySelector(".result");
const numbersArray = Array.from(numbers);
const operatorsArray = Array.from(operators);

let finNumber = "";
let screenNumber = "";
let dotCounter = 0;
let zeroCounter = 0;
let minusCounter = 0;
let order = [];

const printNumber = (event, number) => {
    event.preventDefault();
    if (number==="." && dotCounter===0) {
        dotCounter++;
        if (finNumber.length===0 || (finNumber==="-"))
            number="0.";
    }
    else if (number==="." && finNumber.length > 1 ) return;

    if (number!=="." && (finNumber==="0" || finNumber==="-0")) {
        dotCounter++;
        number=`.${number}`;
    }

    if ((number==="0" && dotCounter===0 && zeroCounter>0 && finNumber.length===1) || finNumber.length>11) return;
    else if (number==="0") zeroCounter++;

    finNumber+=number;
    toScreenNum();
}

const operate = (event, operator) => {
    event.preventDefault();
    if (screenNumber==="" && operator==="-" && minusCounter===0) {
        finNumber+="-";
        minusCount();
        toScreenNum();
        return;
    }
    if (screenNumber==="" || screenNumber==="-") return;
    switch(operator){
        case "+":
            order.push(finNumber);
            order.push("+");
            break;
        case "-":
            order.push(finNumber);
            order.push("-");
            break;
        case "x":
            order.push(finNumber);
            order.push("x");
            break;
        case "/":
            order.push(finNumber);
            order.push("/");
            break;
    }
    reset();
}

const result = (event) => {
    event.preventDefault();
    if (screenNumber==="") return;
    order.push(finNumber);
    let fin=parseFloat(order[0]);
    for (let i=1; i< order.length-1; i+=2) {
        step=order[i];
        switch(step){
            case "+":
                fin+=parseFloat(order[i+1]);
                fin=parseFloat(fin.toFixed(11));
                break;
            case "-":
                fin-=order[i+1];
                fin=parseFloat(fin.toFixed(11));
                break;
            case "x":
                fin*=order[i+1];
                break;
            case "/":
                if (order[i+1]==="0") {
                    alert("You can't divide by zero");
                    fin="";
                    i=order.length;
                    break;
                }
                fin/=order[i+1];
                break;
        }
    }
    finNumber=String(fin);
    if (finNumber.length>11) {
        console.log(finNumber);
        if (finNumber<0){
            finNumber=finNumber.slice(0,11);
        }
        else {
            finNumber=parseFloat(finNumber).toExponential(7);
        }
    }
    zeroCount();
    dotCount();
    minusCount();
    toScreenNum();
    order=[];
}

numbersArray.forEach(btn => {
    btn.addEventListener("click", () => {
        printNumber(event, btn.innerHTML);
    })
})

operatorsArray.forEach(btn => {
    btn.addEventListener("click", () => {
        operate(event, btn.innerHTML);
    })
})

equalBtn.addEventListener("click", () => {
    result(event);
})

resetBtn.addEventListener("click", (event) => {
    event.preventDefault();
    reset();
    order=[];
})

deleteBtn.addEventListener("click", (event) => {
    event.preventDefault();
    deleteBtnEvent();
})

function deleteBtnEvent() {
    if (screenNumber && screenNumber.length!==0) {
        finNumber=String(parseFloat(finNumber));
        if (finNumber.length===1 || (finNumber.length===2 && finNumber.includes("-")) || finNumber==="NaN") {
            finNumber="";
            zeroCount();
            dotCount();
            minusCount();
            toScreenNum();
            return;
        }
        else finNumber=finNumber.slice(0, finNumber.length-1);
        zeroCount();
        dotCount();
        minusCount();
        finNumber=Number.parseFloat(finNumber);
        if (finNumber>99999999999)
            finNumber=finNumber.toExponential(7);
        finNumber=String(finNumber);
        toScreenNum();
    }
    else if (order.length!==0){
        order.pop();
        finNumber=order.pop();
        zeroCount();
        dotCount();
        minusCount();
        toScreenNum();
    }
}

function reset() {
    finNumber = "";
    screenNumber = "";
    dotCounter = 0;
    zeroCounter = 0;
    minusCounter = 0;
    screen.innerHTML = "";
}

function zeroCount() {
    zeroCounter=0;
    for (let i = 0; i < finNumber.length; i++) {
        if (finNumber[i] === '0') {
          zeroCounter++;
        }
    }
}

function dotCount() {
    dotCounter=0
    for (let i = 0; i < finNumber.length; i++) {
        if (finNumber[i] === '.') {
            dotCounter++;
            break;
        }
    }
}

function minusCount() {
    minusCounter = 0
    for (let i = 0; i < finNumber.length; i++) {
        if (finNumber[i] === '-') {
            minusCounter++;
            break;
        }
    }
}

function toScreenNum() {
    screenNumber="";
    let j=0;
    for (let i=finNumber.length-1; i >= 0; i--) {
        j++;
        screenNumber = finNumber[i] + screenNumber;
        if (j%3===0 && finNumber.length>j && dotCounter===0 && finNumber[i-1]!=="-" && !(finNumber.includes("e"))) screenNumber = "," + screenNumber;
    }
    screen.innerHTML = screenNumber;
}