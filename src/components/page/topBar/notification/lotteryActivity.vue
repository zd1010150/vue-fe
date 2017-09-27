<i18n src="../i18n.yaml"></i18n>
<template>
	<li>
        <mu-icon-button class="dropdown-toggle notification-icon" @click="openLandingPage">
	        <i class="fa fa-trophy" aria-hidden="true"></i>
	        <span class="badge">{{ times }}</span>
	        <chp-tooltip chp-direction="bottom">
	            {{ $t('notification.youHaveChance') }} 
	            {{ times }}
	            {{ $t('notification.opportunity') }}
	        </chp-tooltip>
        </mu-icon-button>
    </li>
</template>
<script>
	import { PRIZE_LANDING_PAGE } from 'src/config/url.config'
	import activityService from 'services/activityService'
	export default{
		data(){
      		return {
      			times:0,
       			landingPageURL: PRIZE_LANDING_PAGE[this.$store.state.language]
      		}
    	},
    	watch:{
      		"$store.state.language": function(val){
        		this.landingPageURL = PRIZE_LANDING_PAGE[val]
      		}
    	},
    	methods:{
    		openLandingPage(){
    			window.open(this.landingPageURL,'','')

    		},
    		async getActivityTimes(){
    			let {success,data} = await activityService.getLotteryTimes()
    			if(success){
    				this.times = data.leftLucky
    			}
    		}
    	},
    	created(){
    		this.getActivityTimes()
    	}
	}
</script>