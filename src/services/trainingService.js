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



}
