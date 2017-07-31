<template>
 <div class="container-fluid" >
    
    <div class="row">
    	<withdrawal-forms></withdrawal-forms>
    </div>
    <div class="row funds-table">
    	<withdrawal-table ></withdrawal-table>
    </div>
</div>
</template>
<script>
	import form from './forms'
	import table from './table'
  export default{
		data(){
			return {
				method:"unionPay",
        methodCode:""
      }
		},
		components :{
			'withdrawal-forms' : form,
			'withdrawal-table' : table
		}
	}
</script>
