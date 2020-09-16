<template>
	<view>
		<web-view  :src="url"  :webview-styles="webviewStyles" v-if="url.length>0" ></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:'/hybrid/html/airCalendar.html',
				webviewStyles: {
					progress: false,
				},
			};
		},
		onLoad(options) {
			
		},
	}
</script>

<style lang="less">

</style>
