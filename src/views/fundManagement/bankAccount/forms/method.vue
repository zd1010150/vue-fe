<template lang="html">
	<div class="form-group">
      <label class="control-label col-md-3">Method</label>
      <div class="col-md-6" >
        <chp-select v-model="method" @input="methodChange">
			<template v-for="m in methods">
				<mu-menu-item :value="m.method" :title="m.title" />
			</template>
		</chp-select>
      </div>
	</div>
</template>

<script>
export default {
   data(){
   	return {
   		method :"CUP",
	   	originMethods :[{
	   		title:this.$t('bankcard.methodType.cup'),
	   		type:["en","zh"],
	   		method:"CUP"
	   	},{
	   		title:this.$t('bankcard.methodType.doku'),
	   		type:["en"],
	   		method:"CUP"
	   	},{
	   		title:this.$t('bankcard.methodType.fasa'),
	   		type:["en"],
	   		method:"FASA"
	   	}],
   		methods:[]
   	}
   },
   watch:{
   	"$store.state.language":function(val,oldVal){
   		this.methods = this.originMethods.filter((method)=>{
   			return method.type.indexOf(val) > -1
   		});
   	}
   },
   methods:{
   	methodChange(){
   		this.$emit("methodChange",this.method);
   	}
   },
   mounted(){
   	this.$emit("methodChange",this.method);
   }
  }
</script>

