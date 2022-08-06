import request from '@/utils/request'

export function getDeptsFormListApi() {
    return request({
        url:'/sys/user/simple'
    })
}