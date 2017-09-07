<template lang="html">
	<div class="container-fluid">
		<div class='row'>
			<div class='col-md-12 col-lg-12 col-sm-12'>
				<chp-tabs :value='activeTab' :isJustified='true' :isPrimary='true' @change='handleTabChange'>
					<template slot='header'>
						<chp-tab-header href='announcement'>{{ $t('notification.announcement') }}</chp-tab-header>
						<chp-tab-header href='action'>{{ $t('notification.action') }}</chp-tab-header>
						<chp-tab-header href='course'>{{ $t('notification.course') }}</chp-tab-header>
					</template>
					<template slot='content'>
						<chp-expand-transition name="chp-fade">
							<keep-alive>
								<component v-bind:is="currentView"></component>
							</keep-alive>
						</chp-expand-transition>
					</template>
				</chp-tabs>
			</div>
		</div>
	</div>
</template>

<script>
	import announcement from './announcement.vue'
	import action from './action.vue'
	import course from './course.vue'
	export default {
		components: {
			'notice-announcement': announcement,
			'notice-action': action,
			'notice-course': course
		},
		data() {
			return {
				activeTab: "announcement",
				currentView: "notice-announcement"
			}
		},
		methods: {
			handleTabChange(val) {
				console.log("tab change:",val)
				this.activeTab = val
			}
		},
		watch: {
			activeTab(val) {
				this.currentView = 'notice-' + val
			}
		}
	}

</script>