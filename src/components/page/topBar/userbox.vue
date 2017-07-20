<i18n src="./i18n.yaml"></i18n>
<template>
    <div id="userbox" class="userbox" :class="{opened:open}">
    	<mu-flat-button class="userbox-toggle-btn" tag="div"  href="javascript:void(0)" @click="toggleOperationPopover"  ref="toggleBtn" >
        	<figure class="profile-picture">
                <img src="/static/images/xx.jpg" alt="Joseph Doe" class="img-circle" data-lock-picture="assets/images/!logged-user.jpg">
            </figure>
            <div class="profile-info" data-lock-name="John Doe" data-lock-email="johndoe@okler.com">
                <span class="name word-wrap" >{{ $store.state.userInfo.name}}</span>
                <span class="role"> 普通用户</span>

            </div>
            <i class="fa custom-caret"></i>
        <chp-tooltip chp-direction="bottom">George Calton</chp-tooltip>
        </mu-flat-button>

        <mu-popover :trigger="trigger" :open="open" @close="handleClose" popoverClass="userbox-dropdown-menu">
            <ul class="list-unstyled">
                <li class="divider"></li>
                <li>
                    <a role="menuitem" tabindex="-1" href="pages-user-profile.html"><i class="fa fa-user"></i> My Profile</a>
                </li>
                <li>
                    <router-link role="menuitem" tabindex="-1" to="/changePassword" data-lock-screen="true"><i class="fa fa-lock"></i> Change Password </router-link>
                </li>
                <li>
                    <a role="menuitem" tabindex="-1" href="pages-signin.html" class="logout-item"><i class="fa fa-power-off"></i> Logout</a>
                </li>
                <li class="divider"></li>
                <li>
                	<a href="javascript:void(0)" @click="changeTheme('dark')" class="color-item">
                		<mu-radio name="theme" nativeValue="dark" v-model="theme" slot="left" @change="changeTheme" class="item-icon"/>
					        	<span class="item-title">{{$t('themes.dark')}}</span>
                	</a>
                </li>
                <li>
                  <a href="javascript:void(0)" @click="changeTheme('light')" class="color-item">
                      <mu-radio name="theme" nativeValue="light" v-model="theme" slot="left" @change="changeTheme" class="item-icon"/>
                      <span class="item-title">{{$t('themes.light')}}</span>
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
    	this.trigger = this.$refs.toggleBtn.$el;
      console.log("this is topbar mounted",this.$store.state.userInfo.name);
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
@import "~assets/less/variable.less";
@import "~assets/less/transition.less";

.hidden{
	display: none;
}
.userbox{
  width:180px;
  i{
		transition : @arrow-rotate-transition;
	}
	&.opened i{
     transform: rotate(180deg) translate3D(0,0,0);
  }
   .mu-flat-button-wrapper{
     width:100%;
     .display(flex);
     .justify-content(space-around);
   }
  .profile-picture{
    width: 35px;
    margin:0px 10px 0px;

  }
  .profile-info{
    .flex(1);
    margin:0px;
    .name{
      .text-line-no-wrap(1,1.3rem,85px);
    }
  }
  .fa{
    width:10px;
    margin:0px 0px 0px 10px;
  }
  & > a.hover{
      bakground-color: transparent;
    }

  .userbox-toggle-btn{
    height:57px;
    padding-left:10px;
    padding-right: 10px;
    width:100%;
  }
 }
.mu-popover.userbox-dropdown-menu{
  padding:10px;
  .item-icon{
    margin-right:13px;
    margin-bottom: 0px;
  }
  .color-item{
    padding: 5px 15px ;
  }
  .logout-item{
    padding-left: 18px;
  }
  a:hover{
    background-color: @blue-color;
    color:@light-reverse-font-color;
    text-decoration: none;
  }
  a:not(.color-item){
    i{
      padding:2px 0px;
    }
  }
}
@media only screen and (max-width: 767px) {
  .userbox{
    width:121px;
    .userbox-toggle-btn{
      height:37px;
      padding-left: 0px;
    }

  }
  .mu-popover.userbox-dropdown-menu{
    a{
      padding:5px 10px;
    }

    .logout-item{
      padding:5px 8px;
    }
    .color-item{
      padding:5px 5px;
    }

    padding-right:20px;
    i {
      margin-right: 3px;
    }
    .item-icon{
      margin-right:0px;
      margin-bottom: 0px;
    }
  }
}
</style>
