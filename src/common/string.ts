/**
 * 首字母大写, 其他不变
 */
const toUpperCaseFirst = (str: string) => {
    return str[0].toUpperCase() + str.substr(1)
}

export default {
    toUpperCaseFirst
}
