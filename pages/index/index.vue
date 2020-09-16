
<template>
         <view class="container">
             
        </view>
</template>
<script>
import calendar from "@/components/calendar/index.vue"
import {getLastDateOfMonth,getDateYMD,getLastDateDay,getDateYM,addZero,dateAdd,getDateYMDHMS} from '@/utils/date.js'
import { getAqiLevels,getAqiColor,getPollLevelColor} from '@/utils/aqi.js'
    export default {
        components: {
            calendar
        },
        data() {
            return {
                items:50,
                TabCur: 0,
                scrollLeft: 0,
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
            
		}
        
    }
</script>
<style lang="less" scoped>

.container{
    height: 100vh;
    
}
</style>