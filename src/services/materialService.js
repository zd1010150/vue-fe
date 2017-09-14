
import { fetchData }  from  './network/getData'

export default {
  async getMarketingImage(){
	   return fetchData("GET","/marketing-materials/image")
  },
  async getMarketingVideo(){
    return fetchData("GET","/marketing-materials/video")
  }
}
