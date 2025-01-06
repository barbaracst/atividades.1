class Calculator{
    constructor(currentInput = '', operator = null, previousInput = null){
        this.currentInput = currentInput,
        this.operator = operator,
        this.previousInput = previousInput
    }
    appendNumber(Number){
        this.currentInput += Number;
    }

    setOperator(operator){
        if (this.currentInput === '') return; 
        if (this.previousInput !== null){
            this.calculate();
        }
        this.operator = operator;
        this.previousInput = this.currentInput;
        this.currentInput = '';
    }
    calculate(){
        if (this.previousInput === null || this.currentInput === '') return;
        const previous = parseFloat(this.previousInput);
        const current = parseFloat(this.currentInput);
        let Resultado;

        switch(this.operator){
            case '+':
                Resultado = previous + current;
                break
            case '-':
                Resultado = previous -  current;
                break;
            case '*':
                Resultado = previous * current;
                break;
            case '/':
                if (current === 0){
                    Resultado = "Erro. Divisão por 0"
                } else {
                    Resultado = previous / current;
                }
                break;
            default:
                return;
        }
        this.currentInput = Resultado.toString(); 
        this.operator = null; 
        this.previousInput = null;

    };
    clear() { 
        this.currentInput = ''; 
        this.operator = null; 
        this.previousInput = null; 
    }
};

var calc = new Calculator();

//Soma
calc.clear()
calc.appendNumber('5');
calc.setOperator('+');
calc.appendNumber('5'); // Corrigido
calc.calculate();
console.log("Soma =", calc.currentInput);

//Subtração
calc.clear()
calc.appendNumber('10');
calc.setOperator('-');
calc.appendNumber('2'); // Corrigido
calc.calculate();
console.log("Subtração =", calc.currentInput);

//Multipicação
calc.clear()
calc.appendNumber('10');
calc.setOperator('*');
calc.appendNumber('5');
calc.calculate();
console.log("Multiplicação = ", calc.currentInput);

//Divisão
calc.clear()
calc.appendNumber('10');
calc.setOperator('/');
calc.appendNumber('0');
calc.calculate();
console.log("Divisão = ", calc.currentInput);
