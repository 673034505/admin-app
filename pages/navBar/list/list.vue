<template>
	<view>
		<view class="">
			<view class="" v-for="(item,i) in site" :key="i">
				{{item.stationname}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				site:[],
			};
		},
		onLoad(params) {
			// console.log(params)
			
			this.$http('/airMoniData/getCityInfoByTime','GET').then(res=>{
				console.log(res)
				this.site = res.data.result.site
			})
		}
	}
</script>

<style lang="less">

</style>
