<template>
  <chp-panel>
    <template slot="title">Toolbar</template>
    <template slot="subtitle"></template>
    <div class="form-horizontal form-hordered" slot="body">
      <h4>Toolbar</h4>
      <chp-toolbar>
        <div class="chp-toolbar-container row">
          <div class="col-md-2">
            <chp-select v-model="pageSize" >
              <mu-menu-item :value="10" title="10"/>
              <mu-menu-item :value="20" title="20"/>
              <mu-menu-item :value="30" title="30"/>
              <mu-menu-item :value="40" title="40"/>
            </chp-select>
          </div>

         <div class="col-md-10 operaters">

           <mu-icon-button >
             <i class="fa fa-search" aria-hidden="true"></i>
           </mu-icon-button>

           <mu-icon-button >
             <i class="fa fa-filter" aria-hidden="true"></i>
           </mu-icon-button>
         </div>


        </div>



      </chp-toolbar>

      <br/>
    </div>

  </chp-panel>

</template>
<script>

  export default{
    props:{
        pageSize :{
            type:Number,
            default : 10
        }
    },
    watch: {
        pageSize(val){
            this.$emit("pageSizeChanged",val);
        }
    }
  }
</script>
<style class="less">
  button.operater{
    width:30px;
  }
  .operaters{
    text-align: right;
  }
</style>
