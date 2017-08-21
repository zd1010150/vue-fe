import   { fetchData }  from  './network/getData'

export default{
  /**
   * 分页带条件查询
   */
  async pagingQuery({url,pageIndex="1",pageSize="5",sort="",queryParameter={}}){
    console.log(queryParameter);
    return fetchData('GET',url,_.assign({
      page:pageIndex,
      pageSize:pageSize,
      sort:sort
    },queryParameter))
  },
  async delete(url,id){
    return fetchData('DELETE',url+"/"+id)
  },
  async update(url,obj){
    return fetchData('PUT',url+"/"+id,obj)
  },
  async add(url,obj){
    return fetchData('POST',url,obj)
  }
}
