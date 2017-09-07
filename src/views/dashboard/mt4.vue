<i18n src="./i18n.yaml"></i18n>
<template>
	<div class="col-lg-6 col-md-6 col-xs-12">
		<chp-panel :canCollapse="false" :canClose="false" class="dashbord-fix-height-panel">
			<template slot="title">MT4
				<chp-view-all href="#/account-management/my-trading-account"></chp-view-all>
			</template>
			<template slot="body">
				<div class="operater pull-right pb-sm ">
					<chp-button class="btn  btn-primary btn-sm" href="#/fund-manager/deposite-funds"> 
						{{ $t('fund.deposit') }} 
					</chp-button>
					<chp-button class="btn btn-primary btn-sm" href="#/fund-manager/withdrawal">
						{{ $t('fund.withdraw') }} 
					</chp-button>
				</div>
				<table class="table mb-none">
					<thead>
						<tr>
							<th>{{ $t('account.account') }}</th>
							<th>{{ $t('account.type') }}</th>
							<th>{{ $t('account.balance') }}</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(t,index) in $store.state.mt4Accounts" :key="index">
						<template v-if="index<4">
							<td>{{ t.mt4_id }}</td>
							<td>{{ t.account_type }}</td>
							<td>{{ t.balance }}</td>
						</template>
							
						</tr>
					</tbody>
				</table>
			</template>
		</chp-panel>
	</div>
</template>
