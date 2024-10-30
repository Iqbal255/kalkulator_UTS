$(document).ready(function() {
    let currentInput = "";
    let operator = "";
    let previousInput = "";
    let resultDisplayed = false;

    // Function to update display
    function updateDisplay() {
        $('#input1').text(previousInput);
        $('#operasi-selected').text(operator);
        $('#input2').text(currentInput);
    }

    // Function to clear all inputs
    function clearAll() {
        currentInput = "";
        previousInput = "";
        operator = "";
        resultDisplayed = false;
        updateDisplay();
        $('#hasil-temporer').text("0");
    }

    // Handle number button clicks
    $('.tombol-angka').click(function() {
        if (resultDisplayed) {
            currentInput = "";
            resultDisplayed = false;
        }
        currentInput += $(this).text().trim();
        updateDisplay();
    });

    // Handle operation button clicks
    $('.tombol-operasi').click(function() {
        if (currentInput === "" && previousInput === "") return;
        if (previousInput && currentInput && operator) {
            previousInput = calculate(previousInput, currentInput, operator).toString();
            currentInput = "";
        } else if (currentInput) {
            previousInput = currentInput;
            currentInput = "";
        }
        operator = $(this).text().trim();
        updateDisplay();
    });

    // Toggle negative sign
    $('.toggle-negatif').click(function() {
        currentInput = currentInput.startsWith("-") ? currentInput.slice(1) : "-" + currentInput;
        updateDisplay();
    });

    // Factorial calculation
    $('.tombol-faktorial').click(function() {
        if (currentInput) {
            currentInput = factorial(parseInt(currentInput)).toString();
            updateDisplay();
        }
    });

    // Calculate result when "=" is pressed
    $('#btn-hitung').click(function() {
        if (previousInput && currentInput && operator) {
            currentInput = calculate(previousInput, currentInput, operator).toString();
            $('#hasil-temporer').text(currentInput);
            operator = "";
            previousInput = "";
            resultDisplayed = true;
            updateDisplay();
        }
    });

    // Clear all inputs when "C" is pressed
    $('.tombol-clear').click(function() {
        clearAll();
    });

    // Function to perform calculations
    function calculate(num1, num2, operator) {
        num1 = parseFloat(num1);
        num2 = parseFloat(num2);
        switch (operator) {
            case "+":
                return num1 + num2;
            case "-":
                return num1 - num2;
            case "x":
                return num1 * num2;
            case "/":
                return num2 !== 0 ? num1 / num2 : "Error";
            case "%":
                return num1 % num2;
            case "^":
                return Math.pow(num1, num2);
            default:
                return 0;
        }
    }

    // Factorial function
    function factorial(n) {
        if (n < 0) return "NaN";
        if (n === 0 || n === 1) return 1;
        return n * factorial(n - 1);
    }
});
