// important variables ==========================================================
const calculationDisplay = document.querySelector(".calculationDisplay");
const lastDisplay = document.querySelector(".lastDisplay");
const currentDisplay = document.querySelector(".currentDisplay");
const btns = document.querySelectorAll("button");
const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");



// Math Functions for basic math operands=====================================================================
function add(a, b) {
    return a + b;
};

function subtract(a, b) {
    return a - b;
};

function multiply(a, b) {
    return a * b;
};

function divide(a, b) {
    return a / b;
};


// operate function takes an operator and 2 numbers and calls above functions on the numbers
function operate(a, b, operator) {
    if (operator === "+") {
        return add(a, b);
    } else if (operator === "-") {
        return subtract(a, b);
    } else if (operator === "*") {
        return multiply(a, b)
    } else if (operator === "/") {
        return divide(a, b);
    };
};

// function to display text context ================================
function displayLast(lastOperation) {
    const oldLast = document.querySelector(".lastContent");
    lastDisplay.removeChild(oldLast);
    const lastOutput = document.createElement('div');
    lastOutput.classList.add("lastContent");
    lastOutput.textContent = lastOperation;
    lastDisplay.appendChild(lastOutput);
}

function displayCurrent(currentOperation) {
    const oldCurrent = document.querySelector(".currentContent");
    currentDisplay.removeChild(oldCurrent);
    const currentOutput = document.createElement('div');
    currentOutput.classList.add("currentContent");
    currentOutput.textContent = currentOperation;
    currentDisplay.appendChild(currentOutput);
}

// buttons events
// btns.forEach((button) => {
//     button.addEventListener("click", () => {
//         console.log(typeof(button.value));
//         console.log(button.value);
//     });
// });

let tempMemory = [];

digits.forEach((button) => {
    button.addEventListener("click", () => {
        tempMemory.push(button.value);
        console.log(tempMemory);
        let strArray = tempMemory.join("");
        displayCurrent(strArray);
    });
}); 


operators.forEach((button) => {
    button.addEventListener("click", () => {
        let operator = button.value;
        tempMemory.push(button.value)
        console.log(operator); 
        // phase = 1;
    }); 
});

//////Main code ====
// let phase = "p1";

// while (phase === "p1") {
    
// }