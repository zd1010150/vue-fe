<template>
 <div class="container-fluid" >
    <chp-expand-transition>
        <div class="row" v-if="showForm">
        	<bank-account-form @close="close"></bank-account-form>
        </div> 
    </chp-expand-transition>
    <div class="row funds-table">
    	<bank-account-table @show = "show"></bank-account-table>
    </div>
</div>
</template>
<script>
import form from './form'
import table from './table'

  export default{
        data(){
            return {
                showForm : false
            }
        },
		components :{
			'bank-account-form' : form,
			'bank-account-table' : table
		},
        methods:{
            show (){
                this.showForm = true;
            },
            close(){
                this.showForm = false;
            }
        }
	}
</script>
