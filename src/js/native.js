import emit from './bridge'

export function nativeCall(name, params, schema = 'openApp.jdMobile') {
    window.location.href = buildSchema(name, params, schema);
}

export function buildSchema(name, params, schema = 'openApp.jdMobile') {
    return `${schema}://${name}?params=${encodeURIComponent(JSON.stringify(params))}`;
}

/**
 * 调用iPad支付
 * @param order
 */
export function iPadPay(order) {
    window.webkit.messageHandlers.goContinuePay.postMessage({
        orderId: order.id,
        orderSn: order.order_sn
    })
}

export function getAppVersion() {
    return emit('getAppVersion')
}
export default {
    iPadPay
}
