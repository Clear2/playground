"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 获取当前运行环境
 * @returns {{isWechat: boolean, isAndroid: boolean, isiOS: boolean, isMusee: boolean}}
 */
var env = function () {
    var ua = window.navigator.userAgent || '';
    var isAndroid = /android/i.test(ua);
    var isMusee = /museeapp|musee/i.test(ua);
    var isiOS = /iphone|ipad|ipod/i.test(ua);
    var isWechat = /micromessenger\/([\d.]+)/i.test(ua);
    var isMini = function (resolve) {
        if (isWechat) {
            // @ts-ignore
            wx.miniProgram.getEnv(function (res) {
                resolve && resolve(res.miniprogram);
            });
        }
    };
    return {
        isAndroid: isAndroid,
        isiOS: isiOS,
        isWechat: isWechat,
        isMusee: isMusee,
        isMini: isMini
    };
};
exports.default = env();
//# sourceMappingURL=env.js.map