import request from '@/utils/request'

export function loginByUsername(phone, password) {
    const data = {
        phone,
        password
    }

    return request({
        url: '/api/login2',
        method: 'post',
        data
    })
}

export function logout() {
    return request({
        url: '/logout',
        method: 'post'
    })
}