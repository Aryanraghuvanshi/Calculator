const calculatorDisplay = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear-btn");

let firstValue = 0;
let operatorValue = "";
let awaitingNextValue = false;

function sendNumberValue(number) {
  //  Replace current display value if first value is enteres
  if (awaitingNextValue) {
    calculatorDisplay.textContent = number;
    awaitingNextValue = false;
  } else {
    // If current display vl is 0,replace it ,if not add num
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent =
    displayValue === "0" ? number : displayValue + number;
  }
}

function addDecimal() {
    // if opertor pressed don't add decimal
    if (awaitingNextValue) return ;
  // if no decimal , add one
  if (!calculatorDisplay.textContent.includes(".")) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
}

// calculate first and second value depending on operator
const calculate = {
    '/': (firstNumber, secondNumber)=> firstNumber / secondNumber,

    '*': (firstNumber, secondNumber)=> firstNumber * secondNumber,
    
    '+': (firstNumber, secondNumber)=> firstNumber + secondNumber,
    
    '-': (firstNumber, secondNumber)=> firstNumber - secondNumber,
    
    '=': (firstNumber, secondNumber)=> secondNumber,
};

function useOperator(operator) {
  const currentValue = Number(calculatorDisplay.textContent);
    // prevent multiole operator
    if(operatorValue && awaitingNextValue) {
       operatorValue = operator;
        return ;
     } 
  // Assign firstvalue if no value
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculation = calculate[operatorValue](firstValue,currentValue);
    calculatorDisplay.textContent = calculation;
    firstValue = calculation;
  }
  //   ready for the next value, store operator
  awaitingNextValue = true;
  operatorValue = operator;

}

// Add event listners for number,operetors , decimal button
inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener("click", () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains("operator")) {
    inputBtn.addEventListener("click", () => useOperator(inputBtn.value));
  } else if (inputBtn.classList.contains("decimal")) {
    inputBtn.addEventListener("click", addDecimal);
  }
});

//  Reset display
function resetAll() {
  firstValue = 0;
  operatorValue = "";
  awaitingNextValue = false;
  calculatorDisplay.textContent = "0";
}

// Event listner
clearBtn.addEventListener("click", resetAll);
