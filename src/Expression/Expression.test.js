const Expression = require("./Expression");
const SYNTAX_ERROR = "SYNTAX ERROR";

test("Build Arrays single digit numbers", () => {
  const expression = new Expression("1+2");
  expect(expression.numbers).toEqual([1, 2]);
  expect(expression.operators).toEqual(["+"]);
});

test("Build Arrays with multi digit numbers", () => {
  const expression = new Expression("11+2");
  expect(expression.numbers).toEqual([11, 2]);
  expect(expression.operators).toEqual(["+"]);
});

test("Build Arrays with Decimal", () => {
  const expression = new Expression("1.1+2");
  expect(expression.numbers).toEqual([1.1, 2]);
  expect(expression.operators).toEqual(["+"]);
});

test("Build Arrays with Multiple Expressions", () => {
  const expression = new Expression("6/3+2x5");
  expect(expression.numbers).toEqual([6, 3, 2, 5]);
  expect(expression.operators).toEqual(["/", "+", "x"]);
});

test("Build Arrays with Square Root", () => {
  const expression = new Expression("√9");
  expect(expression.numbers).toEqual([9]);
  expect(expression.operators).toEqual(["√"]);
});

test("Solve Simple Addition", () => {
  const expression = new Expression("1+1");
  const result = expression.solve();
  expect(result).toBe(2);
});

test("Solve Multiple Expressions", () => {
  const expression = new Expression("6/3+2x5");
  const result = expression.solve();
  expect(result).toBe(12);
});

test("Solve Power", () => {
  const expression = new Expression("2^4");
  const result = expression.solve();
  expect(result).toBe(16);
});

test("Solve Root", () => {
  const expression = new Expression("√9");
  const result = expression.solve();
  expect(result).toBe(3);
});

test("Build with Bracket", () => {
  const expression = new Expression("(1+1)x2");
  const subExp = new Expression("1+1)x2");
  expect(expression.numbers).toEqual([subExp, 2]);
  const subRes = subExp.solve();
  expect(subRes).toBe(2);
});

test("Solve with Bracket", () => {
  const expression = new Expression("(1+1)x2");
  const res = expression.solve();
  expect(res).toBe(4);
});

test("Solve with Nested Brackets", () => {
  const expression = new Expression("(6/(2+1))x2");
  const res = expression.solve();
  expect(res).toBe(4);
});

test("Solve with Redundant Brackets", () => {
  const expression = new Expression("((6/(2+1))x2)");
  const res = expression.solve();
  expect(res).toBe(4);
});

test("Solve with Mulitple Redundant Loops", () => {
  const expression = new Expression("((((6/(2+1))x2)))");
  const res = expression.solve();
  expect(res).toBe(4);
});

test("Solve with Multiple Brackets to the Power", () => {
  const expression = new Expression("6^(3-2)+6x(4-3)");
  const res = expression.solve();
  expect(res).toBe(12);
});

test("Solve Root of Multiple Brackets", () => {
  const expression = new Expression("√(6x(1+.5))");
  const res = expression.solve();
  expect(res).toBe(3);
});
