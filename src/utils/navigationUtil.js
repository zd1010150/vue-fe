const navLanguage = (function () {
  let language = navigator.language || navigator.browserLanguage
  return language.indexOf('zh') > -1 ? 'zh' : 'en'
})()

export { navLanguage }
