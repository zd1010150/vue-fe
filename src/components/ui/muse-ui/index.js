import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import './customurise.less' // 使用 carbon 主题

export default function install(Vue){
  Vue.use(MuseUI);
}
