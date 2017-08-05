<template>
  
    <div class="tab-pane active">
     
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
<style lang="less">
.tab-pane{
      // transition: opacity .4s cubic-bezier(.25, .8, .25, 1);
      // opacity: 0;
      // display: block;
      // &.active{
      //   opacity: 1;
      // }
}

</style>