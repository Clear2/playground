"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * @param array
 * @returns Returns the last element of `array`
 * @example
 * last([1, 2, 3])
 * // => 3
 */
function array(array) {
    var length = array == null ? 0 : array.length;
    return length ? array[length - 1] : undefined;
}
exports.default = array;
//# sourceMappingURL=last.js.map