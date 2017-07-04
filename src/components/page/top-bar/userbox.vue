<i18n src="./i18n.yaml"></i18n>
<template>
    <div id="userbox" class="userbox" :class="{opened:open}">
    	<!-- <a href="javascript:void(0)" @click="toggleOperationPopover" >
            <figure class="profile-picture">
                <img src="/static/images/xx.png" alt="Joseph Doe" class="img-circle" data-lock-picture="assets/images/!logged-user.jpg">
            </figure>
            <div class="profile-info" data-lock-name="John Doe" data-lock-email="johndoe@okler.com">
                <span class="name">John Doe Junior</span>
                <span class="role">administrator</span>
            </div>
            <i class="fa custom-caret"></i>
        </a> -->
        <mu-flat-button label=""  href="javascript:void(0)" @click="toggleOperationPopover"  ref="toggleBtn" :rippleOpacity="0">
        	<figure class="profile-picture">
                <img src="/static/images/xx.png" alt="Joseph Doe" class="img-circle" data-lock-picture="assets/images/!logged-user.jpg">
            </figure>
            <div class="profile-info" data-lock-name="John Doe" data-lock-email="johndoe@okler.com">
                <span class="name">John Doe Junior</span>
                <span class="role">administrator</span>
            </div>
            <i class="fa custom-caret"></i>
        </mu-flat-button>
      
        <mu-popover :trigger="trigger" :open="open" @close="handleClose" popoverClass="userbox-dropdown-menu">
            <ul class="list-unstyled">
                <li class="divider"></li>
                <li>
                    <a role="menuitem" tabindex="-1" href="pages-user-profile.html"><i class="fa fa-user"></i> My Profile</a>
                </li>
                <li>
                    <a role="menuitem" tabindex="-1" href="#" data-lock-screen="true"><i class="fa fa-lock"></i> Lock Screen</a>
                </li>
                <li>
                    <a role="menuitem" tabindex="-1" href="pages-signin.html"><i class="fa fa-power-off"></i> Logout</a>
                </li>
                <li class="divider"></li>
                <li>
                	<a href="javascript:void(0)" @click="changeTheme('dark')">
                		<mu-radio name="theme" nativeValue="dark" v-model="theme" slot="left" @change="changeTheme" class="item-icon"/>
						<span style="vertical:middle" class="item-title">{{$t('themes.dark')}}</span>
                	</a>


                </li>
                <li>
                <a href="javascript:void(0)" @click="changeTheme('light')">
                		<mu-radio name="theme" nativeValue="light" v-model="theme" slot="left" @change="changeTheme" class="item-icon"/>
						<span style="vertical:middle" class="item-title">{{$t('themes.light')}}</span>
                	</a>



                </li>
            </ul>
        </mu-popover>
    </div>
</template>
<script>
import changeTheme  from 'utils/theme.js'
  import {SET_THEME} from 'store/mutation-types.js'
	export default{
		data(){
			return {
				open: false,
				trigger: null
			}
		},
		computed: {
      theme: {
        set(theme){
          this.$store.commit(SET_THEME, theme)
        },
        get(){
          return this.$store.state.theme
        }
      }
    },
    mounted(){
    	this.trigger = this.$refs.toggleBtn.$el
    },
    methods:{
    	logout(){
//        this.$store.dispatch("logout").then(() => {
//          this.$router.push("/");
//        })
        alert("logout");
      },
      changeTheme (theme) {
        this.theme = theme
        changeTheme(theme)
      },
      toggleOperationPopover(){
      		this.open = !this.open
      },
      handleClose(){
          this.open = false;
      }
    }
	}
</script>
<style lang="less">
@import "~assets/less/transition.less";
.hidden{
	display: none;
}
.userbox{

	i{
		transition : @arrow-rotate-transition;
	}
	&.opened{

		i{
			transform: rotate(180deg) translate3D(0,0,0);

			}
	}

  .profile-picture{
    margin:0;
  }
  &>a.hover{
  	background-color: transparent;
  }
}
</style>
