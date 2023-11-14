import request from '@/utils/request'

export function playVoice(query) {
    return request({
      url: '/car_ctr',
      method: 'get',
      params: query
    })
}