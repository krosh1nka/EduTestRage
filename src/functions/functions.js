import Vue from 'vue'
Vue.prototype.$formatMoneyToPlayerMenu = (a) => {
  if (Number.isNaN(a)) return a
  return a.toString().split('').reverse().reduce(function (a, b, c) {
    return b == '-' ? a : b + (c && !(c % 3) ? ' ' : '') + a
  }, '')
}
Vue.prototype.$formatCurrency = (a) => {
  if (Number.isNaN(a)) return a
  return a.toString().split('').reverse().reduce(function (a, b, c) {
    return b == '-' ? a : b + (c && !(c % 3) ? '.' : '') + a
  }, '')
}
Vue.prototype.$GetStringForTime = (time) => {
  if (Number.isNaN(time)) return time
  if (time <= 0) {
    return '0 мин.'
  }
  const offminutes = time
  let hours = 0
  let minutes = offminutes
  if (offminutes >= 60) {
    hours = parseInt(offminutes / 60)
    minutes = parseInt(offminutes - (hours * 60))
  }
  const minutString = (minutes < 10) ? `0${minutes}` : minutes
  let text = ''
  if (hours > 0) {
    text += `${hours} ч. `
  }
  return text + `${minutString} мин.`
}
Vue.prototype.$GetTimeOnDateTime = (dateTime) => {
  const date = new Date(dateTime)
  const day = (date.getDate() < 10 ? '0' : '') + date.getDate()
  const month = (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1)
  const hours = (date.getHours() < 10 ? '0' : '') + date.getHours()
  const minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
  const seconds = (date.getSeconds() < 10 ? '0' : '') + date.getSeconds()
  return `${day}.${month}.${date.getFullYear()} ${hours}:${minutes}:${seconds}`
}
Vue.prototype.$PushNotify = (type, text, sec = 2000) => window.eventbus.$emit('HUD.notify.push.eventbus', type, text, sec)
Vue.prototype.$getRandom = (min, max) => {
  return parseInt(Math.random() * (max - min) + min)
}
Vue.prototype.$getRandomFloat = (min, max) => {
  return parseFloat((Math.random() * (max - min) + min).toFixed(1))
}
Vue.prototype.$GetTimeAndAddDays = (time, days) => {
  const date = new Date(time)
  date.setDate(date.getDate() + days)
  return date
}
Vue.prototype.$AuctionGetImage = (item) => {
  switch (item.Type) {
    case 'APART':
    case 'HOUSE':
      return `http://146.59.126.149/House/${item.ID}.png`
    case 'VEHICLE':
      return `http://146.59.126.149/garage/${item.Model}.png`
    case 'BIZ':
      return `http://146.59.126.149/bussines/${item.ID}.png`
  }
}
Vue.prototype.$AuctionGetNameOnType = (type) => {
  switch (type) {
    case 'HOUSE':
    case 'APART':
      return 'Недвижимость'
    case 'VEHICLE':
      return 'Транспорт'
    case 'BIZ':
      return 'Бизнес'
  }
}
Vue.prototype.$GetNumberToString = (number) => number < 10 ? `0${number}` : `${number}`
Vue.prototype.$OpenDonateCiteCrystal = () => mp.events.call('PlayerMenu:OpenCrystalDonateCite:Client')
Vue.prototype.$formatMinutesToString = (minutes) => {
  const minute = 1
  const hour = 60 * minute
  const day = 24 * hour
  const week = 7 * day
  const month = 30 * day
  let result = ''
  const months = Math.floor(minutes / month)
  if (months > 0) {
    result += `${months} мес `
    minutes %= month
  }
  const weeks = Math.floor(minutes / week)
  if (weeks > 0) {
    result += `${weeks} нед `
    minutes %= week
  }
  const days = Math.floor(minutes / day)
  if (days > 0) {
    result += `${days} дн `
    minutes %= day
  }
  const hours = Math.floor(minutes / hour)
  if (hours > 0) {
    result += `${hours} ч `
    minutes %= hour
  }
  const remainingMinutes = Math.floor(minutes / minute)
  if (remainingMinutes > 0) {
    result += `${remainingMinutes} мин.`
  }
  return result.trim()
}
