// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'
import {getTokenTime} from '@/utils/auth'
import router from '@/router'
//封装成一个函数
function istimeout(){
     //获取当前时间
     const current = Date.now()
     //获取拿到token的时间
     const tokenTime = getTokenTime()
     //定义时间差
     const timeout = 3*20*20*1000
     //假如当前时间减去获取token时间大于token过期时间,让他跳到登录页
     return current-tokenTime > timeout
        
}
const service = axios.create({
    baseURL:process.env.VUE_APP_BASE_API,
    timeout:5000
}) // 创建一个axios的实例
service.interceptors.request.use(async (config) => {
    // config表示请求的类型
    //加入有token
    if(store.state.user.token){
        if(istimeout()){
      //如果有token,需要先执行token清除,只需要退出登陆操作即可
      await store.dispatch('user/logoout')
      router.push('/login')
       return Promise.reject(new Error('登录过期')) 
        }else{
        //需要请求头携带的Authorization，bearer 也是需要有的
        config.headers.Authorization = 'Bearer '+ store.state.user.token
    }    
    }    
    return config
}) // 请求拦截器
service.interceptors.response.use((res) => {
    //请求成功时的响应拦截器，通过解构
    const {success,data,message} = res.data
    //如果成功，返回res，因为是已经解构了的
    if(success){
        return data
    } 
    //抛出错误
    Message.error(message)
    //如果输入错误，返回一个promise错误的
    return Promise.reject(new Error())
},
//响应错误、
async function (error){
    if(error?.response?.status===401){
    Message.error('登录过期')
    await store.dispatch('user/logoout')
    router.push('/login')
    }else{
    Message.error(error.message)

    }
    return Promise.reject(error)
}
) // 响应拦截器
export default service // 导出axios实例