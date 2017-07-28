<template>
 <div class="container-fluid" >
    <div class="row">
    	<deposite-funds-methods @chosePaymentMethod="methodChange"></deposite-funds-methods>
    </div>
    <div class="row">
    	<deposite-funds-form :method="method" :methodCode="methodCode" ></deposite-funds-form>
    </div>
    <div class="row">
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
				method:"unionPay",
        methodCode:""
      }
		},
		components :{
			'deposite-funds-form' : form,
			'deposite-funds-methods' : methods,
			'deposite-funds-table' : table
		},
    methods:{
      methodChange:function(method,methodCode){
      	console.log(method+" is selected");
      	this.method = method;
      	this.methodCode = methodCode;
      }
    }
	}
</script>
