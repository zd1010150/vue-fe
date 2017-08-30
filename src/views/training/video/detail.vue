<template>
	<div class="container-fluid">
		<section class="media-gallery">
			<div class="row mg-files">
				<div class="col-xs-12">
					<div class="thumbnail">					
						<iframe src="http://player.youku.com/embed/XMjg4NjY3MjA4NA==' frameborder=0 'allowfullscreen"></iframe>
						
						<div class="general-infor">
							<h2 class="mg-title text-weight-semibold mt-md mb-xs">美国5月季调后非农大跌眼镜</h2>							
							<div>
								<div class="pull-right">Ginny - 05/06/2017 </div>
								Category:
								<router-link to="?level=1">Video</router-link> /
								<router-link :to="'?level=2&videoType='+ $route.query.videoType "> {{ $route.query.videoType | PascalCase }} </router-link><br>
							</div>
						</div>
						<div class="description">
							thi detail id is {{ $route.query.videoId }} -- type is: {{ $route.query.videoType }} 上个交易日，周二（8月22日）欧元区经济数据录得疲弱，日内跌幅0.5%。目前欧元/美元回到上周五收盘水平附近，由于美元开始走强，欧元本周一录得的涨幅几乎全部被抹去
						</div>
					</div>
				</div>
			</div>
		</section>

	</div>
</template>
<script>
import filters from "src/filters";
export default {
	created() {
		console.log("")
	},
	filters
}
</script>
<style scoped>
.thumbnail iframe {
	width: 100%;
	height: 32vw;
}
.general-infor {
	padding-bottom: 10px;
	border-bottom: 1px solid #DADADA;
}
.description {
	margin: 15px 0;
}

@media screen and (max-width: 991px) {
	.thumbnail iframe {
		width: 100%;
		height: 60vw;
	}
}
</style>
