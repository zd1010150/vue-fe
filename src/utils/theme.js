import light from 'components/ui/muse-ui/theme-light.less'
import dark from 'components/ui/muse-ui/theme-dark.less'

let themes = {
    light, dark
  },
  getThemeStyle = () => {
    const themeId = 'muse-theme'
    let styleEl = document.getElementById(themeId)
    if (styleEl) return styleEl
    styleEl = document.createElement('style')
    styleEl.id = themeId
    document.body.appendChild(styleEl)
    return styleEl
  };
export default (theme) => {
  let $html = document.querySelector("html");
  $html.classList.toggle("dark", theme == "dark");
  const styleEl = getThemeStyle()
  styleEl.innerHTML = themes[theme] || ''
}
