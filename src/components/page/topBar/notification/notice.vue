<template>
	<li>
        <mu-icon-button 
            @click="toggleNoticePopover" 
            class="dropdown-toggle notification-icon" 
            ref="noticeTrigger">
          <i class="fa fa-envelope"></i>
          <span class="badge">4</span>
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
                  <span class="pull-right label label-default">3</span>
                  Notification
                </div>
      
                <div class="content">
                  <ul>
                    <li>
                      <a href="#" class="clearfix">
                        <figure class="image">
                          <img src="assets/images/!sample-user.jpg" alt="Joseph Doe Junior" class="img-circle">
                        </figure>
                        <span class="title">Joseph Doe</span>
                        <span class="message">Lorem ipsum dolor sit.</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" class="clearfix">
                        <figure class="image">
                          <img src="assets/images/!sample-user.jpg" alt="Joseph Junior" class="img-circle">
                        </figure>
                        <span class="title">Joseph Junior</span>
                        <span class="message truncate">Truncated message. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet lacinia orci. Proin vestibulum eget risus non luctus. Nunc cursus lacinia lacinia. Nulla molestie malesuada est ac tincidunt. Quisque eget convallis diam, nec venenatis risus. Vestibulum blandit faucibus est et malesuada. Sed interdum cursus dui nec venenatis. Pellentesque non nisi lobortis, rutrum eros ut, convallis nisi. Sed tellus turpis, dignissim sit amet tristique quis, pretium id est. Sed aliquam diam diam, sit amet faucibus tellus ultricies eu. Aliquam lacinia nibh a metus bibendum, eu commodo eros commodo. Sed commodo molestie elit, a molestie lacus porttitor id. Donec facilisis varius sapien, ac fringilla velit porttitor et. Nam tincidunt gravida dui, sed pharetra odio pharetra nec. Duis consectetur venenatis pharetra. Vestibulum egestas nisi quis elementum elementum.</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" class="clearfix">
                        <figure class="image">
                          <img src="assets/images/!sample-user.jpg" alt="Joe Junior" class="img-circle">
                        </figure>
                        <span class="title">Joe Junior</span>
                        <span class="message">Lorem ipsum dolor sit.</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" class="clearfix">
                        <figure class="image">
                          <img src="assets/images/!sample-user.jpg" alt="Joseph Junior" class="img-circle">
                        </figure>
                        <span class="title">Joseph Junior</span>
                        <span class="message">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet lacinia orci. Proin vestibulum eget risus non luctus. Nunc cursus lacinia lacinia. Nulla molestie malesuada est ac tincidunt. Quisque eget convallis diam.</span>
                      </a>
                    </li>
                  </ul>
      
                  <hr>
      
                  <div class="text-right">
                    <a href="#" class="view-more">View All</a>
                  </div>
                </div>
              </div>
        </mu-popover>
    </li>
</template>
<script>
	export default{
		data(){
			return {
				noticeOpen:false,
        		noticeTrigger:null,
			}
		},
		mounted(){
      		this.noticeTrigger = this.$refs.noticeTrigger.$el
    	},
		methods:{
	      	handleClose(){
	        	this.noticeOpen = false
	      	},
	      	toggleNoticePopover(){
	        	this.noticeOpen = !this.noticeOpen
	      	}
    	},
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