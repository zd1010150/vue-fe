<template lang="html">
  <chp-main-layout>
    <div class="row" slot="content-body">
      <div class="col-lg-12">


      <h2>Text Field</h2>
      <form class="form-horizontal form-bordered">
        <h4>input</h4>
        <div class="form-group">
          <label class="col-md-3 control-label">email:</label>
          <div class="col-md-6">
            <mu-text-field hintText="text email" class="form-control" name="email" type="email"/>
          </div>
        </div>
        <h4>large input</h4>
        <div class="form-group">
          <label class="col-md-3 control-label">email:</label>
          <div class="col-md-6">
            <mu-text-field hintText="text email" class="form-control input-lg" name="email" type="email"/>
          </div>
        </div>
        <h4>icon input</h4>
        <div class="form-group">
          <label class="control-label col-md-3">Email</label>
          <div class="col-md-6">
            <div class="input-group input-group-icon">
              <mu-text-field hintText="text email" class="form-control" name="email" type="email"/>
              <span class="input-group-addon">
                <span class="icon">
                  <i class="fa fa-user"></i>
                </span>
							</span>
            </div>
          </div>
        </div>
        <h4>large icon input</h4>
        <div class="form-group">
          <label class="control-label col-md-3">Email</label>
          <div class="col-md-6">
            <div class="input-group input-group-icon">
              <mu-text-field hintText="text email" class="form-control input-lg" name="email" type="email"/>
              <span class="input-group-addon">
                <span class="icon icon-lg">
                  <i class="fa fa-user"></i>
                </span>
							</span>
            </div>
          </div>
        </div>
      </form>
      <h2>Select </h2>


        <form class="form-horizontal form-bordered">
          <h4>dropdown select</h4>
          <div class="form-group">
            <div class="col-md-12">
              <chp-select v-model="game2">
                <mu-menu-item value="1" title="阴阳师"/>
                <mu-menu-item value="2" title="影之刃"/>
                <mu-menu-item value="3" title="天下HD"/>
                <mu-menu-item value="4" title="穿越火线"/>
                <mu-menu-item value="5" title="英雄联盟"/>
                <mu-menu-item value="6" title="王者荣耀"/>
              </chp-select>
            </div>
          </div>
          <h4>checkbox(MATERIAL-UI)</h4>
          <div class="form-group">
            <div class="col-md-12">
              <chp-checkbox name="rememberme" v-model="isRememberMe">remeber me</chp-checkbox>
              <chp-checkbox name="rememberme" v-model="isRememberMe2">remeber me 2</chp-checkbox>
              <chp-checkbox name="rememberme" v-model="isRememberMe3" disabled>remeber me 2 disabled</chp-checkbox>
            </div>
          </div>
          <h4>radio(MATERIAL-UI)</h4>
          <div class="form-group">
            <div class="col-md-12">
              <chp-radio name="sex" v-model="sex" md-value="male">male</chp-radio>
              <chp-radio name="sex" v-model="sex" md-value="female">female</chp-radio>
              <chp-radio name="sex" v-model="sex" md-value="neutral" disabled>neutral</chp-radio>
            </div>
          </div>


        </form>




    </div>
    </div>
    </div>
  </chp-main-layout>

</template>

<script>


  export default {
    data(){
      return {
        radio1: "2",
        game2: "1",
        isRememberMe: true,
        isRememberMe2: false,
        isRememberMe3: true,
        sex:"neutral"
      }
    },
    computed: {
      username (){
        if (this.$store.state.userInfo) {
          return this.$store.state.userInfo.name;
        } else {
          return ""
        }
        ;
      }
    }
  }
</script>

<style lang="less">
  h4{
    padding-bottom: 10px;
  }
</style>
