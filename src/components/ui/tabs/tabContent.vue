<template>
  
    <div class="tab-pane" :class="classes">
     
      <slot></slot>
    
    </div>
  
</template>
<script>
  export default{
      name:"chp-tab-content",
      data(){
        return {
          isShow:false
        }
      },
      computed:{
        classes (){
          return {
            'active' : this.isActive,
            //'slideInRight' : this.isActive
          }
        },
        isActive () {

          return (!_.isNull(this.id)) && this.$parent.value === this.id
        }
      },
      props: {
        href: {
          type: String
        },
        id: {}
      },
      watch:{
        isActive : function(val,oldVal){
          if(val == true && oldVal==false){
            this.isShow = true
          }else if(val == false && oldVal == true){
            this.isShow = false
          }
        }
      }
  }
</script>
