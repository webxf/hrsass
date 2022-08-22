import {login,getUserInfoApi,getUserImg} from '@/api/user'
import { setTokenTime } from '@/utils/auth'
import {resetRouter} from '@/router/index'
export default {
  namespaced: true,
  state: {
    token:'',
    userInfo:{}
  },
  mutations: {
    setToken(state,payload){
      state.token = payload
    },
    setUserInfo(state,payload){
      state.userInfo = payload
    }
  },
  actions: {
   async getToken(context,payload){
      //发送请求得来的数据
   const res = await login(payload)
   console.log(res);
      context.commit('setToken',res)
      //调用cookie方法
      setTokenTime()
    },
    //获取用户信息
   async getUserInfo(context){
    const res = await getUserInfoApi()
    console.log(res);
    //获取用户头像信息
    const data = await getUserImg(res.userId)
    console.log(data);
    //因为在请求拦截器拿到信息，可以直接commit，然后用拓展运算符，将其合并成一个
    context.commit('setUserInfo',{...res,...data})
    return res
    },
    logoout(context){
      context.commit('setToken','')
      context.commit('setUserInfo',{})
      resetRouter()
      context.commit('permission/setRoutes',[],{root:true})
    }
  }
}
