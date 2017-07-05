
import dark from '../components/ui/muse-ui/theme-dark.less'
import light from '../components/ui/muse-ui/theme-light.less'
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
  $html.classList.toggle("dark",theme == "dark");
  $html.classList.toggle( "sidebar-light",theme != "dark");
  const styleEl = getThemeStyle()
  styleEl.innerHTML = themes[theme] || ''
}
