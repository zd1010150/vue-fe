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
	       		<ul class="upload-files">
					<li v-for="v in progressValue">
					    <span>{{v.progress}}%</span>
						<mu-linear-progress mode="determinate" :value="v.progress"/>
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
			inputFile:function(newFile,oldFile){
				// // 添加文件// 自动上传
		  //       if (!this.$refs.upload.active) {
		  //         	this.$refs.upload.active = true
	   //      	}
		  //     	files = _.isArray(files) ? files : [files]
				// if(files.length < 1){ 
				// 	this.active = false 
				// 	return
				// }
				// this.$refs.upload.active = true
				// let errors = [],
				// 	isAllSuccess = true
				// this.progressValue = files.map((file)=>{
				// 	isAllSuccess = isAllSuccess && file.success && (!file.active)
				// 	file.error ? errors.push(file.error) :""
				// 	console.log("files,upload---",JSON.stringify(file),JSON.stringify(file.xhr))
				
				// 	return { progress : Number(file.progress),response:file.response}
				// })
				// console.log("files,upload---end:::::",this.progressValue,isAllSuccess)
				
				// if(isAllSuccess || errors.length > 0){
				// 	this.active = false
				// 	this.$nextTick(()=>{
				// 		this.$emit('input',this.progressValue,isAllSuccess ? true : false,errors) //返回上传文件的结果
				// 	})
					
				// }else{
				// 	this.active = true
				// }
		if (newFile && !oldFile) {
        // 添加文件

        // 自动上传
        if (!this.$refs.upload.active) {
          this.$refs.upload.active = true
        }
      }

      if (newFile && oldFile) {
        // 更新文件

        // 开始上传
        if (newFile.active !== oldFile.active) {
          console.log('Start upload', newFile.active, newFile)

          // 限定最小字节
          if (newFile.size >= 0 && newFile.size < 100 * 1024) {
            newFile = this.$refs.upload.update(newFile, {error: 'size'})
          }
        }

        // 上传进度
        if (newFile.progress !== oldFile.progress) {
          console.log('progress', newFile.progress, newFile)
        }

        // 上传错误
        if (newFile.error !== oldFile.error) {
          console.log('error', newFile.error, newFile)
        }

        // 上传成功
        if (newFile.success !== oldFile.success) {
          console.log('success', newFile.success, newFile)
        }
      }

      if (!newFile && oldFile) {
        // 删除文件

        // 自动删除 服务器上的文件
        if (oldFile.success && oldFile.response.id) {
          // $.ajax({  
          //   type: 'DELETE',  
          //   url: '/file/delete?id=' + oldFile.response.id,
          // });
        }
      }
			},
			showProgressMask:function(){
				this.progressMaskEl = this.$refs.progressMask;
				document.body.appendChild(this.progressMaskEl);
				
			},
			hideProgressMask:function(){
				let self = this;
				setTimeout(()=>{
					if(self.progressMaskEl && self.$refs.upload && document.body.contains( self.progressMaskEl ) ){
						self.$refs.upload.clear();//必须要清空控件的文件
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