import router from '@/router'
import store from '@/store'
//配置未登录白名单
const whiteList = ['/login','/404']
//配置全局前置路由守卫，可以解决不用登陆输入网址直接跳过登录
router.beforeEach((to,from,next) => {
    //如果登录成功
    //拿到登陆后的token
   const token = store.state.user.token
   //加入有token，代表登陆成功
   if(token){
    //是可以防止每次切换路由前置守卫的时候，都要获取用户信息
    if(!store.state.user.token.userId){
    //登录，就可以获取到token,可以拿到用户对应信息
     store.dispatch('user/getUserInfo')
    }
    //加入路径是login页面,是否是登录页
    if(to.path==='/login'){
        //如果是登录页，就让它跳转到首页
        next('/')
    }else{
        //如果不是，直接进入
        next()
    }
   }else{
    //未登录
    //进入白名单，判断是否在白名单
    const isInclude = whiteList.includes(to.path)
    if(isInclude){
        //如果在白名单，就放行
        next()
    }else{
        //否则就跳转到登录页
        next('/login')
    }
   }
  })
  