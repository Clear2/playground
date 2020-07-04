/**
 * 邮箱
 * @param {*} s
 */
declare function isEmail(s: string): boolean;
/**
 * 手机号码格式验证
 * @param value 需要验证的值
 */
declare function isMobile(s: string): boolean;
/**
 * 身份证验证
 * @param value
 * @returns {boolean}
 */
declare function isIDCard(s: string): boolean;
declare const _default: {
    isMobile: typeof isMobile;
    isEmail: typeof isEmail;
    isIDCard: typeof isIDCard;
};
export default _default;
