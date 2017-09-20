<template>
	<mu-dialog :open="previewOpen" scrollable @close='close' :dialogClass="'image-preview-dialog'">
		<div class="content">
    		<mu-icon-button  @click='close' class="close-btn text-dark">
          		<i class="fa fa-times"></i>
      		</mu-icon-button>
    		<figure>
    			<img class="mfp-img img-responsive" alt="undefined" :src="src" style="max-height: 876px;">
    			<figcaption>{{ srcTitle }}</figcaption>
    		</figure>
        </div>
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
			open : Boolean,
			srcTitle: ""
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
<style lang="less">
  .mu-dialog.image-preview-dialog{
  	background-color: transparent;
  	box-shadow: none;
  	width:auto;
  	.content{
  		position: relative;
  		figure{
  			width:100%;
  			height:100%;
  			z-index: 1046;
  			box-sizing: border-box;
  			margin:0px;
  			img{
  				padding:30px 0px;
  			}
  		}
  	}
  	.close-btn{
  		background-color: transparent;
  		box-shadow: none;
  		display: block;
		width:100%;
		position: absolute;
		right:0px;
		text-align: right;
		height:30px;
		line-height: 30px;
		z-index: 1047;
  	}
  }
</style>