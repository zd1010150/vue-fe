<template>
 <div class="col-lg-12">
	<deposite-funds-methods @chosePaymentMethod="methodChange"></deposite-funds-methods>
	<deposite-funds-form ></deposite-funds-form>
	<deposite-funds-table></deposite-funds-table>
 </div>
</template>
<script>
	import form from './form'
	import methods from './methods'
	import table from './table'
	export default{
		data(){
			return {
				method:"unionPay"
			}
		},
		components :{
			'deposite-funds-form' : form,
			'deposite-funds-methods' : methods,
			'deposite-funds-table' : table
		},
    methods:{
      methodChange:function(method){
      	console.log(method+" is selected");
      }
    }
	}
</script>
