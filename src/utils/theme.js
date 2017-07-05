
import dark from '!!raw-loader!less-loader!components/ui/muse-ui/theme-dark.less'
import light from '!!raw-loader!less-loader!components/ui/muse-ui/theme-light.less'

/*import light from 'raw-loader!muse-ui/dist/theme-default.css'
import dark from 'raw-loader!muse-ui/dist/theme-dark.css'*/

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
console.log("themes",JSON.stringify(themes.light),JSON.stringify(themes.dark));
export default (theme) => {
  let $html = document.querySelector("html");
  $html.classList.toggle("dark",theme == "dark");
  $html.classList.toggle( "sidebar-light",theme != "dark");
  const styleEl = getThemeStyle()
  styleEl.innerHTML = themes[theme] || ''
}
