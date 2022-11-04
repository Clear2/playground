
import { parse } from 'querystring'
import { formatDate } from './date'
import CryptoJS from 'crypto-js'

// 生成uuid
export function uuid(len, radix) {
  let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(
    '',
  )
  let uuid = [], i
  radix = radix || chars.length

  if (len) {
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)]
  } else {
    let r
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'

    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16)
        uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r]
      }
    }
  }

  return uuid.join('')
}


/**
 * 密码对称加密处理
 */
export const encryption = (word) => {
  const parseW = CryptoJS.enc.Utf8.parse(word)
  const date = formatDate(new Date(), 'YYYY-MM-DD')
  const iv = CryptoJS.enc.Utf8.parse(`${date}>musee`)
  console.log(iv)
  const encrypted = CryptoJS.AES.encrypt(parseW, iv, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  })
  const result = encrypted.toString()
  return result
}
