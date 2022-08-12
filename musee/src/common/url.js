"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @desc 获取 url 参数
 * @param {*string} key 字段名
 * @param {*string} url 需解析的 url, 默认是location.search
 * @return {string|object}
 */
function getQueryParam(key, url) {
    var search = url ? url.split('?')[1] || '' : location.search.substring(1);
    var queries = {};
    search.split('&').map(function (v) {
        var arr = v.split('=');
        queries[arr[0]] = arr[1];
    });
    if (key) {
        return queries[key];
    }
    return queries;
}
exports.default = {
    getQueryParam: getQueryParam
};
//# sourceMappingURL=url.js.map