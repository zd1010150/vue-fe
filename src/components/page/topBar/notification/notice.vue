<i18n src="../i18n.yaml"></i18n>
<template>
	<li>
        <mu-icon-button 
            @click="toggleNoticePopover" 
            class="dropdown-toggle notification-icon" 
            ref="noticeTrigger">
          <i class="fa fa-envelope"></i>
          <span class="badge">{{ count }}</span>
        </mu-icon-button>
        <mu-popover :open="noticeOpen" 
                    :autoPosition="true" 
                    :trigger="noticeTrigger"
                    :anchorOrigin= '{vertical:"bottom",horizontal:"right"}'
                    :targetOrigin= '{vertical:"top",horizontal:"right"}'
                    @close="handleClose" 
                    popoverClass="noticePopover notifications">
          <div class=" notification-menu">
                <div class="notification-title">
                  <span class="pull-right label label-default">{{ count }}</span>
                  {{ $t('notification.notification') }}
                </div>
      
                <div class="content">
                  <ul>
                    <li v-for="(notice,index) in notices" :key="index">
                      <a :href="'#/notice?type='+notice.category" class="clearfix">
                        <span class="title text-dark">{{ notice.dateTime}}</span>
                        <span class="message truncate" v-html="notice.content"></span>
                      </a>
                    </li>
                  </ul>
                  <hr>
                  <div class="text-right">
                    <chp-button href="#/notice" class="btn btn-default">{{ $t('ui.button.viewAll') }}</chp-button>
                  </div>
                </div>
              </div>
        </mu-popover>
    </li>
</template>
<script>
  import notificationService from 'services/notificationService'
	export default{
		data(){
			return {
        count:0,
        notices:[],
				noticeOpen:false,
        noticeTrigger:null,
			}
		},
		mounted(){
      		this.noticeTrigger = this.$refs.noticeTrigger.$el
    },
    created(){
          this.fetchData()
    },
		methods:{
          async fetchData(){
            let { success,data } = await notificationService.getUnreadNotice(this.$store.state.language)
            if(success){
              this.count = data.count
              this.notices = data.notices
            }
          },
	      	handleClose(){
	        	this.noticeOpen = false
	      	},
	      	toggleNoticePopover(){
	        	this.noticeOpen = !this.noticeOpen
	      	}
    },
    watch:{
      '$store.state.refreshNoticeFlag' : function(val){
        this.fetchData()
      },
      '$store.state.language' : function(){
        this.fetchData()
      }
    }
	}
</script>
<style lang="less">
  @import "~assets/less/variable.less";
  .noticePopover{
    margin-top: 8px;
    .notification-menu{
      margin-top: 0px;
      &:before{
        right:11px;
      }
    }
  }
</style>