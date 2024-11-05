$(document).ready(function() {
    let display = $('.display');
    let historyList = $('#historyList');
    let currentInput = '';
    let operator = '';
    let history = [];

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
        history.push({ expression, result });
        historyList.append(`<li>${expression} = ${result}</li>`);
    }

    // Fungsi untuk menghitung faktor
    function factorial(n) {
        return n <= 1 ? 1 : n * factorial(n - 1);
    }

    // Fungsi untuk menjalankan perhitungan
    function calculate() {
        try {
            let result;
            let expression = currentInput.replace('x', '*').replace('^', '**');

            // Menghitung ekspresi
            if (operator === '!') {
                result = factorial(parseFloat(currentInput));
            } else {
                result = eval(expression);
            }

            // Tampilkan hasil dan tambah ke riwayat
            updateDisplay(result);
            addToHistory(currentInput, result);

            // Reset input
            currentInput = result.toString();
        } catch (error) {
            updateDisplay('Error');
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
            currentInput += btnValue;
            updateDisplay(currentInput);
        }
    });
});
