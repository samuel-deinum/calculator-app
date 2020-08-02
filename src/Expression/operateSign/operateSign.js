const operateSign = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  x: (a, b) => a * b,
  "/": (a, b) => a / b,
  "√": a => Math.sqrt(a),
  "^": (a, b) => Math.pow(a, b)
};

module.exports = operateSign;
