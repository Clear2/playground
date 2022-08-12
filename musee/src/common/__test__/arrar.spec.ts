import array  from '../array'

test('array last element', () => {
    expect(array.last([2, 3, 4])).toBe(4);
})