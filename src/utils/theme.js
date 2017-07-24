import "classlist-polyfill"
import dark from '!!raw-loader!less-loader!components/ui/museUI/themeDark.less'
import light from '!!raw-loader!less-loader!components/ui/museUI/themeLight.less'



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
  console.log(theme,"theme+++");
  let $html = document.querySelector("html");
  $html.classList.toggle("dark",theme == "dark");
  $html.classList.toggle( "sidebar-light",theme != "dark");
  const styleEl = getThemeStyle()
  styleEl.innerHTML = themes[theme] || ''
}
