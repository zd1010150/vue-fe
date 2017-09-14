<i18n src="./i18n.yaml"></i18n>
<template>
	<div class='row'>
		<div class="col-lg-12 col-sm-12">
	        <header class="panel-heading bg-primary">
	            <div class="widget-profile-info">
	                <div class="profile-picture">
	                    <img :src="$store.state.userInfo.avatar">
	                </div>
	                <div class="profile-info">
	                    <h4 class="name text-weight-semibold pb-none">{{ $store.state.userInfo.first_name }} {{ $store.state.userInfo.last_name }}</h4>
	                    <h6 class="role">{{ $store.state.userInfo.phone }}</h6>
	                    <h5 class="role">{{ $store.state.userInfo.email }}</h5>
	                    <div class="profile-footer ">
	                       {{ address }} {{ $store.state.userInfo.zip_code }}
	                    </div>
	                </div>
	            </div>
	        </header>
	        
	        <div class="panel panel-accordion panel-accordion-first" v-if=" $store.state.userInfo.type == 'corporate' ">
	            <div class="panel-heading">
	                <h4 class="panel-title">{{ $t('companyInformation') }}</h4>
	            </div>
	            <div class="accordion-body">
	                <div class="panel-body">
	                    <ul class="simple-user-list mb-xlg">
	                        <li class="col-lg-4 col-md-6 col-sm-12">
	                            <span class="message">{{ $t('company.companyName') }}</span>
	                            <span class="title">{{ corporate.company_name }}</span>
	                        </li>
	                        <li class="col-lg-4 col-md-6 col-sm-12">
	                            <span class="message">{{ $t('company.countryOfIncorporation') }}</span>
	                            <span class="title">{{ corporate.country_of_incorporation }}</span>
	                        </li>
	                        <li class="col-lg-4 col-md-6 col-sm-12">
	                            <span class="message">{{ $t('company.BRN') }}</span>
	                            <span class="title">{{ corporate.company_name }}</span>
	                        </li>
	                        <li class="col-lg-4 col-md-6 col-sm-12">
	                            <span class="message">{{ $t('company.dateOfIncorporation') }}</span>
	                            <span class="title">{{ corporate.date_of_incorporation }}</span>
	                        </li>
	                        <li class="col-lg-4 col-md-6 col-sm-12">
	                            <span class="message">{{ $t('company.companyProvince') }}</span>
	                            <span class="title">{{ corporate.company_state }}</span>
	                        </li>
	                        <li class="col-lg-4 col-md-6 col-sm-12">
	                            <span class="message">{{ $t('company.companyCity') }}</span>
	                            <span class="title">{{ corporate.company_city }}</span>
	                        </li>
	                    </ul>
	                </div>
	            </div>
	        </div>
	    </div>
	</div>
</template>
<script>
	import { ZH_LANGUAGE } from 'src/config/app.config.js'
	import settingService from 'services/settingService'
	export default{
		data(){
			return {
				addressArr: [],
				corporate: {
					company_name: "",
			        country_of_incorporation: "",
			        business_registration_number: "",
			        date_of_incorporation: "",
			        company_city: "",
			        company_state: "",
			    }
			}
		},
		computed :{
			address(){
				if(this.$store.state.language == ZH_LANGUAGE ){
					return  this.addressArr.slice().reverse().join(' ')
				}else{
					return  this.addressArr.slice().join(' ')
				}
			}
		},
		methods:{
			async getData(){
				let {success,data} = await settingService.getCorporate()
				if(success){
					this.corporate = Object.assign({},data)
				}
			}
		},
		mounted(){
			let userInfo = this.$store.state.userInfo
			this.addressArr.push(userInfo.address)
			this.addressArr.push(userInfo.city)
			this.addressArr.push(userInfo.state)
			this.addressArr.push(userInfo.country)
			this.getData()
		}
	}
</script>
<style scoped>
	.widget-profile-info .profile-info .profile-footer{
		text-align: left !important;
	}
</style>