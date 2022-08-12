"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 动态插入css
 */
var loadStyle = function (url) {
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(link);
};
exports.default = {
    loadStyle: loadStyle,
};
//# sourceMappingURL=utils.js.map