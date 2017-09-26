<template>
<div>
	<h6>单文件上传</h6>
		<chp-file-upload 
			name="document" 
			:post-action="postAction" 
			@input="inputFunction" 
			:multiple="true"
			ref="upload"> 
		file upload
		</chp-file-upload>
	<h6>多文件拖动上传</h6>
	<chp-file-upload 
		name="document" 
		drop=".dropFileArea" 
		:dropDirectory="false" 
		:multiple="true"
		:post-action="dropPostAction" 
		@input="dropInputFunction" 
		ref="dropUploads"> 	
	<mu-text-field hintText="拖动" multiLine :rows="7" :rowsMax="6" class="form-control dropFileArea" :disabled="true"/>
	</chp-file-upload> 
	 
</div>
	
</template>
<script>
import { UPLOAD_DOCUMENT_URL } from "../../config/url.config.js"
import { getStore } from "utils/storage.js"
	 export default{
	 	data(){
	 		return {
	 			files : [],
	 			postAction : UPLOAD_DOCUMENT_URL+"/bill",
	 			dropPostAction : UPLOAD_DOCUMENT_URL+"/bill",
	 			headers:{
	 				'Accept': 'application/json',
	 				'Authorization': 'Bearer '+ this.$store.state.token
	 			}
	 		}
	 	},
	 	methods:{
	 		inputFunction(files,isAllsuccess,error){
	 			console.log("input file:",JSON.stringify(files),isAllsuccess,JSON.stringify(error));
	 			//this.$refs.upload.upload(this.files);
	 			this.$refs.upload.active = true;
	 		},
	 		dropInputFunction(response){
	 			this.$refs.dropUploads.active = true;
	 			console.log("input files drop:",JSON.stringify(response));
	 		}
	 	}
	 }
</script>