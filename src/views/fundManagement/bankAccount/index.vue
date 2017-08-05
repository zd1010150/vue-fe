<template>
 <div class="container-fluid" >
    <chp-expand-transition>
        <div class="row" v-if="showForm">
        	<bank-account-form @close="close" :editId="editId"></bank-account-form>
        </div> 
    </chp-expand-transition>
    <div class="row funds-table">
    	<bank-account-table @add = "add" @edit="edit"></bank-account-table>
    </div>
</div>
</template>
<script>
import form from './form'
import table from './table'

  export default{
        data(){
            return {
                editId:null,
                showForm : false
            }
        },
		components :{
			'bank-account-form' : form,
			'bank-account-table' : table
		},
        methods:{
            add (){
                this.showForm = true;
                this.editId="";
            },
            close(){
                this.showForm = false;
            },
            edit(id){
                this.showForm = true;
                this.editId = id;
            }
        }
	}
</script>
