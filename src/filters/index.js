// set function parseTime,formatTime to filter
export { parseTime, formatTime } from '@/utils'

function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

/* 数字 格式化*/
export function numberFormatter(num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

export function toThousandFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

export function priceFormatYuan(num) {
  num = parseFloat(num)
  return num ? num.toFixed(2) : '0.00'
}

export const dateFormat = (date, Str) => {
  const newDate = new Date(date)
  const Y = newDate.getFullYear()
  const M = (newDate.getMonth() + 1 < 10 ? '0' + (newDate.getMonth() + 1) : newDate.getMonth() + 1)
  const D = newDate.getDate() < 10 ? ('0' + newDate.getDate()) : newDate.getDate()
  const H = (newDate.getHours() < 10 ? ('0' + newDate.getHours()) : newDate.getHours())
  const Mm = (newDate.getMinutes() < 10 ? ('0' + newDate.getMinutes()) : newDate.getMinutes())
  const S = newDate.getSeconds() < 10 ? ('0' + newDate.getSeconds()) : newDate.getSeconds()
  const strType = {
    ym: Y + '-' + M,
    d: Y + '-' + M + '-' + D,
    md: M + '-' + D,
    t: H + ':' + Mm,
    dt: M + '-' + D + ' ' + H + ':' + Mm
  }
  if (date) {
    return strType[Str] || Y + '-' + M + '-' + D + ' ' + H + ':' + Mm + ':' + S
  } else {
    return 'YY-MM-DD DD-HH--MM'
  }
}
