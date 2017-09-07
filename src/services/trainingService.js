/**
 * MT4信息
 */
import   { fetchData }  from  './network/getData'

export default{
  
  async getOnlineTraining(language){
    return fetchData('GET','/training/courses',{language})
  },
  async registerOnlineTraining(course_id){
  	return fetchData('GET','/training/courses/register/'+course_id)
  },
  async cancelOnlineTraining(course_id){
  	return fetchData('GET','/training/courses/cancel/'+course_id)
  },
  async getVideo(language){
    return fetchData('GET','/training/videos',{language})
  },
  async getCategoryVideo(language,category){
    return fetchData('GET','/training/videos',{language,category})
  },
  async getSingleVideo(id){
    return fetchData('GET','/training/videos/display/'+id)
  },
  async getBook(language){
    return fetchData('GET','/training/books/',{language})
  },
  async getCategoryBook(language,category){
    return fetchData('GET','/training/books/',{language,category})
  },
  



}
