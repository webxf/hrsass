import router,{constantRoutes,asyncRoutes} from '@/router/index'
export default{
    namespaced: true,
    state:{
        routes:[],
        points:[]
    },
    mutations:{
        setRoutes(state,routes){
            state.routes = [...constantRoutes,...routes]
        },
        setPoints(state,payload){
            state.points = payload
        }
    },
    actions:{
        filterRoutes(context,roles){
            const routes = asyncRoutes.filter(item => {
                return roles.menus.includes(item.meta.id)
             }) 
             context.commit('setRoutes',routes)
             context.commit('setPoints',roles.points)
              //动态添加路由
              router.addRoutes([...routes,{ path: '*', redirect: '/404', hidden: true },])
             
        }
    }
}