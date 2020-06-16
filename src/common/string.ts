/**
 * 首字母大写, 其他不变
 */
export const toUpperCaseFirst = str => {
    return str[0].toUpperCase() + str.substr(1)
}

export default {
    toUpperCaseFirst
}
