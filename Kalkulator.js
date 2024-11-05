$(document).ready(function() {
    let display = $('.display');
    let historyList = $('#historyList');
    let currentInput = '';
    let operator = '';

    // Update display
    function updateDisplay(value) {
        display.val(value);
    }

    // Clear display and reset variables
    function clearDisplay() {
        currentInput = '';
        operator = '';
        updateDisplay('');
    }

    // Tambah riwayat ke daftar
    function addToHistory(expression, result) {
        historyList.append(`<li>${expression} = ${result}</li>`);
    }

    // Fungsi untuk menghitung faktor
    function factorial(n) {
        if (n < 0) return "Undefined";
        return n <= 1 ? 1 : n * factorial(n - 1);
    }

    // Fungsi untuk menjalankan perhitungan
    function calculate() {
        try {
            let result;
            let expression = currentInput.replace(/x/g, '*').replace(/\^/g, '**');

            // Mengecek apakah ada operator faktor
            if (operator === '!') {
                result = factorial(parseInt(currentInput));
            } else {
                result = eval(expression);
            }

            // Tampilkan hasil dan tambah ke riwayat
            updateDisplay(result);
            addToHistory(currentInput, result);

            // Reset input setelah hitung
            currentInput = result.toString();
            operator = '';
        } catch (error) {
            updateDisplay('Error');
            console.error("Calculation error:", error);
        }
    }

    // Klik tombol
    $('.button').click(function() {
        let btnValue = $(this).text();

        if (btnValue === 'C') {
            clearDisplay();
        } else if (btnValue === '=') {
            calculate();
        } else if (btnValue === '!') {
            operator = '!';
            calculate();
        } else {
            if (btnValue.match(/[0-9.%+-/^]/)) {
                currentInput += btnValue;
                updateDisplay(currentInput);
            } else if (btnValue === '+/-') {
                currentInput = (-parseFloat(currentInput)).toString();
                updateDisplay(currentInput);
            }
        }
    });
});
