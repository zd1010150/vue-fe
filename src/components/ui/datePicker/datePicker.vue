<template>

 <div class="date-picker-wrapper form-control">
    <mu-date-picker :hintText="hintText" class="date-picker" :fullWidth="fullWidth" :minDate="minDate" @input="input" @change = "change"/>
    <span class="icon icon-lg icon-calendar">
      <i class="fa fa-calendar"></i>
    </span>
 </div>
</template>
<script>
 export default{
     props :{
       fullWidth:{
           type: Boolean,
            default : false
       },
       hintText:{
           type: String
       },
       value:{
        type:String
       },
       minDate:{

       }
     },
     methods:{
      input(value){
        this.$emit("input",value);
      },
      change(value){
        this.$emit("change",value);
      }
     }
 }
</script>
<style lang="less">
  .date-picker-wrapper{
    display: inline-block;
    position:relative;
    height:34px;
    padding:0px 12px;
    .icon-calendar{
      display: inline-block;
      position:absolute;
      right:10px;
      bottom:5px;
      z-index:1;
      cursor: pointer;
    }
    .date-picker{
      position:absolute;
      right:0px;
      left:0px;
      z-index:2;
    }

    .mu-text-field{
      height:32px;
      min-height:18px;
      margin:0px;
      .mu-text-field-input{

        cursor: pointer;
      }
    }

  }
  .mu-date-picker-dialog{
    .mu-calendar-toolbar-title{
      line-height: 24px;
    }
  }
</style>
