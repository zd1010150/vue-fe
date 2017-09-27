
import { fetchData }  from  './network/getData'

export default {
  async getMarketingImage(language){
	   return fetchData("GET","/marketing-materials/image/"+language)
  },
  async getMarketingVideo(language){
    return fetchData("GET","/marketing-materials/video/"+language)
  }
}
