import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// 全局注册svg-icon
Vue.component('svg-icon', SvgIcon)
// 一次性使用所有svg文件
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
