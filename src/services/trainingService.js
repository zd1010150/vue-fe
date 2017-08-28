/**
 * MT4信息
 */
import   { fetchData }  from  './network/getData'

export default{
  
  async getOnlineTraining(language){
    return fetchData('GET','/training/courses',{language})
  },
  
  async registerOnlineTraining(course_id){
  	return fetchData('GET','/courses/register/'+course_id)
  },
  async cancelOnlineTraining(course_id){
  	return fetchData('GET','/courses/register/'+course_id)
  }

}
