import request from '@/utils/request'
//小车启动
export function carStart(data) {
    return request({
      url: '/sand_table_car_start',
      headers: {
        isToken: false
      },
      method: 'post',
      data: data
    })
  }
//小车停止
  export function carStop(data) {
    return request({
      url: '/sand_table_car_end',
      headers: {
        isToken: false
      },
      method: 'post',
      data: data
    })
  }