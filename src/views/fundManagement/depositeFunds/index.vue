<template>
 <div class="container-fluid" >
    <div class="row">
    	<deposite-funds-methods @chosePaymentMethod="methodChange"></deposite-funds-methods>
    </div>
    <div class="row">
    	<deposite-funds-form :methodCode="methodCode" :methodName = "methodName"></deposite-funds-form>
    </div>
    <div class="row funds-table">
    	<deposite-funds-table ></deposite-funds-table>
    </div>
</div>
</template>
<script>
	import form from './form'
	import methods from './methods'
	import table from './table'
  export default{
		data(){
			return {
				methodCode:"",
        methodName:""
      }
		},
		components :{
			'deposite-funds-form' : form,
			'deposite-funds-methods' : methods,
			'deposite-funds-table' : table
		},
    methods:{
      methodChange:function(methodCode,name){
      	console.log(methodCode+" is selected")
      	
      	this.methodCode = methodCode
        this.methodName = name
      }
    }
	}
</script>
