import axios from 'axios'
import { notification } from 'antd'
import { logoutRouter } from './user'

// 后端接口URL
const service = axios.create({
  baseURL: 'https://api.chinagpjd.com/aries',
  timeout: 10000,
})

// 获取当前登录用户token
export function getToken() {
  const auth = localStorage.getItem('access_token')
  let token = ''
  token = auth ? `bearer ${auth}` : 'Basic YnVzaW5lc3NfczpvdWQ0c1haZkJUMSZlcDRT'
  return token
}

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求方法不被允许。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
}

/** 异常处理程序
 * @see https://beta-pro.ant.design/docs/request-cn
 */
const errorHandler = (error) => {
  const { response } = error
  if (response && response.status) {
    if (response.status === 408) {
      logoutRouter()
      return
    }
    const errorText = codeMessage[response.status] || response.statusText
    const { status, config } = response
    notification.error({
      message: `请求错误 ${status}: ${config.url}`,
      description: errorText,
    })
  }
  if (error.status === 200) {
    const msg = error.data.resultMsg
    notification.error({
      message: msg,
      description: `${msg}: ${error.config.url}`,
    })
    return
  }
  if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    })
  }
  throw error
}

service.interceptors.request.use((config) => {
    const token = getToken()
    config.headers = {
      Authorization: token,
    }
    return config
  },(error) => {
    errorHandler(error)
  },
)



service.interceptors.response.use((response) => {
  // debugger
  const res = response.data
  return res

  // if (res.resultCode === 200 || response.config.url.indexOf('login') !== -1) {
  //   return res
  // } else {
  //   errorHandler(response)
  //   return Promise.reject(res)
  // }
}, errorHandler)

export { service }
