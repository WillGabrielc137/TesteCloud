const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentValue = "0";

function updateDisplay() {
  display.value = currentValue;
}

function addValue(value) {
  if (currentValue === "Erro") {
    currentValue = "0";
  }

  if (currentValue === "0" && value !== ".") {
    currentValue = value;
    return;
  }

  const lastChar = currentValue[currentValue.length - 1];
  const operators = ["+", "-", "*", "/", "%"];

  if (operators.includes(lastChar) && operators.includes(value)) {
    currentValue = currentValue.slice(0, -1) + value;
    return;
  }

  currentValue += value;
}

function clearDisplay() {
  currentValue = "0";
}

function deleteLast() {
  if (currentValue.length === 1 || currentValue === "Erro") {
    currentValue = "0";
  } else {
    currentValue = currentValue.slice(0, -1);
  }
}

function calculate() {
  try {
    const result = Function(`"use strict"; return (${currentValue})`)();

    if (!Number.isFinite(result)) {
      currentValue = "Erro";
      return;
    }

    currentValue = String(Number(result.toFixed(10)));
  } catch {
    currentValue = "Erro";
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.dataset.value;
    const action = button.dataset.action;

    if (value) {
      addValue(value);
    }

    if (action === "clear") {
      clearDisplay();
    }

    if (action === "delete") {
      deleteLast();
    }

    if (action === "calculate") {
      calculate();
    }

    updateDisplay();
  });
});

document.addEventListener("keydown", (event) => {
  const allowedKeys = "0123456789+-*/.%";

  if (allowedKeys.includes(event.key)) {
    addValue(event.key);
  }

  if (event.key === "Enter") {
    calculate();
  }

  if (event.key === "Backspace") {
    deleteLast();
  }

  if (event.key.toLowerCase() === "c") {
    clearDisplay();
  }

  updateDisplay();
});
