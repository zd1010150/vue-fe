<template lang="html">
  <transition name="fade" mode="out-in">
      <div class="col-lg-12">

        <chp-panel>
          <template slot="title">Text Field</template>
          <template slot="subtitle"> input</template>
          <form slot="body" class="form-horizontal form-bordered">
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
            <h4>mutil input</h4>
            <div class="form-group">
              <label class="control-label col-md-3">Comment</label>
              <div class="col-md-6">
                <mu-text-field hintText="多行文本输入，默认 3行，最大6行" multiLine :rows="3" :rowsMax="6" class="form-control"/>
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
        </chp-panel>
        <chp-panel>
          <template slot="title">Select</template>
          <template slot="subtitle"> select,radio,check</template>
          <form slot="body" class="form-horizontal form-bordered">
            <h4>dropdown select</h4>
            <div class="form-group">
              <label class="control-label col-md-3">your faviorate game:</label>
              <div class="col-md-6">
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
        </chp-panel>
        <chp-panel>
          <template slot="title">Tabs</template>
          <template slot="subtitle"> default tabs,step tabs</template>
          <div slot="body" class="col-md-12 col-lg-12 col-sm-12">
            <h4>tabs (default)</h4>
            <div>
              <chp-tabs :value="activeTab"  :isJustified="true" :isPrimary="true" @change = "handleTabChange">
                <template slot="header">
                  <chp-tab-header href="tab1">我是第一个tab</chp-tab-header>
                  <chp-tab-header href="tab2">我是第2个tab</chp-tab-header>
                  <chp-tab-header href="tab3">我是第3tab</chp-tab-header>
                </template>
                <template slot="content">
                  <chp-tab-content id="tab1">

                    第一个tab的内容
                  </chp-tab-content>
                  <chp-tab-content id="tab2">

                    第2个tab的内容
                  </chp-tab-content>
                  <chp-tab-content id="tab3">

                    第3个tab的内容
                  </chp-tab-content>

                </template>

              </chp-tabs>

            </div>
            <h4>step tabs</h4>
            <div>
              <chp-tabs :value="activeStepTab"  @change = "handleStepTabChange" type="wizard">
                <template slot="header">
                  <chp-tab-header href="tab1">我是第一个tab</chp-tab-header>
                  <chp-tab-header href="tab2">我是第2个tab</chp-tab-header>
                  <chp-tab-header href="tab3">我是第3tab</chp-tab-header>
                </template>
                <template slot="content">
                  <chp-tab-content id="tab1">

                    第一个tab的内容
                  </chp-tab-content>
                  <chp-tab-content id="tab2">

                    第2个tab的内容
                  </chp-tab-content>
                  <chp-tab-content id="tab3">

                    第3个tab的内容
                  </chp-tab-content>

                </template>

              </chp-tabs>

            </div>

          </div>
        </chp-panel>
        <chp-panel>
          <template slot="title">Tooltip</template>
          <template slot="subtitle">tooltip</template>
          <div slot="body" class="col-md-12 col-lg-12 col-sm-12">
            <h4>tooptip</h4>
            <div>
              <span><chp-tooltip>this is very longlong long long tooltip</chp-tooltip>this it tooltip test span</span>

            </div>
            <h4>step tabs</h4>
            <div>
              <chp-tabs :value="activeStepTab"  @change = "handleStepTabChange" type="wizard">
                <template slot="header">
                  <chp-tab-header href="tab1">我是第一个tab</chp-tab-header>
                  <chp-tab-header href="tab2">我是第2个tab</chp-tab-header>
                  <chp-tab-header href="tab3">我是第3tab</chp-tab-header>
                </template>
                <template slot="content">
                  <chp-tab-content id="tab1">

                    第一个tab的内容
                  </chp-tab-content>
                  <chp-tab-content id="tab2">

                    第2个tab的内容
                  </chp-tab-content>
                  <chp-tab-content id="tab3">

                    第3个tab的内容
                  </chp-tab-content>

                </template>

              </chp-tabs>

            </div>

          </div>
        </chp-panel>
        <chp-panel>
          <template slot="title">Pagination</template>
          <template slot="subtitle"> pagination</template>
          <div slot="body" class="form-horizontal form-bordered">
            <h4>pagination</h4>
            <div>
              <!--此处的pageSize 传给了pagination-->
              <chp-select v-model="pageSize" >
                <mu-menu-item :value="10" title="10"/>
                <mu-menu-item :value="20" title="20"/>
                <mu-menu-item :value="30" title="30"/>
                <mu-menu-item :value="40" title="40"/>
              </chp-select>


            </div>


          </div>
        </chp-panel>
        <chp-panel>
          <template slot="title">DatePicker</template>
          <template slot="subtitle"></template>
          <div class="form-horizontal form-hordered" slot="body">
            <h4>DatePicker</h4>
            <!-- <chp-date-picker container="inline" mode="landscape" hintText="内联横屏模式选择" /> -->

            <br/>
          </div>
        </chp-panel>
        <ui-toolbar @pageSizeChanged = "pageSizeChanged"></ui-toolbar>
        <ui-data-table :pageSize = "pageSize"></ui-data-table>
        <ui-dialog></ui-dialog>
        <chp-panel>
          <template slot="title">Toster</template>
          <template slot="subtitle"></template>
          <div class="form-horizontal form-hordered" slot="body">

            <chp-button @click="showToster('error')">show error toastr</chp-button>
            <chp-button @click="showToster('success')">show success toastr</chp-button>
            <chp-button @click="showToster('warn')">show warn toastr</chp-button>
            <chp-button @click="showToster('info')">show info toastr</chp-button>
            <br/>
          </div>
        </chp-panel>
      </div>
  </transition>

</template>

<script>

  import uiToolbar from './toolbar.vue'
  import dataTable from './datatable.vue'
  import uiDialog from './dialog.vue'

  export default {
    components:{
      'ui-toolbar' : uiToolbar,
      'ui-data-table' : dataTable,
      'ui-dialog' : uiDialog
    },
    data(){
      return {
        radio1: "2",
        game2: "1",
        isRememberMe: true,
        isRememberMe2: false,
        isRememberMe3: true,
        sex:"neutral",
        activeTab:"tab1",
        activeStepTab: "tab1",

        pageSizeNumber : 10
      }
    },
    computed: {
      pageSize:{
        set(val){
          this.pageSizeNumber = Number(val);
        },
        get(){
          return this.pageSizeNumber;
        }
      } ,
      username (){
        if (this.$store.state.userInfo) {
          return this.$store.state.userInfo.name;
        } else {
          return ""
        }
        ;
      }
    },
    methods:{
      handleTabChange (val) {
        this.activeTab = val
      },
      handleStepTabChange(val) {
        this.activeStepTab = val
      },

      pageSizeChanged(val){
        this.pageSizeNumber = Number(val);
      },
      showToster(type){
       console.log(this.toastr[type](type + " info"));
      }
    }
  }
</script>

<style lang="less">
  h4{
    padding-bottom: 10px;
  }
</style>
