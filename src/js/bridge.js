function emit(topic, data = {}) {
    if (window.webkit && window.webkit.messageHandlers) {
        window.webkit.messageHandlers.callApp.postMessage({topic, data})
    } else if (window.callApp) {
        window.android.callApp(JSON.stringify({topic, data}))
    } else {
        throw new Error('No native bridge defined')
    }
}

export default {
    emit
}
