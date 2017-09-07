<i18n src="./i18n.yaml"></i18n>
<template>
	<div class="col-lg-6 col-md-6 col-xs-12">
		<chp-panel :canCollapse="false" :canClose="false" :isLoading="loadingStatus" class="dashbord-fix-height-panel">
			<template slot="title">
				{{ $t("notification.announcement") }}
				<a class="pull-right" href="#/notice">
					<i class="fa fa-ellipsis-v" aria-hidden="true"></i>
					<chp-ink-ripple></chp-ink-ripple>
				</a>
			</template>
			<template slot="body">
				<table class="table mb-none ">
					<tbody>
						<tr v-for="(a,index) in announcements" :key="Math.random()">
							<td >
								<span class="one-line" v-html='a.content'></span>
							</td>
							<td> {{ a.dateTime}} </td>
						</tr>
					</tbody>
				</table>
			</template>
		</chp-panel>
	</div>
</template>
<script>
	import notificationService from 'services/notificationService'
	import loading from 'src/mixins/loading'
	export default{
		mixins:[loading],
		data(){
			return {
				announcements : []
			}
		},
		methods:{
			async fetchData(){
				this.loadingStatus = true
				let { success,data } = await notificationService.getNoticeByType("announcement",{ 
					language: this.$store.state.language,
					pageIndex: 1,
					pageSize: 2
				})
				this.loadingStatus = false
				if(success){
					this.announcements = data.data
				}
			}
		},
		created(){
			this.fetchData()
		},
		watch:{
			'$store.state.language' : function(){
				this.fetchData()
			}
		}
	}
</script>
