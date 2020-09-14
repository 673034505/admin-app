
<template>
         <view class="container">
			<u-button type="primary"  @click="golist">主要按钮</u-button>
            <button type="default" @click="golist">跳转</button>
            <view class="navTitle">
                <view class="nav-city">
                    城市
                </view>
                <view class="nav-date">
                    <view class="date-box" >
                        <view class="date-left" @click="upper"> <view class="circular"> <u-icon name="arrow-left" style="color:eee;"></u-icon></view> </view>
                        <view class="date-center"> {{chineseDateMonth}} </view>
                        <view class="date-right" @click="lower"><view class="circular"> <u-icon name="arrow-right" style="color:eee;"></u-icon></view> </view>
                    </view>
                </view>
                <view class="nav-today">
                    <button type="default" class="nav-button" @click="backToday">返回今天</button>
                </view>
            </view>
            <calendar 
            @dateChanges="dateChange"
            @dateMonthChanges="dateMonthChange"
            :calendarData="calendarData"
            ref="calendar"
            />
            
        </view>
</template>
<script>
import calendar from "@/components/calendar/index.vue"
import {getLastDateOfMonth,getDateYMD,getLastDateDay,getDateYM,addZero,dateAdd} from '@/utils/date.js'
    export default {
        components: {
            calendar
        },
        data() {
            return {
                items:50,
                TabCur: 0,
                scrollLeft: 0,
                chineseDateMonth:'',
                citycode:'130500',//城市编码
                starttime:'',
                endtime:'',
                calendarData:[],
            }
        },
		onLoad() {
			setTimeout(function(){
				//关闭启动界面。
                // #ifdef  APP-PLUS  
                    plus.navigator.closeSplashscreen() 
                // #endif
            },3000)
            

            // let date = new Date('2020/8');
            // console.log( getDateYMD( getLastDateOfMonth(date)) )
            // console.log(getLastDateDay(date))
        // this.starttime = `${getDateYMDH(dateAdd(new Date(),'h',-18),'')}0000`;
            let date = new Date();
            this.starttime = `${getDateYM(dateAdd(new Date(),'d',-0),'')}01000000`;
            this.endtime = `${getDateYM(dateAdd(new Date(),'d',-0),'')}${addZero(getLastDateDay(new Date()))}000000`;
            
            this.chineseDateMonth = `${date.getFullYear()}年${date.getMonth()+1}月`

            this.queryData();
		},
		methods:{
			golist(){
				this.$navTo('navBar/list/list',{id:'123',name:'刘燃燃'})
				// this.$http('/airMoniData/getCityInfoByTime',{},'GET').then(res=>{
				// 	console.log(res)
				// })
            },
            dateChange(e){
                //返回日期
                let date = new Date(e.date);
                
                console.log(e)
            },
            dateMonthChange(e){
                this.chineseDateMonth = e.chineseDateMonth;
                this.starttime = `${getDateYM(dateAdd(new Date(e.date),'d',-0),'')}01000000`;
                this.endtime = `${getDateYM(dateAdd(new Date(e.date),'d',-0),'')}${addZero(getLastDateDay(new Date()))}000000`;
                this.queryData();
            },
            backToday(){
                console.log('执行了')
                this.$refs.calendar.backToday();//返回今天
            },
            upper(){//上个月
                this.$refs.calendar.upper();
            },
            lower(){//下个月
                this.$refs.calendar.lower();
            },
            queryData(){
                let params = {
                    starttime:this.starttime,
                    endtime:this.endtime,
                    type:'day',
                    citycode:this.citycode
                }
                this.$http('/airMoniData/getCityMoniListByLongTime',params,'Get').then(res=>{
                    if(res.data.result && res.data.result.length>0){
                        this.calendarData = res.data.result
                    }
                })
            }
		}
        
    }
</script>
<style lang="less" scoped>

.container{
    height: 100vh;
    
    .navTitle{
        height: 40px;
        width: 100vw;
        display: flex;
        .nav-city{//城市
            width: 70px;
            height: 100%;
        }
        .nav-date{//日期
            width: calc(100% - 170px );
            height: 100%;
            display: flex;
            justify-content: center;
            .date-box{
                width: 150px;
                height: 100%;
                display: flex;
                justify-content: center;
                .date-left{
                    height: 100%;
                    width: 30px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .circular{
                    height: 25px;
                    width: 25px;
                    border-radius: 50%;
                    border: 1px solid #eee;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .date-center{
                     height: 100%;
                     width: calc(100% - 60px);
                     display: flex;
                     justify-content: center;
                     align-items: center;
                     color: #000;
                     font-size: 14px;
                     font-weight: 700;
                }
                .date-right{
                    height: 100%;
                    width: 30px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }
        }
        .nav-today{//返回今天
            width: 100px;
            height: 100%;
            // border:1px solid yellow;
            
            display: flex;
            justify-content: center;
            align-items: center;
            .nav-button{
                width: 80px;
                height: 30px;
                font-size: 12px;
            }
        }
    }
}
</style>