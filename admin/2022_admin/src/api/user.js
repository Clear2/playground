import { service } from '@/utils'
import { encryption } from '@/utils/utils'

export function postLogin(params) {
  const data = {
    userName: params.username,
    password: encryption(params.password),
  }
  return service('/auth/emp/password/login', {
    method: 'POST',
    params: data,
  })
}

export function postLogout() {
  return service('/auth/token/logout', {
    method: 'POST',
  })
}
