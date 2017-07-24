<template>
	<chp-file-upload name="image_bill" v-model="files" :headers="headers" :post-action="postAction" @input="inputFunction" ref="upload">Upload file
	</chp-file-upload>
</template>
<script>
import { UPLOAD_BILL_URL } from "../../config/url.config.js"
import { getStore } from "utils/storage.js"
	 export default{
	 	data(){
	 		return {
	 			files : [],
	 			postAction : UPLOAD_BILL_URL,
	 			headers:{
	 				'Accept': 'application/json',
	 				'Authorization': 'Bearer '+ this.$store.state.token
	 			}
	 		}
	 	},
	 	methods:{
	 		inputFunction(files){
	 			console.log(JSON.stringify(files),this.$refs.upload.active);
	 			//this.$refs.upload.upload(this.files);
	 			this.$refs.upload.active = true;
	 		}
	 	}
	 }
</script>