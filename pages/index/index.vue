
<template>
         <!-- <view class="container">
             <monthlyCalendar :show="true" @monthDateChanges="monthDateChange" />
        </view> -->
        <web-view  src="/hybrid/html/competitionCity.html"  @message="handleMessage" ></web-view>
</template>
<script>
import calendar from "@/components/calendar/index.vue"
import monthlyCalendar from "@/components/monthlyCalendar/index.vue"
import {getLastDateOfMonth,getDateYMD,getLastDateDay,getDateYM,addZero,dateAdd,getDateYMDHMS} from '@/utils/date.js'
import { getAqiLevels,getAqiColor,getPollLevelColor} from '@/utils/aqi.js'
    export default {
        components: {
            calendar,
            monthlyCalendar
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
            // uni.showToast({
            //     title: '提示',
            //     duration: 2000
            // });
        
            

        },
        methods:{
            monthDateChange(obj){
                console.log(obj)
            },
            handleMessage(evt) {  
                console.log('接收到的消息：' + JSON.stringify(evt.detail.data));  
                // evt.detail.data
                uni.showToast({
                    title: evt.detail.data,
                    duration: 2000
                });
            }  
		}
        
    }
</script>
<style lang="less" scoped>

.container{
    height: 100vh;

}
</style>