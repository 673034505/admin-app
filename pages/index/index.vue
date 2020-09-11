
<template>
         <view class="container">
			 <u-button type="primary"  @click="golist">主要按钮</u-button>
            <button type="default" @click="golist">跳转</button>
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
		methods:{
			golist(){
				this.$navTo('navBar/list/list',{id:'123',name:'刘燃燃'})
				// this.$http('/airMoniData/getCityInfoByTime',{},'GET').then(res=>{
				// 	console.log(res)
				// })
			}
		}
        
    }
</script>
<style lang="less" scoped>

.container{
    height: 100vh;
    
    
}
</style>