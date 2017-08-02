<template>
 <div class="container-fluid" >
    
    <!-- <div class="row">
    	<bank-account-form></bank-account-form>
    </div> -->
    <div class="row funds-table">
    	<bank-account-table></bank-account-table>
    </div>
</div>
</template>
<script>
//import form from './form'
import table from './table'
  export default{
		components :{
			//'bank-account-form' : form,
			'bank-account-table' : table
		}
	}
</script>
