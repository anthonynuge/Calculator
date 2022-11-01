// important variables ==========================================================
const calculationDisplay = document.querySelector(".calculationDisplay");
const lastDisplay = document.querySelector(".lastDisplay");
const currentDisplay = document.querySelector(".currentDisplay");
const btns = document.querySelectorAll("button");
const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector(".equals");
const allClear = document.querySelector(".allClear")
const decimal = document.querySelector("#decimal");
const negative = document.querySelector(".negative");


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

function getRemainder(a, b) {
    return a % b;
}


// operate function takes an operator and 2 numbers and calls above functions on the numbers
function operate(a, b, operator) {
    if (operator === "+") {
        return add(a, b);
    } else if (operator === "-") {
        return subtract(a, b);
    } else if (operator === "X") {
        return multiply(a, b)
    } else if (operator === "/") {
        return divide(a, b);
    } else if (operator === "%") {
        return getRemainder(a, b);
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

// Update the memory after hitting the operator button ===========================
function updateMemory(tempMemory) {
    if (tempMemory.operator !== "" && tempMemory.a !== null) {
        if (tempMemory.negative === "-") {
            tempMemory.b -= Number(tempMemory.temp.join(""))
            tempMemory.temp = [];
            tempMemory.negative = "";

        } else {
            tempMemory.b += Number(tempMemory.temp.join(""));
            tempMemory.temp = [];
        };
    } else {
        if (tempMemory.negative === "-") {
            tempMemory.a -= Number(tempMemory.temp.join(""))
            tempMemory.temp = [];
            tempMemory.negative = "";

        } else {
            tempMemory.a += Number(tempMemory.temp.join(""));
            tempMemory.temp = [];
            let lastDisplayContent = `${tempMemory.a} ${tempMemory.operator}`;
            displayLast(lastDisplayContent);
        }
    };
};


// reset the tempmemory to inital settings;=================================
function reset(tempMemory) {
    tempMemory.temp = [];
    tempMemory.operator = "";
    tempMemory.a = null;
    tempMemory.b = null;
    tempMemory.total = null;
    tempMemory.negative = "";
    displayCurrent(0);
    displayLast("");
};

// default memory set to null ============================================
let tempMemory = {
    temp: [],
    operator:"",
    a: null,
    b: null, 
    total: null,
    negative: "" 
};


// button functionality ======================================================
digits.forEach((button) => {
    button.addEventListener("click", () => {
        if (tempMemory.total !== null) {      // resets the memory after operation hitting digit key
            reset(tempMemory);
        };
        tempMemory.temp.push(button.value);
        let strArray = tempMemory.temp.join("");
        displayCurrent(`${tempMemory.negative}${strArray}`);
        console.table(tempMemory);
    });
}); 


operators.forEach((button) => {
    button.addEventListener("click", () => { 
        if (tempMemory.total !== null) {      //if you want to continue using last number  
            tempMemory.a = tempMemory.total;
            tempMemory.b = null;
            tempMemory.total = null; 
        };
        let operator = button.value;
        tempMemory.operator = operator;
        updateMemory(tempMemory);
        strArray = `${tempMemory.a} ${tempMemory.operator}`;
        displayLast(strArray);
        displayCurrent(tempMemory.b);
        console.log(operator); 
        console.table(tempMemory);
    }); 
});

equals.addEventListener("click", () => {
    updateMemory(tempMemory);
    if (tempMemory.b === null) {
        tempMemory.b = 0;
        tempMemory.operator = "+";
    }
    tempMemory.total += Number(operate(tempMemory.a, tempMemory.b, tempMemory.operator));
    strArray = `${tempMemory.a} ${tempMemory.operator} ${tempMemory.b} = `;
    displayLast(strArray);
    displayCurrent(tempMemory.total);
    console.table(tempMemory);
});

allClear.addEventListener("click", () => {
    reset(tempMemory);
    console.table(tempMemory);
});

decimal.addEventListener(("click"), () => {
    if (tempMemory.temp.includes(".")) {
        return;
    }
    if (tempMemory.temp.length === 0) {
        tempMemory.temp.push(".");
        displayCurrent(`0.`)
    } else {
        tempMemory.temp.push(".");
        displayCurrent(tempMemory.temp.join(""));
    }
});

negative.addEventListener("click", () => {
    if (tempMemory.negative === "") {
        tempMemory.negative = "-";
        if (tempMemory.temp.length === 0) {
        displayCurrent(`-0`)
        } else {
            let negativeDisplay = "-" + (tempMemory.temp.join(""));
            displayCurrent(negativeDisplay);
        }
    } else {
        tempMemory.negative = "";
    }
    console.table(tempMemory);
});

// Event listener for key presses====================================================
window.addEventListener("keydown", keyboardHandlerInput);

function keyboardHandlerInput(e) {
    if (e.key >= 0 && e.key <= 9) {
        if (tempMemory.total !== null) {      // resets the memory after operation hitting digit key
            reset(tempMemory);
        };
        tempMemory.temp.push(Number(e.key));
        let strArray = tempMemory.temp.join("");
        displayCurrent(`${tempMemory.negative}${strArray}`);
    };
    if (e.key === ".") {
        if (tempMemory.temp.includes(".")) {
            return;
        }
        if (tempMemory.temp.length === 0) {
            tempMemory.temp.push(".");
            displayCurrent(`0.`)
        } else {
            tempMemory.temp.push(".");
            displayCurrent(tempMemory.temp.join(""));
        };
    };
    if (e.key === '=' || e.key === 'Enter') {
        updateMemory(tempMemory);
        if (tempMemory.b === null) {
            tempMemory.b = 0;
            tempMemory.operator = "+";
        }
        tempMemory.total += Number(operate(tempMemory.a, tempMemory.b, tempMemory.operator));
        strArray = `${tempMemory.a} ${tempMemory.operator} ${tempMemory.b} = `;
        displayLast(strArray);
        displayCurrent(tempMemory.total);
        console.table(tempMemory);
    };
    if (e.key === 'Escape') reset(tempMemory);
    if (e.key === "+" || e.key === "-" || e.key === "%" || e.key === "*" || e.key === "/") {
        if (tempMemory.total !== null) {      //if you want to continue using last number  
            tempMemory.a = tempMemory.total;
            tempMemory.b = null;
            tempMemory.total = null; 
        };
        if (e.key === "*") {
            let convertedMultiply = "X";
            tempMemory.operator = convertedMultiply;
            
        } else {
            let operatorKey = e.key;
            tempMemory.operator = operatorKey;
        };
        updateMemory(tempMemory);
        strArray = `${tempMemory.a} ${tempMemory.operator}`;
        displayLast(strArray);
        displayCurrent(tempMemory.b);
        console.table(tempMemory);
    };
};
