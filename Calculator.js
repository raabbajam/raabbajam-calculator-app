// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const calculate = require('raabbajam-calculator').default;
const assert = require('assert');
const Calculator = {
  create,
};
module.exports = Calculator;

function create(el) {
  const display = el.getElementsByClassName('display')[0];
  const history = el.getElementsByClassName('history')[0];
  assert.ok(display, 'Display not found');
  const buttons = Array.from(el.getElementsByTagName('button'));
  let index = 0;
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      button.classList.add('clicked');
      setTimeout(() => {
        button.classList.remove('clicked');
      }, 400);
    });

    if (button.classList.contains('number')) {
      button.addEventListener('click', () => {
        const number = button.innerHTML;
        display.innerHTML += number;
      });
    }
    if (button.classList.contains('operator')) {
      button.addEventListener('click', () => {
        const operator = button.innerHTML;
        display.innerHTML = `${display.innerHTML} ${operator} `;
      });
    }
    if (button.classList.contains('equal')) {
      button.addEventListener('click', () => {
        const result = calculate(display.innerHTML);
        history.innerHTML = display.innerHTML;
        display.innerHTML = result;
      });
    }
  })
}
function executeOperator(operator, operand1, operand2) {
  operand1 = Number(operand1);
  operand2 = Number(operand2);
  let result = 0;
  switch (operator) {
    case '+':
      result = operand1 + operand2;
      break;
    case '-':
      result = operand1 - operand2;
      break;
    case '*':
      result = operand1 * operand2;
      break;
    case '/':
      result = operand1 / operand2;
      break;
  }
  return result;
}
