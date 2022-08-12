/**
 * 获取当前运行环境
 * @returns {{isWechat: boolean, isAndroid: boolean, isiOS: boolean, isMusee: boolean}}
 */
const env = () => {
    const ua = window.navigator.userAgent || ''
    const isAndroid = /android/i.test(ua)
    const isMusee = /museeapp|musee/i.test(ua)
    const isiOS = /iphone|ipad|ipod/i.test(ua)
    const isWechat = /micromessenger\/([\d.]+)/i.test(ua)

    const isMini = (resolve: Function) => {
        if (isWechat) {
            // @ts-ignore
            wx.miniProgram.getEnv(function(res) {
                resolve && resolve(res.miniprogram)
            })
        }
    }

    return {
        isAndroid,
        isiOS,
        isWechat,
        isMusee,
        isMini
    }
}

export default env()
