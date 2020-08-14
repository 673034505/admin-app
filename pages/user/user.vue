<template>
	<view>
		<web-view  :src="url"  :webview-styles="webviewStyles" v-if="url.length>0" ></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:'',
				webviewStyles: {
					progress: false,
				},
				id:''
			};
		},
		onLoad(options) {
			if (options && options.id) {//如果需要传值，用值拼接
				this.id = options.id
			}


			// 屏幕横屏
			// #ifdef  APP-PLUS  
			//  plus.screen.lockOrientation("landscape-primary");  
			 // #endif
			 //获取值
			 this.id = 100
			 let _self = this;
			uni.getSystemInfo({
			    success: function (res) {
					//动态设置屏幕高度和宽度
					_self.url = `/hybrid/html/user.html?pageW=${res.windowWidth}&id=${_self.id}`
			    }
			});
		},
		onResize(){//屏幕发生变化,设置屏幕高度 (如果屏幕发生变化而且需要传值：列子)  (这里为了就是解决横屏退出竖屏的问题)
			let _self = this;
			uni.getSystemInfo({
			    success: function (res) {
					//动态设置屏幕高度和宽度
					_self.url = `/hybrid/html/user.html?pageW=${res.windowWidth}&id=${_self.id}`
			    }
			});
		},
		onUnload(){//销毁时竖屏
			// #ifdef  APP-PLUS
			plus.screen.lockOrientation('portrait-primary');
			// #endif
		},		
	}
</script>

<style lang="less">

</style>
