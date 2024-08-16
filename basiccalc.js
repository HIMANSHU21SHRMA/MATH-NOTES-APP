// all stored value
let currentValue = '';
let previousValue = '';
let operator = '';
const buttons = document.querySelectorAll(".btn");
const display = document.querySelector('#display');
const lefttop = document.querySelector('.leftflots'); // Use the correct container for history display

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        const value = button.value;

        if (!isNaN(value)) {
            currentValue += value;
            display.value = currentValue;
        } else if (value === 'clear') {
            currentValue = '';
            display.value = '';
            operator = '';
            previousValue = '';
        } else if (value === '=') {
            const calculation = `${previousValue} ${operator} ${currentValue}`;
            currentValue = calculate(previousValue, currentValue, operator);
            display.value = currentValue;
            previousValue = currentValue;
            operator = '';

            // Save history
            saveHistory(calculation, currentValue);
        } else if (value === '%') {
            if (operator && previousValue) {
                currentValue = (parseFloat(previousValue) * (parseFloat(currentValue) / 100)).toString();
                display.value = currentValue;
            } else if (currentValue) {
                currentValue = (parseFloat(currentValue) / 100).toString();
                display.value = currentValue;
            }
        } else if (value === "+/-") {
            currentValue = (parseFloat(currentValue) * -1).toString();
            display.value = currentValue;
        } else if (value === '.') {
            if (!currentValue.includes('.')) {
                currentValue += '.';
                display.value = currentValue;
            }
        } else {
            if (currentValue) {
                operator = value;
                previousValue = currentValue;
                currentValue = '';
            }
        }
    });
});

// section for calc function
const calculate = (a, b, op) => {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (op) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return a / b;
        default:
            return b;
    }
};

// for close icon
const close = document.querySelector('.closeicon');
const openbtn = document.querySelector('.history');
const switchBtn = document.querySelector('#switch');
const switchInfo = document.querySelector('.switch-to ');

switchBtn.addEventListener('click', () => {
    switchInfo.classList.toggle('hidden');
    switchInfo.classList.toggle('visible');
});

close.addEventListener('click', () => {
    lefttop.classList.add('hidden');
});

openbtn.addEventListener('click', () => {
    lefttop.classList.remove('hidden');
});

// history saving function
const saveHistory = (calculation, result) => {
    const currentDate = new Date();
    const historyItem = {
        calculation: calculation,
        result: result,
        date: currentDate.getTime()
    };

    let history = JSON.parse(localStorage.getItem('calcHistory')) || [];
    history.push(historyItem);
    localStorage.setItem('calcHistory', JSON.stringify(history));

    // Display history after adding new entry
    displayHistory();
};

// Function to display calculation history
const displayHistory = () => {
    // Clear previous history
    let cont = document.querySelector('.cont')
    cont.innerHTML = '';

    let history = JSON.parse(localStorage.getItem('calcHistory')) || [];

    // Filter out items older than 7 days
    const sevenDaysAgo = new Date().getTime() - 7 * 24 * 60 * 60 * 1000;
    history = history.filter(item => item.date >= sevenDaysAgo);

    // Update local storage with filtered history
    localStorage.setItem('calcHistory', JSON.stringify(history));

    // Render history items
    history.forEach(item => {
        const date = new Date(item.date);
        const historyEntry = document.createElement('div');
        historyEntry.classList.add('cont');
        historyEntry.innerHTML = `<h4>${item.calculation}</h4><p>${item.result}</p><p>${date.toLocaleDateString()}</p>`;
        lefttop.appendChild(historyEntry); // Append to the correct container
    });
};

// Initial display of history on page load
document.addEventListener('DOMContentLoaded', displayHistory);
