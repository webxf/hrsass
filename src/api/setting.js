import request from '@/utils/request'

export function getcomponey(componeyId){
    return request({
        url:'/company/'+componeyId,
    })
}