<template>
	<div>
		<form-doku v-if="method == doku"></form-doku>
		<form-fasa-pay v-if="method == fasaPay"></form-fasa-pay>
		<form-union-pay v-if="method == unionPay"></form-union-pay>
		<form-wire-transfer v-if="method == wireTransfer"></form-wire-transfer>

	</div>
</template>
<script>
import doku from "./forms/doku.vue"
import fasaPay from "./forms/fasaPay"
import unionPay from "./forms/unionPay"
import wireTransfer from "./forms/wireTransfer"
	export default{
		props:{
			method:{
				type:String,
				required: true
			}
		},
		components: {
			'form-doku' : doku,
			'form-fasa-pay' : fasaPay,
			'form-union-pay' : unionPay,
			'form-wire-transfer': wireTransfer
		}
	}
</script>