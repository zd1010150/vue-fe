<template>
	<mu-dialog :open="previewOpen" scrollable @close='close'>
		<mu-icon-button  @click='close' class="pull-right">
          <i class="fa fa-times"></i>
      	</mu-icon-button>
        <img :src="src" class="img-responsive">
      </mu-dialog> 
</template>
<script>
	
	export default{
		data(){
			return {
				previewOpen:this.open
			}
		},
		props:{
			src : String,
			open : Boolean
		},
		watch:{
			open : function(val){
				this.previewOpen = val;
			}
		},
		methods:{
			close(){
				this.previewOpen = false;
				this.$emit("close");
			}
		}

	}
</script>