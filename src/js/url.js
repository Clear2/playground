/**
 * @desc 获取 url 参数
 * @param {*string} key 字段名
 * @param {*string} url 需解析的 url, 默认是location.search
 * @return {string|object}
 */
function getQueryParam (key, url) {
    let search = url ? url.split('?')[1] || '' : location.search.substring(1)
    let queries = {}
    search.split('&').map(v => {
        let arr = v.split('=')
        queries[arr[0]] = arr[1]
    })

    if (key) {
        return queries[key]
    }

    return queries
}

export default {
    getQueryParam
}
