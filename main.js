const numbers = document.querySelectorAll('.number')
const operators = document.querySelectorAll('.operator')
const equalBtn = document.querySelector('.equal')
const resetBtn = document.querySelector('.reset')
const deleteBtn = document.querySelector('.delete')
const screen = document.querySelector(".result")
const numbersArray = Array.from(numbers)
const operatorsArray = Array.from(operators)

let finNumber = "";
let screenNumber = "";
let dotCounter = 0;
let zeroCounter = 0;
let order = [];

const printNumber = (event, number) => {
    event.preventDefault()
    if (number==="." && dotCounter===0) {
        dotCounter++
        if (finNumber.length===0)
            number="0."
    }
    else if (number==="." && finNumber.length > 1 ) return

    if (number==="0" && dotCounter===0 && zeroCounter>0 && finNumber.length===1) return
    else if (number==="0") zeroCounter++
    else if (number!=="." && finNumber==="0") {
        dotCounter++
        number=`.${number}`
    }

    if ((finNumber.length % 3 == 0) && (finNumber.length > 2) && (dotCounter === 0)){
        screenNumber+=","
    }

    finNumber+=number
    screenNumber+=number
    screen.innerHTML=screenNumber
}

const operate = (event, operator) => {
    event.preventDefault()
    switch(operator){
        case "+":
            order.push(finNumber)
            finNumber = ""
            screenNumber = ""
            dotCounter = 0;
            order.push("+")
            screen.innerHTML=""
            break
        case "-":
            order.push(finNumber)
            finNumber = ""
            screenNumber = ""
            dotCounter = 0;
            order.push("-")
            screen.innerHTML=""
            break
        case "x":
            order.push(finNumber)
            finNumber = ""
            screenNumber = ""
            dotCounter = 0;
            order.push("x")
            screen.innerHTML=""
            break
        case "/":
            order.push(finNumber)
            finNumber = ""
            screenNumber = ""
            dotCounter = 0;
            order.push("/")
            screen.innerHTML=""
            break
    }
}

const result = (event) => {
    event.preventDefault()
    order.push(finNumber)
    let fin=parseFloat(order[0]);
    for (let i=1; i< order.length-1; i+=2) {
        step=order[i];
        switch(step){
            case "+":
                fin+=parseFloat(order[i+1])
                break
            case "-":
                fin-=order[i+1]
                break
            case "x":
                fin*=order[i+1]
                break
            case "/":
                fin/=order[i+1]
                break
        }
    }
    finNumber=fin
    screenNumber=fin
    screen.innerHTML=`${fin}`
    order=[]
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
    event.preventDefault()
    finNumber=""
    screenNumber=""
    screen.innerHTML=""
    dotCounter = 0;
    order=[]
})

deleteBtn.addEventListener("click", (event) => {
    event.preventDefault()
    finNumber=finNumber.slice(0, finNumber.length-1)
    console.log(finNumber.length-1, finNumber.length)
    screenNumber=finNumber
    screen.innerHTML=screenNumber
    console.log(finNumber)
})