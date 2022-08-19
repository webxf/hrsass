import PageTools from './PageTools'
import xlsx from './xlsx'
import uploadImg from './uploadImg'
const components = [PageTools,xlsx,uploadImg]
export default{
    install(Vue){
        components.forEach((component) => {
            Vue.component(component.name,component)
        })
       
    }
}