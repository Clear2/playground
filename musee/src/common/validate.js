"use strict";
/**
 * 邮箱
 * @param {*} s
 */
Object.defineProperty(exports, "__esModule", { value: true });
function isEmail(s) {
    var reg = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
    return reg.test(s);
}
/**
 * 手机号码格式验证
 * @param value 需要验证的值
 */
function isMobile(s) {
    var reg = /^(13[0-9]|14[57]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])[0-9]{8}$/;
    return reg.test(s);
}
/**
 * 身份证验证
 * @param value
 * @returns {boolean}
 */
function isIDCard(s) {
    var reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    return reg.test(s);
}
exports.default = {
    isMobile: isMobile,
    isEmail: isEmail,
    isIDCard: isIDCard
};
//# sourceMappingURL=validate.js.map