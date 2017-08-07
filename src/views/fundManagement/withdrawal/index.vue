<template>
 <div class="container-fluid" >
    
    <div class="row">
    	<withdrawal-forms ></withdrawal-forms>
    </div>
    <div class="row funds-table">
    	<withdrawal-table ref="table"></withdrawal-table>
    </div>
</div>
</template>
<script>
	import form from './forms'
	import table from './table'
  export default{
		components :{
			'withdrawal-forms' : form,
			'withdrawal-table' : table
		}
	}
</script>
