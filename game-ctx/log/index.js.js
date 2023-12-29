let a = ''; //first number
let b = ''; //second number
let sign = ''; //знак операции
let finish = false;

let numberInMemory = '';

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', '/', 'x'];

//экран для вывода
const out = document.querySelector('.calc-screen p');

//функция для кнопки clearAll
function clearAll() {
    a = ''; //first number and result
    b = ''; //second number
    sign = ''; //знак операции
    finish = false;
    out.textContent = 0;
}

//функция для кнопки clear
function cleanCurrentNumber() {
    if(b ==='' && sign === '') {  //стираю просто само число
        a = '';
        out.textContent = 0; 
    }
    else if(a !== '' && b !== '' && sign !== '' && finish) {   // стираю результат
        a = ''; //first number and result
        b = ''; //second number
        sign = ''; //знак операции
        finish = false;
        out.textContent = 0;
        
    }
    else if(a !== '' && b === '') {  //стираю знак операции
        sign = '';
        out.textContent = sign; 
    }
    else if(a !== '' && sign !== '') {  //стираю второе число
        b = '';
        out.textContent = 0; 
        
    } 
}

//функция для того чтобы стереть один char
function cleanOneDigitOfInput() {
    if((b ==='' && sign === '') || (a !== '' && b !== '' && sign !== '' && finish) ) {  //стираю просто само число
        let numLength = a.length - 1;
        console.log(numLength);
        a = a.slice(0, numLength);
        console.log(a);
        out.textContent = a;
        if(a.length == 0){
            out.textContent = 0; 
        }
    }
    else if(a !== '' && sign !== '' && b === '') {  //стираю знак операции
        sign = '';
        out.textContent = 0; 
    }
    else if(a !== '' && sign !== '' && b !== '') {  //стираю второе число
        let numLength = b.length - 1;
        b = b.slice(0, numLength);
        console.log(b);
        out.textContent = b; 
        if(b.length == 0){
            out.textContent = 0; 
        }
    }
}

//Функция для кнопки MR
function memoryReadAndSafe() {
    if(b === '' && numberInMemory === '') {
        numberInMemory += a;
        console.log(numberInMemory);
        out.textContent = numberInMemory;
    }
    else if(a !== '' && b !== '' && numberInMemory === '' && finish) {
        numberInMemory += a;
        b = '';
        sign = '';
        console.log(a, b, sign);
        finish = false;
        out.textContent = numberInMemory;
    }
    else if(a !== '' && sign !== '' && b !== ''  && numberInMemory === '') {
        numberInMemory += b;
        console.log(numberInMemory);
        out.textContent = numberInMemory;
    }
    else if(a !== '' && sign !== '' && b === '') {
        out.textContent = 'error';
    }
    else if(b === '' && numberInMemory !== '') {
        a = numberInMemory;
        console.log(a);
        out.textContent = numberInMemory;
    }
    else if(a !== '' && b !== '' && numberInMemory !== '' && finish) {
        a = numberInMemory;
        b = '';
        sign = '';
        console.log(a, b, sign);
        finish = false;
        out.textContent = numberInMemory;
    }
    else if(a !== '' && numberInMemory !== '') {
        b = numberInMemory;
        console.log(b);
        out.textContent = numberInMemory;
    }
}

//Функция для кнопки M+
function currentNumberPlusMrNumber() {
    numberInMemory = Number(numberInMemory)
    let currentNumber = out.textContent 
    numberInMemory += Number(currentNumber); 
    console.log(numberInMemory);
}

function currentNumberMinusMrNumber() {
    numberInMemory = Number(numberInMemory)
    let currentNumber = out.textContent 
    numberInMemory -= Number(currentNumber); 
    console.log(numberInMemory);
}

function cleanMrNumber() {
    numberInMemory = '';
}


document.querySelector('.ac').onclick = clearAll;  //Подключила кнопку AC
document.querySelector('.clear').onclick = cleanCurrentNumber;   //Подключила кнопку C
document.querySelector('.backspace').onclick = cleanOneDigitOfInput;   //Подключила кнопку BSp
document.querySelector('.m-read').onclick = memoryReadAndSafe;   //Подключила кнопку mr
document.querySelector('.m-plus').onclick = currentNumberPlusMrNumber;   //Подключила кнопку mr
document.querySelector('.m-minus').onclick = currentNumberMinusMrNumber;   //Подключила кнопку mr
document.querySelector('.m-clean').onclick = cleanMrNumber;   //Подключила кнопку mr

//ловлю нажатие. событие на кнопке
//document.querySelector('.buttons').onclick;

document.querySelector('.buttons').onclick = (event) => {
    //нажата не кнопка
    if(!event.target.classList.contains('btn')) return;
    // нажата кнопка clearAll ac
    if(event.target.classList.contains('ac')) return;
    if(event.target.classList.contains('clear')) return;
    if(event.target.classList.contains('backspace')) return;
    if(event.target.classList.contains('m-read')) return;
    if(event.target.classList.contains('m-plus')) return;
    if(event.target.classList.contains('m-minus')) return;
    if(event.target.classList.contains('m-clean')) return;

    out.textContent = '';
    //получаю нажатую кнопку
    const key = event.target.textContent;

    //если нажата клавиша 0-9 или .
    if(digit.includes(key)){
        if(b === '' && sign === ''){
            a += key;
            out.textContent = a;
        }
        else if( a !== '' && sign !=='' && b !== '' && finish) {
            b = key;
            finish = false;
            out.textContent = b;
        }
        else {
            b += key;
            out.textContent = b;
        }
        console.log(a, b, sign);
        return;

    }

    //если нажата клавиша + - / *
    if(action.includes(key)){
        sign = '';
        sign += key;
        out.textContent = sign;
        return;
    }

    // если нажата =
    if(key === '=') {
        if(b === '') b = a;
        switch(sign){
            case '+':
                a = (+a) + (+b);
                sign ='';
                break;
            case '-':
                a = (+a) - (+b); 
                sign = '';
                break;
            case 'x':
                a = (+a) * (+b); 
                sign=';'
                break;
            case '/':
                if(b === '0'){  
                    out.textContent = 'error';  // ошибка при делении на ноль
                    a ='';
                    b = '';
                    sign = '';
                    return;
                }
                a = (+a) / (+b);
                sign='';
                break;
        }
        finish = true;
        if(!Number.isInteger(a)){
            a = a.toFixed(1);
        }
        out.textContent= a;
        console.log(a, b, sign);
    }
}
