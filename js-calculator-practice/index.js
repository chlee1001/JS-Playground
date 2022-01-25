const calculator = document.querySelector('.calculator');
const displayResult = document.querySelector('.result');
const contents = calculator.querySelector('.contents');

function calculate(n1, operator, n2) {
    let result = 0;
    if (operator === '+') {
        result = Number(n1) + Number(n2); // '+'버튼을 눌렀을 때
    } else if (operator === '-') {
        result = Number(n1) - Number(n2); // '-'버튼을 눌렀을 때
    } else if (operator === '×') {
        result = Number(n1) * Number(n2); // '×'버튼을 눌렀을 때
    } else if (operator === '÷') {
        result = Number(n1) / Number(n2); // '÷'버튼을 눌렀을 때
    }
    return String(result);
}

let firstNum = "";
let currentOperator = "";
let previousKey = "";
let previousNum = "";

contents.addEventListener("click", e => {
    const target = e.target;
    const action = target.classList[0];
    const buttonContent = target.textContent;

    if (target.matches("button")) {
        if (action === 'ac') { // AC(초기화) 버튼을 누를 때
            displayResult.textContent = '0';
            firstNum = '';
            previousNum = '';
            currentOperator = '';
            previousKey = '';
        }

        if (action === 'operator') {
            if (buttonContent === '=') { // = 연산자이면
                if (firstNum !== '' && currentOperator === '') { // 그냥 바로 출력
                    displayResult.textContent = firstNum;
                } else{
                    displayResult.textContent = calculate(firstNum, currentOperator, previousNum)
                    firstNum = displayResult.textContent
                }
            } else {
                previousNum = displayResult.textContent;
                currentOperator = buttonContent;
                previousKey = currentOperator; // 직전키에 연산자 저장
            }
        }

        if (action === 'number') {
            if (displayResult.textContent === '0' && currentOperator === '') { // 최초 클릭
                displayResult.textContent = buttonContent;
                firstNum = displayResult.textContent;
            } else if (displayResult.textContent !== '0' && currentOperator === '') { // 여러자리수 값 입력
                displayResult.textContent += buttonContent;
                firstNum = displayResult.textContent;
            } else if (displayResult.textContent !== '0' && currentOperator !== '') { // 첫번 째 값 입력, 연산자도 클릭되었을 때
                if (previousKey === currentOperator) { // 직전 키가 연산자이면
                    displayResult.textContent = buttonContent;
                    previousKey = displayResult.textContent;
                    previousNum = displayResult.textContent; // 직전 숫자를 변수에 할당
                } else if (previousKey !== currentOperator) { // 직전 키가 연산자가 아니면
                    displayResult.textContent += buttonContent;
                    previousNum = displayResult.textContent;
                }
            }
        }
    }

})
