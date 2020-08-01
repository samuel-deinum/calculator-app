class Expression {
  constructor(expressionStr) {
    this.expressionStr = expressionStr;
    this.numbers = [];
    this.operators = [];

    this.number = 0;
    this.numberMultipler = 10;
    this.afterDigit = false;
    this.digitDevider = 1;
    this.build();
  }

  build() {
    for (let i = 0; i < this.expressionStr.length; i++) {
      let c = this.expressionStr.charAt(i);
      if (this.characterIsDigit(c)) {
        this.addDigit(c);
      } else if (this.characterIsOperator(c)) {
        this.addOperator(c);
      } else if (this.characterIsPeriod(c)) {
        this.addPeriod();
      }
    }
    this.numbers.push(this.number);
  }

  characterIsDigit(c) {
    return /\d/.test(c);
  }

  addDigit(c) {
    if (this.afterDigit) this.digitDevider = this.digitDevider * 10;
    this.number =
      this.number * this.numberMultipler + parseInt(c) / this.digitDevider;
  }

  characterIsOperator(c) {
    return c == "+" || c == "-" || c == "x" || c == "/" || c == "^" || c == "√";
  }

  addOperator(c) {
    this.numbers.push(this.number);
    this.number = 0;
    this.afterDigit = false;
    this.digitDevider = 1;
    this.operators.push(c);
  }

  characterIsPeriod(c) {
    return c == ".";
  }

  addPeriod() {
    this.numberMultipler = 1;
    this.afterDigit = true;
  }
}

module.exports = Expression;
