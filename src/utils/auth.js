import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
//利用cookie来判断token是否过期,然后利用时间戳,判断是否超过2小时
export function setTokenTime(){
  return Cookies.set('tokenTime',Date.now())
}
export function getTokenTime(){
  return Cookies.get('tokenTime')
}