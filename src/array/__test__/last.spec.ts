const last  = require('../array').default

test("get array last element", () => {
    expect(last([1, 2, 3])).toBe(3)
})