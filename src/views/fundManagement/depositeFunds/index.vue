<template>
 <div class="col-lg-12">
	<deposite-funds-methods></deposite-funds-methods>
	<deposite-funds-form></deposite-funds-form>
	<deposite-funds-table></deposite-funds-table>
 </div>
</template>
<script>
	import form from './form'
	import methods from './methods'
	import table from './table'
	export default{
		components :{
			'deposite-funds-form' : form,
			'deposite-funds-methods' : methods,
			'deposite-funds-table' : table
		}
	}
</script>