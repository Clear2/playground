/**
 * @desc 获取 url 参数
 * @param {*string} key 字段名
 * @param {*string} url 需解析的 url, 默认是location.search
 * @return {string|object}
 */
declare function getQueryParam(key: string, url: string): string | {
    [key: string]: string;
};
declare const _default: {
    getQueryParam: typeof getQueryParam;
};
export default _default;
