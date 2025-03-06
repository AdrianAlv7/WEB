const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");

let currentInput = "";
let currentOperator = "";
let previousInput = "";
let shouldClearDisplay = false;

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const buttonText = button.textContent;

        if (buttonText.match(/[0-9.]/)) { // Números y punto decimal
            if (shouldClearDisplay) {
                display.textContent = "";
                shouldClearDisplay = false;
            }
            if (buttonText === "." && display.textContent.includes(".")) return;
            display.textContent = display.textContent === "0" ? buttonText : display.textContent + buttonText;
        } 
        else if (buttonText === "C") { // Limpiar pantalla
            display.textContent = "0";
            currentInput = "";
            previousInput = "";
            currentOperator = "";
        } 
        else if (buttonText === "=") { // Ejecutar cálculo
            if (currentOperator && previousInput !== "") {
                const result = calculate(parseFloat(previousInput), currentOperator, parseFloat(display.textContent));
                display.textContent = result;
                previousInput = result.toString();
                currentOperator = "";
                shouldClearDisplay = true;
            }
        } 
        else { // Operadores matemáticos +, -, *, /
            if (currentOperator) {
                previousInput = calculate(parseFloat(previousInput), currentOperator, parseFloat(display.textContent));
                display.textContent = previousInput;
            } else {
                previousInput = display.textContent;
            }
            currentOperator = buttonText;
            display.textContent = `${currentOperator} ${previousInput}`; // Agregar el operador a la izquierda
            shouldClearDisplay = true;
        }
    });
});

// Función de cálculo mejorada
function calculate(num1, operator, num2) {
    switch (operator) {
        case "+": return num1 + num2;
        case "-": return num1 - num2;
        case "*": return num1 * num2;
        case "/": return num2 !== 0 ? num1 / num2 : "Error";
        default: return num2;
    }
}
