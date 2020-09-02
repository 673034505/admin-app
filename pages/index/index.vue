
<template>
         <view class="container">
			 
            
        </view>
</template>
<script>
    export default {
        data() {
            return {
                items:50,
                TabCur: 0,
				scrollLeft: 0
            }
        },
		onLoad() {
			setTimeout(function(){
				//关闭启动界面。
                // #ifdef  APP-PLUS  
                    plus.navigator.closeSplashscreen() 
                // #endif
			},3000)
		},
        
    }
</script>
<style lang="less" scoped>

.container{
    height: 100vh;
    
    
}
</style>