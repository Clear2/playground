/**
 * 邮箱
 * @param {*} s
 */

function isEmail (s) {
    const reg = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/
    return reg.test(s)
}

/**
 * 手机号码格式验证
 * @param value 需要验证的值
 */
function isMobile(s) {
    const reg = /^(13[0-9]|15[012356789]|17[0-9]|18[0-9]|19[0-9]|14[57])[0-9]{8}$/
    return reg.test(s)
}

/**
 * 身份证验证
 * @param value
 * @returns {boolean}
 */
function isIDCard (s) {
    const reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
    return reg.test(s)
}
export default {
    isMobile,
    isEmail,
    isIDCard
}
