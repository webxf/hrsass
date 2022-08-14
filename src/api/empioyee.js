import request from '@/utils/request'

export function getDeptsFormListApi() {
    return request({
        url:'/sys/user/simple'
    })
}
export function getUserInfoApi(params){
    return request({
        url:'/sys/user',
        params
    })
}

export function delEmployee(id) {
    return request({
      url: `/sys/user/${id}`,
      method: 'delete'
    })
  }
  export function getEmployee(id) {
    return request({
      url: '/sys/user/'+id,
      method: 'get'
    })
  }
  //新增员工
  /** **
 *  新增员工的接口
 * **/
export function addEmployee(data) {
    return request({
      method: 'post',
      url: '/sys/user',
      data
    })
  }

  export function importEmployee(data) {
    return request({
      method: 'post',
      url: '/sys/user/batch',
      data
    })
  }

  export function updatePersonal(data) {
    return request({
      url: `/employees/${data.userId}/personalInfo`,
      method: 'put',
      data
    })
  }