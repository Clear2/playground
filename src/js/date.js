function formatType(type, format, value, regExpAttributes) {
    const regExpMap = {
        year: '(Y+)',
        month: '(M+)',
        date: '(D+)',
        hour: '(h+)',
        minute: '(m+)',
        second: '(s+)',
        quarter: '(q+)',
        millisecond: '(S)'
    }

    if (new RegExp(regExpMap[type], regExpAttributes).test(format)) {
        const replaceStr = type === 'year'
            ? value.toString().substr(4 - RegExp.$1.length)
            : (RegExp.$1.length === 1) ? value : pad(value)
        format = format.replace(RegExp.$1, replaceStr)
    }

    return format
}


function pad(value) {
    return ('00' + value).substr(('' + value).length)
}

function formatDate(date, format) {
    const map = {
        year: {
            value: date.getFullYear(),
            regExpAttributes: 'i'
        },
        month: {
            value: date.getMonth() + 1
        },
        date: {
            value: date.getDate(),
            regExpAttributes: 'i'
        },
        hour: {
            value: date.getHours(),
            regExpAttributes: 'i'
        },
        minute: {
            value: date.getMinutes()
        },
        second: {
            value: date.getSeconds()
        },
        quarter: {
            value: Math.floor((date.getMonth() + 3) / 3),
            regExpAttributes: 'i'
        },
        millisecond: {
            value: date.getMilliseconds()
        }
    }

    for (const key in map) {
        format = formatType(key, format, map[key].value, map[key].regExpAttributes)
    }

    return format
}

const date = `${formatDate(new Date(), 'YYYY-MM-dd')}>musee`
console.log(date)
// export default {
//     pad,
//     formatDate
// }
