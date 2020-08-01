const Expression = require("./Expression");

test("Create Expression", () => {
  const expression = new Expression("1+1");
  expect(expression.expressionString).toBe("1+1");
});

test("Build Simple Array", () => {
  const expression = new Expression("1+2");
  expect(expression.numbers).toMatch([1, 2]);
  expect(expression.operators).toMatch(["+"]);
});
