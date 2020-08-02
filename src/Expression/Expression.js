const operateSign = require("./operateSign/operateSign");
const SYNTAX_ERROR = "SYNTAX ERROR";

class Expression {
  constructor(expressionStr) {
    this.expressionStr = expressionStr;
    this.numbers = [];
    this.operators = [];

    this.number = 0;
    this.numberMultipler = 10;
    this.afterDigit = false;
    this.digitDevider = 1;

    this.solveSequence = [
      { "√": 1 },
      { "^": 1 },
      { x: 1, "/": 1 },
      { "+": 1, "-": 1 }
    ];

    this.build();
  }

  build() {
    while (this.expressionStr.length > 0) {
      const c = this.expressionStr.charAt(0);
      this.expressionStr = this.expressionStr.substr(1);
      if (this.characterIsDigit(c)) {
        this.implementDigit(c);
      } else if (this.characterIsOperator(c)) {
        this.implementOperator(c);
      } else if (c === ".") {
        this.implementPeriod();
      } else if (c === "(") {
        this.createNewExpression();
      } else if (c === ")") {
        this.numbers.push(this.number);
        return;
      }
    }
    this.numbers.push(this.number);
  }

  characterIsDigit(c) {
    return /\d/.test(c);
  }

  implementDigit(c) {
    if (this.afterDigit) this.digitDevider = this.digitDevider * 10;
    this.number =
      this.number * this.numberMultipler + parseInt(c) / this.digitDevider;
  }

  characterIsOperator(c) {
    return c == "+" || c == "-" || c == "x" || c == "/" || c == "^" || c == "√";
  }

  implementOperator(c) {
    if (c !== "√") this.numbers.push(this.number);
    this.number = 0;
    this.afterDigit = false;
    this.digitDevider = 1;
    this.operators.push(c);
  }

  implementPeriod() {
    this.numberMultipler = 1;
    this.afterDigit = true;
  }

  createNewExpression() {
    const newExp = new Expression(this.expressionStr);
    this.expressionStr = newExp.expressionStr;
    this.number = newExp;
  }

  solve() {
    this.solveSequence.forEach(optObj => {
      this.solveOperation(optObj);
    });
    return this.solve_If_Exp(this.numbers[0]);
  }

  solveOperation(optObj) {
    for (let i = 0; i < this.operators.length; i++) {
      if (this.operators[i] in optObj) {
        this.executeOperation(i);
        i = this.updateArrays(i);
      }
    }
  }

  executeOperation(i) {
    const num1 = this.solve_If_Exp(this.numbers[i]);
    let num2 = null;
    if (this.notSquareRoot(i)) num2 = this.solve_If_Exp(this.numbers[i + 1]);
    const res = operateSign[this.operators[i]](num1, num2);
    this.numbers[i] = res;
  }

  solve_If_Exp(number) {
    if (number instanceof Expression) number = number.solve();
    return number;
  }

  updateArrays(i) {
    if (this.notSquareRoot(i)) this.numbers.splice(i + 1, 1);
    this.operators.splice(i, 1);
    i--;
    return i;
  }

  notSquareRoot(i) {
    return this.operators[i] !== "√";
  }
}

module.exports = Expression;
