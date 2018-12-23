// 打印机相关

import request from '@/utils/request'

export function printmachineList(data) {
  return request({
    url: '/api2/print_machine/search',
    method: 'post',
    data
  })
}

export function printmachineAdd(data) {
  return request({
    url: '/api2/print_machine/save',
    method: 'post',
    data
  })
}

export function printmachineDelete(data) {
  return request({
    url: '/api2/print_machine/delete',
    method: 'post',
    data
  })
}

export function printmachinePrint(data) {
  return request({
    url: '/api2/print_machine/print',
    method: 'post',
    data
  })
}
