const Expression = require("./Expression");

test("Create Expression String", () => {
  const expression = new Expression("1+1");
  expect(expression.expressionStr).toBe("1+1");
});

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
