const operateSign = require("./operateSign.js");

test("1 + 1", () => {
  expect(operateSign["+"](1, 1)).toBe(2);
});

test("1 - 1", () => {
  expect(operateSign["-"](1, 1)).toBe(0);
});

test("1.25 - 1", () => {
  expect(operateSign["-"](1.25, 1)).toBe(0.25);
});

test("2 x 3", () => {
  expect(operateSign["x"](2, 3)).toBe(6);
});

test("6/2", () => {
  expect(operateSign["/"](6, 2)).toBe(3);
});

test("5/2", () => {
  expect(operateSign["/"](5, 2)).toBe(2.5);
});
