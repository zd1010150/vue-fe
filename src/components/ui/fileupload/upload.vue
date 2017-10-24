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
						@input-file="inputFile" 
						ref="upload">
			<slot></slot>
		</file-upload>
       <div class="chp-progress-mask loading-overlay " :class=" {'loading-overlay-showing':active }" ref="progressMask">
       		<div class="mask-container">
	       		<div class="upload-files">
					<mu-circular-progress :size="60" :color="'#0088cc'" class="upload-icon"/>
					<h5 class="upload-text pt-lg ">{{ $t("ui.upload.loading") }}</h5>
				</div>
            </div>
       </div>
	</div>
</template>
<script>
	import FileUpload from 'vue-upload-component'
	import { HTTP_STATUS_CODE } from 'src/config/app.config.js'
	export default {
		data(){
			return {
				progressValue:[],//{progress,response}
	 			active:false,
	 			isAllSuccess:false,
	 			isAllDone:false,
	 			files:[],
	 			progressMaskEl:null,
	 			responseErrors:[],
	 			uploadResult:[]
			}
		},
		watch:{
			active:function(val,oldVal){
				if(val !== oldVal && val){
					this.showProgressMask()
				}else if(val !== oldVal && !val){
					this.hideProgressMask()
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
		      default: function(){
		      	return {
	 				'Accept': 'application/json',
	 				'Authorization': 'Bearer '+ this.$store.state.token
	 			}
		      },
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
			parseServerResponse(response){//解析服务器返回的结果,只处理了XMLHttpRequest的结果,还有可能iframe的情况，低版本的浏览器不兼容
				let result = {}
				try{
					if(!response){
						throw Error('')
					}
					response = JSON.parse(response)
					return {
						success: response.status_code == HTTP_STATUS_CODE.OK,
						data: response.data,
						messege: response.message
					}
				}catch(ex){
					console.log("Upload XMLHttprequest parse error")
					return {
						success: false,
						messege: "parse json error",
						data: {}
					}

				}
			},
			inputFile:function(newFile,oldFile){
				console.log(this.$refs.upload.files.length,newFile,oldFile,"===",this.$refs.upload.uploaded,this.files.length)
				if (newFile && !oldFile) {
		        // 添加文件
				// 自动上传
		        	if (!this.$refs.upload.active) {
		          		this.$refs.upload.active = true
		          		this.responseErrors = []
		          		this.uploadResult= []
		          		this.active = true
		          		this.isAllSuccess = true
		        	}
		      	}

		      	if (newFile && oldFile) {
		        // 更新文件

		        // 开始上传
			        if (newFile.active !== oldFile.active) {
			          console.log('Start upload', newFile.active, newFile.progress,newFile)
			        }

			        // 上传进度
			        if (newFile.progress !== oldFile.progress) {
			          console.log('progress', newFile.progress, newFile)
			        }

			        // 上传错误
			        if (newFile.error !== oldFile.error) {
			          console.log('error', newFile.error, newFile)
			          this.isAllSuccess = this.isAllSuccess && false
			          this.responseErrors.push(newFile.error)
			          if(this.$refs.upload.uploaded){
			          	this.emitInput()
			          }
			        }

			        // 上传成功
			        if (newFile.success !== oldFile.success) {
			          console.log('success', newFile.success,newFile.progress, newFile)
			          let { success,data,messege } = this.parseServerResponse(newFile.xhr ? newFile.xhr.response : null)
			          this.isAllSuccess = this.isAllSuccess && success
			          if(success){
						this.uploadResult.push({ success,data })
			          }else{
			          	this.responseErrors.push(messege)
			          }
			          if(this.$refs.upload.uploaded){
			          	this.emitInput()
			          }
			        }
		        }
			},
			emitInput(){
				this.active = false
	          	this.$emit('input',this.uploadResult,this.isAllSuccess,this.responseErrors)
		    },
			showProgressMask:function(){
				this.progressMaskEl = this.$refs.progressMask
				document.body.appendChild(this.progressMaskEl)
				
			},
			hideProgressMask:function(){
				let self = this;
				setTimeout(()=>{
					if(self.progressMaskEl && self.$refs.upload && document.body.contains( self.progressMaskEl ) ){
						self.$refs.upload.clear()//必须要清空控件的文件
						document.body.removeChild(self.progressMaskEl);	
					}
					
				},500);
			}
		},
		mounted(){
			
		}
	}
</script>
<style lang="less">
.upload-files{
	width:300px;
	text-align: center;
	.upload-icon,.upload-text{
		vertical-align: middle;
	}
}
.upload-img-thumb{
	width:80px;
	height:80px;
}

</style>