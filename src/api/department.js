import request from '@/utils/request'

export function getDeptsApi(){
   return request({
    url:'/company/department'
   })
}

export function delDeptsApi(id){
    return request({
        url:'/company/department/'+id,
        method:'DELETE'
    })
}

//新增部门
export function addDepts(data){
    return request({
        url:'/company/department',
        method:'POST',
        data,
    })
}

export function EditDepts(id){
    return request({
        url:'/company/department/'+id,
    })
}

//编辑部门
export function editDeptss(data){
    return request({
        url:'/company/department/'+data.id,
        method:'PUT',
        data
    })
}