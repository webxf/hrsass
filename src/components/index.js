import PageTools from './PageTools'
import xlsx from './xlsx'
const components = [PageTools,xlsx]
export default{
    install(Vue){
        components.forEach((component) => {
            Vue.component(component.name,component)
        })
       
    }
}