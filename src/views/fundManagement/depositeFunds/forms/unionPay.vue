<template>
	<chp-panel :canCollapse="false" :canClose="false" :isLoading="loadingStatus">
    <template slot="panelTitle">unionPay</template>
     <form slot="body" class="form-horizontal form-bordered " method="POST" name="unionPay" target="_blank" ref="unionPayForm">
        <paying-dialog ref="dialog" @close="handlerDialogClose"></paying-dialog>
        <div class="form-group" :class="errorClass('MT4')">
          <label class="control-label col-md-3">MT4 | Balance</label>
          <div class="col-md-6" >
            <mu-select-field v-model="model.mt4_id" v-validate="'required'" data-vv-value-path="model.mt4_id" name="mt4_id" >
              <template v-for="mt4 in MT4">
                <mu-menu-item :value="mt4.id" :title="mt4.text" key="mt4.id"/>
              </template>
            </mu-select-field>
             <span slot="required" class="error" v-if="errors.has('MT4:required')">{{errors.first('MT4:required')}}</span>
          </div>
        </div>
        <div class="form-group" :class="errorClass('deposit_pay')">
          <label class="control-label col-md-3">Amount({{baseCurrency}})</label>
          <div class="col-md-6">
            <mu-text-field v-model="model.order_amount"  v-validate="'required|positiveFloatMoney|moneyRange:deposit_pay'" data-vv-value-path="model.order_amount" data-vv-name="deposit_pay" data-vv-validate-on="blur" class="form-control"   :fullWidth="true" name="order_amount" />
            
            <span slot="required" class="error" v-if="errors.has('deposit_pay:required')">{{errors.first('deposit_pay:required')}}</span>
            <span slot="required" class="error" v-if="errors.has('deposit_pay:positiveFloatMoney')">{{errors.first('deposit_pay:positiveFloatMoney')}}</span>
            <span slot="required" class="error" v-if="errors.has('deposit_pay:moneyRange')">{{errors.first('deposit_pay:moneyRange')}}</span>
          </div>
        </div>
        <div class="form-group" :class="errorClass('bank')">
          <label class="control-label col-md-3">Bank</label>
          <div class="col-md-6">
            <mu-select-field v-model="model.bank_code" v-validate="'required'" data-vv-value-path="model.bank_code" data-vv-name="bank" name="bank_code">
              <template v-for="(value,key) in banks">
                <mu-menu-item :value="key" :title="value" key="key"/>
              </template>
            </mu-select-field>
            <span slot="required" class="error" v-if="errors.has('bank:required')">{{errors.first('bank:required')}}</span>
          </div>
        </div>
     </form> 
    <div class="row" slot="footer">
      <div class="col-md-6 col-md-offset-3" >
          <chp-button class="mb-xs mt-xs mr-xs btn btn-primary print-btn" @click="submit">
            <i class="fa fa-check hidden-sm hidden-xs"></i> {{ $t('ui.button.pay') }}
          </chp-button>
          <chp-button class="mb-xs mt-xs mr-xs btn btn-default print-btn" @click="cancel">
           <i class="fa fa-times hidden-sm hidden-xs"></i> {{ $t('ui.button.cancel') }}
          </chp-button>
      </div>
    </div>
   
    </chp-panel>
</template>
<script>
  import mt4Service from "services/mt4Service"
  import bankService from "services/bankService"
  import validateMixin from 'mixins/validatemix'
  import payingDialog from './payingDialog'
  import loadingMix from 'mixins/loading'
	export default{
    components:{
      'paying-dialog' : payingDialog
    },
    mixins:[validateMixin,loadingMix],
		data(){
      return {
        MT4 : null,
        banks: null,
        baseCurrency: "",
        defaultMT4:0,
        model : {
          mt4_id : "",
          order_amount: "",
          bank_code:"",
          gateWayCode:this.methodCode
        }
      }
    },
    props:{
      methodCode:{
        type:String
      }
    },
    methods:{
      async submit(){
        let validateResult = await this.$validator.validateAll();
          if(validateResult){
            this.$refs.dialog.open();
            let $form = this.$refs.unionPayForm;
            $form.action = "/api/deposit/"+this.model.gateWayCode;
            $form.submit();
            
          }
        
      },
      cancel(){
        this.$set(this.model,"order_amount","");
      },
      fetchMT4(){
        this.MT4 = this.$store.state.traderAccounts.map((mt4)=>{
          return {
            id:mt4.mt4_id,
            text:"#"+mt4.mt4_id+" | "+mt4.balance,
            baseCurrency:mt4.base_currency
          }
        });
        this.$set(this.model,"mt4_id",this.defaultMT4 ? this.defaultMT4 : this.MT4[0].id)
      },
      async fetchBank(){
        let {success,data,message} = await bankService.getBank(this.methodCode);
            if(success && data ){
              let firstKey = "",flag = false
              for(let key in data){
                if(!flag){
                  firstKey = key;
                  flag=true;
                }
                this.banks = Object.assign({},this.banks,data);//一定要创建一个新对象，
             }
              this.$set(this.model,"bank_code",firstKey)
            }
            return {success,data,message};
        },
        handlerDialogClose(){
          this.$set(this.model,"order_amount","");
        }
      },
    created(){
      if(this.methodCode){//需要加入条件判断，
          this.defaultMT4 = this.$route.query && this.$route.query.mt4Id ? Number(this.$route.query.mt4Id) : 0
          this.fetchMT4()
          this.loadingStatus = true
          let self =this
          Promise.all([this.fetchBank()]).then(function(){
            self.loadingStatus = false;
          });
     }
    },
    watch:{
      'model.mt4_id' : function(val,oldVal){
        if(val == oldVal){return}
          else{
            let currency = this.MT4.filter(mt4 => {
              return mt4.id == val;
            });
            this.baseCurrency = currency[0].baseCurrency;
          }
      }
    }
	}
</script>