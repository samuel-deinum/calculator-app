const operateSign = require("./operateSign/operateSign");

class Expression {
  constructor(expressionStr) {
    this.expressionStr = expressionStr;
    this.numbers = [];
    this.operators = [];

    this.number = 0;
    this.numberMultipler = 10;
    this.afterDigit = false;
    this.digitDevider = 1;

    this.solveSequence = [{ "^": 1 }, { x: 1, "/": 1 }, { "+": 1, "-": 1 }];

    this.build();
  }

  build() {
    for (let i = 0; i < this.expressionStr.length; i++) {
      let c = this.expressionStr.charAt(i);
      if (this.characterIsDigit(c)) {
        this.updateNumber(c);
      } else if (this.characterIsOperator(c)) {
        this.addOperator_and_Number(c);
      } else if (this.characterIsPeriod(c)) {
        this.setForPeriod();
      }
    }
    this.numbers.push(this.number);
  }

  characterIsDigit(c) {
    return /\d/.test(c);
  }

  updateNumber(c) {
    if (this.afterDigit) this.digitDevider = this.digitDevider * 10;
    this.number =
      this.number * this.numberMultipler + parseInt(c) / this.digitDevider;
  }

  characterIsOperator(c) {
    return c == "+" || c == "-" || c == "x" || c == "/" || c == "^" || c == "√";
  }

  addOperator_and_Number(c) {
    this.numbers.push(this.number);
    this.number = 0;
    this.afterDigit = false;
    this.digitDevider = 1;
    this.operators.push(c);
  }

  characterIsPeriod(c) {
    return c == ".";
  }

  setForPeriod() {
    this.numberMultipler = 1;
    this.afterDigit = true;
  }

  solve() {
    this.solveSequence.map(optObj => {
      this.solveOperation(optObj);
    });
    return this.numbers[0];
  }

  solveOperation(optObj) {
    for (let i = 0; i < this.operators.length; i++) {
      if (this.operators[i] in optObj) {
        const res = operateSign[this.operators[i]](
          this.numbers[i],
          this.numbers[i + 1]
        );
        this.numbers[i] = res;
        this.numbers.splice(i + 1, 1);
        this.operators.splice(i, 1);
        i--;
      }
    }
  }
}

module.exports = Expression;
