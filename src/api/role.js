import request from '@/utils/request'

export function getRoles(params){
    return request({
        url:'/sys/role',
        params
    })
}

export function addRolesApi(data){
    return request({
        url:'/sys/role',
        method:'POST',
        data
    })
}

//根据id获取角色详情
export function getRoleInfo(id){
    return request({
        url:'/sys/role/'+id,
        method:'GET',
    })
}

//给角色分配权限
// 给角色分配权限
export function assignPerm(data) {
    return request({
      url: '/sys/role/assignPrem',
      method: 'put',
      data
    })
  }