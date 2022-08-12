"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 首字母大写, 其他不变
 */
var toUpperCaseFirst = function (str) {
    return str[0].toUpperCase() + str.substr(1);
};
exports.default = {
    toUpperCaseFirst: toUpperCaseFirst
};
//# sourceMappingURL=string.js.map