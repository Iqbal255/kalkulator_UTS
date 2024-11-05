$(document).ready(function() {
    const $display = $(".display");
    const $historyList = $("#historyList");
    let currentInput = "";
    let operator = null;
    let previousInput = "";

    $(".button").on("click", function() {
        const value = $(this).text();

        if (value === "C") {
            clear();
        } else if (value === "=") {
            calculate();
        } else if (isOperator(value)) {
            handleOperator(value);
        } else {
            appendToInput(value);
        }
    });

    function clear() {
        currentInput = "";
        previousInput = "";
        operator = null;
        updateDisplay("");
    }

    function appendToInput(value) {
        currentInput += value;
        updateDisplay(currentInput);
    }

    function isOperator(value) {
        return ["+", "-", "x", "/", "^", "%", "!", "+/-"].includes(value);
    }

    function handleOperator(value) {
        if (currentInput === "") return;

        if (previousInput !== "") {
            calculate();
        }
        operator = value;
        previousInput = currentInput;
        currentInput = "";
    }

    function calculate() {
        let result;
        const prev = parseFloat(previousInput);
        const curr = parseFloat(currentInput);

        if (isNaN(prev) || isNaN(curr)) return;

        switch (operator) {
            case "+":
                result = prev + curr;
                break;
            case "-":
                result = prev - curr;
                break;
            case "x":
                result = prev * curr;
                break;
            case "/":
                result = prev / curr;
                break;
            case "^":
                result = Math.pow(prev, curr);
                break;
            case "%":
                result = prev % curr;
                break;
            case "!":
                result = factorial(prev);
                break;
            case "+/-":
                result = -curr;
                break;
            default:
                return;
        }

        updateDisplay(result);
        addToHistory(`${previousInput} ${operator} ${currentInput} = ${result}`);
        currentInput = "";
        previousInput = result;
    }

    function updateDisplay(value) {
        $display.val(value);
    }

    function addToHistory(entry) {
        // Mengecek jika jumlah riwayat sudah mencapai 5
        if ($historyList.children().length >= 5) {
            // Menghapus semua riwayat
            $historyList.empty();
        }

        // Menambahkan entri baru ke riwayat
        const $listItem = $("<li>").text(entry);
        $historyList.append($listItem);
    }

    function factorial(num) {
        if (num < 0) return undefined;
        if (num === 0 || num === 1) return 1;
        return num * factorial(num - 1);
    }
});
