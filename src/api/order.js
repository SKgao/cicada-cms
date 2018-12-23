import request from '@/utils/request'

export function searchByPage(data) {
  return request({
    url: '/api2/order/searchByPage',
    method: 'post',
    data
  })
}

// 发达达
export function resendDaDa(data) {
  return request({
    url: '/api2/dada/resend',
    method: 'post',
    data
  })
}

// 取消达达
export function cancelDaDa(data) {
  return request({
    url: '/api2/dada/cancel',
    method: 'post',
    data
  })
}
