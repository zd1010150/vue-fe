/**
 * 银行卡
 */
import   { fetchData }  from  './network/getData'

export default{
  
  async getBankCard(){
    return fetchData('GET',"/bank-card")
  },
  async deleteBankCard(id){
  	return fetchData('DELETE',"/bank-card",{id:id})
  },
  async addBankCard({province,city,address,account,swift,bank_name,method,document}){
  	return fetchData('POST',"/bank-card",{province,city,address,account,swift,bank_name,method,document})
  },
  async getBankCardById(id){
  	return fetchData('GET',"/bank-card/"+id)
  },
  async updateBankCard(id,{province,city,address,account,swift,bank_name,method,document}){
  	return fetchData('PUT',"/bank-card/"+id,{province,city,address,account,swift,bank_name,method,document})
  }
  
}
