import request from '@/utils/request'

export function login(data) {
    return request({
        url:'/sys/login',
        method:'POST',
        data
    })
}

/**
 * 获取用户资料
 * @returns promise
 */
export function getUserInfoApi(){
    return request({
        url:'/sys/profile',
        method:'POST'
    })
}

export function getUserImg(id){
    return request({
        url:`/sys/user/${id}`
    })
}