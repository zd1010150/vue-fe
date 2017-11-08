<template>
  <div class="col-lg-12">
    <vue-form class="form-horizontal" :state="formstate" @submit.prevent="onSubmit">
      <chp-panel :hasFooter="true">
        <template slot="title">Form Validate</template>

        <div slot="body">
          <div class="form-group">
            <label class="col-md-3 control-label">电子邮件:</label>
            <div class="col-md-6">

              <mu-text-field hintText="text email" class="form-control" name="email" type="email"/>
            </div>
          </div>

          <validate class="form-group required-field" :class="fieldClassName(formstate.email)">
            <label class="col-md-3 control-label">电子邮件:</label>
            <div class="col-md-6">
              <mu-text-field @input="inputHandler" @focus="inputHandler" @blur="inputHandler" @change="inputHandler"
                             hintText="text email" class="form-control" name="email" type="email" required
                             v-model.lazy="model.email"/>
              <field-messages name="email" show="$touched || $submitted">

                <div slot="required" class="error">email is a required field</div>
              </field-messages>
            </div>
          </validate>

          <div class="form-group">
            <label class="col-md-3 control-label">选择爱好:</label>
            <div class="col-md-6">
              <chp-checkbox name="rememberme" v-model="isRememberMe">篮球</chp-checkbox>
              <chp-checkbox name="rememberme" v-model="isRememberMe2">足球</chp-checkbox>
              <chp-checkbox name="rememberme" v-model="isRememberMe3" disabled>乒乓球</chp-checkbox>
            </div>
          </div>


          <div class="form-group">
            <label class="col-md-3 control-label">选择爱好:</label>
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
          <div class="form-group">
            <label class="control-label col-md-3">你最喜欢的游戏:</label>
            <div class="col-md-6">
              <mu-select-field v-model="game2">
                <mu-menu-item value="1" title="阴阳师"/>
                <mu-menu-item value="2" title="影之刃"/>
                <mu-menu-item value="3" title="天下HD"/>
                <mu-menu-item value="4" title="穿越火线"/>
                <mu-menu-item value="5" title="英雄联盟"/>
                <mu-menu-item value="6" title="王者荣耀"/>
              </mu-select-field>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-3 control-label">选择性别:</label>
            <div class="col-md-6">
              <chp-radio name="sex" v-model="sex" md-value="male">male</chp-radio>
              <chp-radio name="sex" v-model="sex" md-value="female">female</chp-radio>
              <chp-radio name="sex" v-model="sex" md-value="neutral" disabled>neutral</chp-radio>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-md-3">Comment:</label>
            <div class="col-md-6">
              <mu-text-field hintText="多行文本输入，默认 3行，最大6行" multiLine :rows="3" :rowsMax="6" class="form-control"/>
            </div>
          </div>
        </div>

        <div class="row" slot="footer">
          <div class="col-sm-9 col-sm-offset-3">
            <button class="btn btn-primary">Submit</button>
            <button type="reset" class="btn btn-default">Reset</button>
          </div>
        </div>
      </chp-panel>
    </vue-form>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        formstate: {},
        model: {
          email: ''
        }
      }
    },
    methods: {
      fieldClassName: function (field) {
        if (!field) {
          return ''
        }
        if ((field.$touched || field.$submitted) && field.$valid) {
          // return 'has-success';
        }
        if ((field.$touched || field.$submitted) && field.$invalid) {
          return 'has-error'
        }
      },
      onSubmit: function () {
        console.log(this.formstate.$valid)
      },
      inputHandler: function (val) {
        console.log('====', val)
      }
    }
  }
</script>

