<template>
	<div>
		<file-upload :name="name"
						:drop="drop"
						:dropDirectory="dropDirectory"
						:extensions="extensions"
						:post-action="postAction"
						:put-action="putAction"
						:accept="accept"
						:multiple="multiple"
						:directory="directory"
						:size="size"
						:timeout="timeout"
						:headers="headers"
						:data="data"
						:thread="thread"
						:filter="filter"
						:value="value"
						:v-model="files"
						@input="input"
						@input-file="inputFile" 
						ref="upload">
			<slot></slot>
		</file-upload>
       <div class="chp-progress-mask loading-overlay " :class=" {'loading-overlay-showing':active }" ref="progressMask">
       		<div class="mask-container">
	       		<ul class="upload-files">
					<li v-for="v in progressValue">
					    <span>{{v.progress}}%</span>
						<mu-linear-progress mode="determinate" :value="v.progress"/>
						<!-- <img  v-if="v.response && v.response.data && v.response.data.url" :src="v.response.data.url" class="upload-img-thumb img-thumbnail"/> -->

					</li>
				</ul>
            </div>
       </div>
	</div>
</template>
<script>
	import FileUpload from 'vue-upload-component'
	export default {
		data(){
			return {
				innerHeaders:{
	 				'Accept': 'application/json',
	 				'Authorization': 'Bearer '+ this.$store.state.token
	 			},
	 			progressValue:[],//{progress,response}
	 			active:false,
	 			isAllSuccess:false,
	 			isAllDone:false,
	 			files:[],
	 			progressMaskEl:null
			}
		},
		watch:{
			active:function(val,oldVal){
				if(val !== oldVal && val){
					this.showProgressMask();
				}else if(val !== oldVal && !val){
					this.hideProgressMask();
				}
			}
		},
		computed:{
			classes() {
		        return {
		          'chp-active': this.active
		        };
		      }
		},
		props:{
			name: {
		      type: String,
		      required:true // required
		    },
		    drop: {
		      default: false,
		    },

		    dropDirectory: {
		      default: true,
		    },

		    extensions: {
		      default: Array,
		    },

		    postAction: { //必传
		      type: String,
		    },

		    putAction: {
		      type: String,
		    },

		    accept: {
		      type: String,
		    },

		    multiple: {
		      type: Boolean,
		    },

		    directory: {
		      type: Boolean,
		    },

		    timeout: {
		      type: Number,
		      default: 0,
		    },

		    size: {
		      type: Number,
		    },
		    headers: {
		      type: Object,
		      default: this.innerHeaders,
		    },

		    filter: {
		      type: Function,
		      default(file) {
		        return file
		      }
		  	},
		    data: {
		      type: Object,
		      default: Object,
		    },

		    value: {
		      type: Array,
		      default: Array,
		    },

		    thread: {
		      type: Number,
		      default: 1,
		    },
		},
		components:{
			'file-upload':FileUpload
		},

		methods:{
			input:function(files){
				console.log("=====",this.active,JSON.stringify(files));
				if(files.length < 1){ return}
				this.$refs.upload.active = true;
				let errors = [],
					isAllSuccess = true;
				this.progressValue = files.map((file)=>{
					isAllSuccess = isAllSuccess && file.success && (!file.active);
					file.error ? errors.push(file.error) :"";
					return { progress :Number(file.progress),response:file.response}
				});
				//console.log("=====",JSON.stringify(files));
				if(isAllSuccess || errors.length > 0){
					this.active = false;
					console.log("it is returened:",this.active);
					this.$nextTick(()=>{
						this.$emit('input',this.progressValue,isAllSuccess ? true : false,errors); //返回上传文件的结果
					});
					
				}else{
					this.active = true;
				}
			},
			inputFile:function(file,old){
				this.$emit('input-file',file,old);
			},
			showProgressMask:function(){
				
				this.$nextTick(()=>{
					this.progressMaskEl = this.$refs.progressMask;
					document.body.appendChild(this.progressMaskEl);
				});
			},
			hideProgressMask:function(){
				if(this.progressMaskEl){
					let self = this;
					setTimeout(()=>{
						self.$refs.upload.clear();//必须要清空控件的文件
						document.body.removeChild(self.progressMaskEl);
					},2000);
				   
				}
				
			}
		},
		mounted(){
			console.log("*****",this.innerHeaders.Authorization);
		}
	}
</script>
<style lang="less">
.upload-files{
	list-style: none;
	width:300px;
	li{
		padding:20px;
	}
}
	.upload-img-thumb{
		width:80px;
		height:80px;
	}
</style>