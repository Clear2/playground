/**
 * 获取当前运行环境
 * @returns {{isWechat: boolean, isAndroid: boolean, isiOS: boolean, isMusee: boolean}}
 */
function env() {
    const ua = window.navigator.userAgent || ''
    const isAndroid = /android/i.test(ua)
    const isMusee = /museeapp/i.test(ua)
    const isiOS = /iphone|ipad|ipod/i.test(ua)
    const isWechat = /micromessenger\/([\d.]+)/i.test(ua)

    const isMini = () => {
        return new Promise(resolve => {
            if (isWechat) {
                // @ts-ignore
                wx.miniProgram.getEnv((res: any) => {
                    if (res.miniprogram) {
                        resolve(true)
                    } else {
                        resolve(false)
                    }
                })
            } else {
                resolve(false)
            }
        })
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
