// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'
const service = axios.create({
    baseURL:process.env.VUE_APP_BASE_API,
    timeout:5000
}) // 创建一个axios的实例
service.interceptors.request.use((config) => {
    // config表示请求的类型
    //加入有token
    if(store.state.user.token){
        //需要请求头携带的Authorization，bearer 也是需要有的
        config.headers.Authorization = 'Bearer '+ store.state.user.token
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
function (error){
    Message.error('服务器异常')
    return Promise.reject(error)
}
) // 响应拦截器
export default service // 导出axios实例