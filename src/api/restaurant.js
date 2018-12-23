// 商户相关

import request from '@/utils/request'

// 商户搜索
export function fetchMerchants(data) {
  return request({
    url: '/api2/restaurant/search',
    method: 'post',
    data
  })
}
export function fetchMerchantsByPage(data) {
  return request({
    url: '/api2/restaurant/searchByPage',
    method: 'post',
    data
  })
}
export function fetchShopDetail(id) {
  return request({
    url: '/api2/restaurant/detail/' + id,
    method: 'get'
    // params: { id }
  })
}
// 新增店铺
export function addShop(data) {
  return request({
    url: '/api2/restaurant/save',
    method: 'post',
    data
  })
}

export function updateShop(data) {
  return request({
    url: '/api2/restaurant/update',
    method: 'post',
    data
  })
}

// 合作伙伴更新
export function updatePartner(data) {
  return request({
    url: '/api2/partner/updatePartner',
    method: 'post',
    data
  })
}

// 保存账户
export function bankAccountSave(data) {
  return request({
    url: '/api2/bankAccount/save',
    method: 'post',
    data
  })
}

export function bankAccountUpdate(data) {
  return request({
    url: '/api2/bankAccount/update',
    method: 'post',
    data
  })
}

