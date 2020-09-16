
<template>
         <view class="container">
            <view class="navTitle">
                <view class="nav-city">
                    城市
                </view>
                <view class="nav-date">
                    <view class="date-box" >
                        <view class="date-left" @click="upper"> <view class="circular"> <u-icon name="arrow-left" style="color:eee;"></u-icon></view> </view>
                        <view class="date-center"> {{chineseDateMonth}} </view>
                        <view class="date-right" @click="lower"><view class="circular" v-if="lowerShow"> <u-icon name="arrow-right" style="color:eee;"></u-icon></view> </view>
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

            <view class="month">
                <view class="month-title">
                    <text class="title-text">9月统计</text>
                </view>
                <!-- 污染等级 -->
                <view class="title-level">
                    <view class="level-left">等级天数:</view>
                    <view class="level-right"> 
                        <view class="level-li"> 
                            <view class="level-text">优</view>
                            <view class="level-circular" style="background:#00e400;"> <text class="texts">{{excellent}}</text> </view>
                        </view>
                        <view class="level-li"> 
                            <view class="level-text">良</view>
                            <view class="level-circular" style="background:#ffee00;"> <text class="texts">{{good}}</text> </view>
                        </view>
                        <view class="level-li"> 
                            <view class="level-text">轻度</view>
                            <view class="level-circular" style="background:#ff7e00;"> <text class="texts">{{light}}</text> </view>
                        </view>
                        <view class="level-li"> 
                            <view class="level-text">中度</view>
                            <view class="level-circular" style="background:#ff0000;"> <text class="texts"> {{moderate}} </text> </view>
                        </view>
                        <view class="level-li"> 
                            <view class="level-text">重度</view>
                            <view class="level-circular" style="background:#99004c;"> <text class="texts"> {{severe}}</text> </view>
                        </view>
                        <view class="level-li"> 
                            <view class="level-text">严重</view>
                            <view class="level-circular" style="background:#7e0023;"> <text class="texts"> {{serious}} </text> </view>
                        </view>
                    </view>
                </view>
                <!-- 首要污染物 -->
                <view class="primarypols">
                    <view class="primarypols-left">首要污染物:</view>
                    <view class="primarypols-right">
                        <view class="primarypols-li">
                            <view class="primarypols-text">PM<sub>2.5</sub> </view>
                            <view class="primarypols-circular"> <text class="texts">{{pm25}}</text> </view>
                        </view>
                        <view class="primarypols-li">
                            <view class="primarypols-text">PM<sub>10</sub> </view>
                            <view class="primarypols-circular"> <text class="texts">{{pm10}}</text> </view>
                        </view>
                        <view class="primarypols-li">
                            <view class="primarypols-text">O<sub>3</sub> </view>
                            <view class="primarypols-circular"> <text class="texts">{{o3}}</text> </view>
                        </view>
                        <view class="primarypols-li">
                            <view class="primarypols-text">SO<sub>2</sub> </view>
                            <view class="primarypols-circular"> <text class="texts">{{so2}}</text> </view>
                        </view>
                        <view class="primarypols-li">
                            <view class="primarypols-text">NO<sub>2</sub> </view>
                            <view class="primarypols-circular"> <text class="texts">{{no2}}</text> </view>
                        </view>
                        <view class="primarypols-li">
                            <view class="primarypols-text">CO</view>
                            <view class="primarypols-circular"> <text class="texts">{{co}}</text> </view>
                        </view>
                    </view>
                </view>
            </view>
            <view style="width:100vw;height:12px;background:#f3f7fa;"></view>
            
            <!-- 当天城市信息 -->
            <view class="dayInfo">
                <view class="dayInfo-left">
                    <view class="left-box" :style="{backgroundColor:airObj.backgroundColor}">
                        <view class="border-white">
                            <view class="box-content" :style="{backgroundColor:airObj.backgroundColor}">
                                <view class="box-top"> <view class="box-circular"> </view> </view>
                                <view class="box-center"> <view class="box-font"> {{airObj.aqi}} </view>  </view>
                                <view class="box-bottom">
                                    <view class="box-size">AQI: {{airObj.leave}}</view>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
                <view class="dayInfo-right">
                    <view class="right-title">
                        <view class="title-top">
                            <view class="title-top-left">
                                {{cityname}}
                            </view>
                            <view class="title-top-right">
                                {{airObj.datatime}}
                            </view>
                        </view>
                        <view class="title-center">
                            细颗粒物: <text v-html="airObj.primarypols"></text>
                        </view>
                        <view class="title-bottom">
                            <view class="title-li">
                                <view class="li-left"> CO </view>
                                <view class="li-right"> {{airObj.co}} </view>
                            </view>
                            <view class="title-li">
                                <view class="li-left"> NO<sub>2</sub> </view>
                                <view class="li-right"> {{airObj.no2}} </view>
                            </view>
                            <view class="title-li">
                                <view class="li-left"> O<sub>3</sub>_8h </view>
                                <view class="li-right"> {{airObj.o3}} </view>
                            </view>
                            <view class="title-li">
                                <view class="li-left"> PM<sub>10</sub> </view>
                                <view class="li-right"> {{airObj.pm10}} </view>
                            </view>
                            <view class="title-li">
                                <view class="li-left">  PM<sub>2.5</sub> </view>
                                <view class="li-right"> {{airObj.pm25}} </view>
                            </view>
                            <view class="title-li">
                                <view class="li-left">  SO<sub>2</sub> </view>
                                <view class="li-right"> {{airObj.so2}} </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            
            <!-- 灰色区域 -->
            <view class="greyArea">
                <view class="chart">
                    图表
                </view>
                <view class="airButton air-flex">
                    <view class="a-button" v-bind:class="[ item.code == buttonCode ? 'b_button' : '']" v-for="(item,index) in airButtonArr" :key="index" @click="airButtomChange(item)">  <view v-html="item.name" class="b-text"></view> </view>
                </view>
                <view class="airButton air-flex">
                    <view class="a-button" style="width:30%;" v-bind:class="[ item.code == buttonCode ? 'b_button' : '']" v-for="(item,index) in buttonArr" :key="index" @click="airButtomChange(item)">  <view v-html="item.name" class="b-text"></view> </view>
                </view>
            </view>

        </view>
</template>
<script>
import calendar from "@/components/calendar/index.vue"
import {getLastDateOfMonth,getDateYMD,getLastDateDay,getDateYM,addZero,dateAdd} from '@/utils/date.js'
import { getAqiLevels,getAqiColor} from '@/utils/aqi.js'
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
                lowerShow:false,
                airButtonArr:[
                    {code:'aqi',name:'AQI'},
                    {code:'pm25',name:'PM<sub>2.5</sub>'},
                    {code:'pm10',name:'PM<sub>10</sub>'},
                    {code:'o3',name:'O<sub>3</sub>'},
                    {code:'so2',name:'SO<sub>2</sub>'},
                    {code:'no2',name:'NO<sub>2</sub>'},
                    {code:'co',name:'CO'},
                    {code:'shuiwen',name:'水温'},
                ],
                buttonArr:[
                    {code:'sidu',name:'相对湿度'},
                    {code:'fen',name:'风速'},
                    {code:'jisnghui',name:'降水量'},
                ],
                buttonCode:'aqi',
                strObj:{'PM2.5':`PM<sub>2.5</sub>`,'PM25':'PM<sub>2.5</sub>','PM10':'PM<sub>10</sub>','SO2':`SO<sub>2</sub>`,'NO2':'NO<sub>2</sub>','o3':'O<sub><sub>3</sub>','O3-8h':'O<sub><sub>3</sub>','O3':'O<sub><sub>3</sub>','-':'-'},
                returnDate:'',//当前日期
                airObj:{},
                cityname:'邢台市'
            }
        },
		onLoad() {
			setTimeout(function(){
				//关闭启动界面。
                // #ifdef  APP-PLUS  
                    plus.navigator.closeSplashscreen() 
                // #endif
            },3000)
            

            let date = new Date();
            this.starttime = `${getDateYM(dateAdd(new Date(),'d',-0),'')}01000000`;
            this.endtime = `${getDateYM(dateAdd(new Date(),'d',-0),'')}${addZero(getLastDateDay(new Date()))}000000`;
            
            this.chineseDateMonth = `${date.getFullYear()}年${date.getMonth()+1}月`
            this.returnDate = `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`
            this.queryData();
        },
        computed: {
            excellent(){//优
                let count = 0;
                this.calendarData.map(item=>{
                    let aqilevel = getAqiLevels(item.aqi);
                    if(aqilevel == '优' ){
                        count+=1;
                    }
                })
                return count
            },
            good(){//良
                let count = 0;
                this.calendarData.map(item=>{
                    let aqilevel = getAqiLevels(item.aqi);
                    if(aqilevel == '良' ){
                        count+=1;
                    }
                })
                return count
            },
            light(){//轻度
                let count = 0;
                this.calendarData.map(item=>{
                    let aqilevel = getAqiLevels(item.aqi);
                    if(aqilevel == '轻度' ){
                        count+=1;
                    }
                })
                return count
            },
            moderate(){//中度
                let count = 0;
                this.calendarData.map(item=>{
                    let aqilevel = getAqiLevels(item.aqi);
                    if(aqilevel == '中度' ){
                        count+=1;
                    }
                })
                return count
            },
            severe(){//重度
                let count = 0;
                this.calendarData.map(item=>{
                    let aqilevel = getAqiLevels(item.aqi);
                    if(aqilevel == '重度' ){
                        count+=1;
                    }
                })
                return count
            },
            serious(){//严重
                let count = 0;
                this.calendarData.map(item=>{
                    let aqilevel = getAqiLevels(item.aqi);
                    if(aqilevel == '严重' ){
                        count+=1;
                    }
                })
                return count
            },
            pm25(){
                let count = 0;
                this.calendarData.map(item=>{
                    if(item.primarypol == 'PM2.5' ){
                        count+=1;
                    }else if(item.primarypol == 'PM25' ){
                        count+=1;
                    }else if(item.primarypol == 'pm25' ){
                        count+=1;
                    }
                })
                return count
            },
            pm10(){
                let count = 0;
                this.calendarData.map(item=>{
                    if(item.primarypol == 'PM10' ){
                        count+=1;
                    }else if(item.primarypol == 'pm10' ){
                        count+=1;
                    }
                })
                return count
            },
            o3(){
                let count = 0;
                this.calendarData.map(item=>{
                    if(item.primarypol == 'O3-8h' ){
                        count+=1;
                    }else if(item.primarypol == 'O3' ){
                        count+=1;
                    }else if(item.primarypol == 'o3' ){
                        count+=1;
                    }
                })
                return count
            },
            so2(){
                let count = 0;
                this.calendarData.map(item=>{
                    if(item.primarypol == 'SO2' ){
                        count+=1;
                    }else if(item.primarypol == 'so2' ){
                        count+=1;
                    }
                })
                return count
            },
            no2(){
                let count = 0;
                this.calendarData.map(item=>{
                    if(item.primarypol == 'NO2' ){
                        count+=1;
                    }else if(item.primarypol == 'no2' ){
                        count+=1;
                    }
                })
                return count
            },
            co(){
                let count = 0;
                this.calendarData.map(item=>{
                    if(item.primarypol == 'CO' ){
                        count+=1;
                    }else if(item.primarypol == 'co' ){
                        count+=1;
                    }
                })
                return count
            }
        },
		methods:{
            queryData(){//查询数据
                let params = {
                    starttime:this.starttime,
                    endtime:this.endtime,
                    type:'day',
                    citycode:this.citycode
                }
                this.$http('/airMoniData/getCityMoniListByLongTime',params,'Get').then(res=>{
                    if(res.data.result && res.data.result.length>0){
                        this.calendarData = res.data.result;
                        this.selectDate();
                    }
                })
            },
            dateChange(e){
                //返回日期
                let date = new Date(e.date);
                this.returnDate = e.date;
                // console.log(e)
                this.selectDate();
            },

            dateMonthChange(e){
                this.chineseDateMonth = e.chineseDateMonth;
                this.starttime = `${getDateYM(dateAdd(new Date(e.date),'d',-0),'')}01000000`;
                this.endtime = `${getDateYM(dateAdd(new Date(e.date),'d',-0),'')}${addZero(getLastDateDay(new Date()))}000000`;

                let date = new Date()
                if( (e.year == date.getFullYear()) && (e.month == date.getMonth() + 1) ){
                    this.lowerShow = false
                }else{
                    this.lowerShow = true;
                }
                this.returnDate = e.date;
                this.queryData();
            },
            backToday(){
                this.$refs.calendar.backToday();//返回今天
            },
            upper(){//上个月
                this.$refs.calendar.upper();
            },
            lower(){//下个月
                this.$refs.calendar.lower();
            },
            selectDate(){
                let date = new Date(this.returnDate);
                let obj = {}
                this.calendarData.map(item=>{
                    let day = new Date(item.datatime.replace(/-/g, '/')).getDate();
                    if(day == date.getDate()){
                        obj = item;
                    }
                })
                if( JSON.stringify(obj) == "{}"){
                    
                    this.airObj = {
                        datatime:`${date.getFullYear()}-${addZero(date.getMonth()+1)}-${addZero(date.getDate())}`,
                        o3:'',
                        pm10:'',
                        co:'',
                        pm25:'',
                        aqi:'0',
                        no2:'',
                        so2:'',
                        backgroundColor:this.airObj.backgroundColor,
                        primarypol:'-',
                        primarypols:'-',
                    }
                }else{
                    this.airObj = {
                        o3:obj.o3_8h,
                        pm10:obj.pm10,
                        co:obj.co,
                        pm25:obj.pm25,
                        aqi:obj.aqi,
                        no2:obj.no2,
                        so2:obj.so2,
                        primarypols:this.strObj[obj.primarypol],
                        primarypol:obj.primarypol,
                        leave:getAqiLevels(obj.aqi),
                        backgroundColor:getAqiColor(obj.aqi),
                        datatime:obj.datatime.split(' ')[0]
                    }
                }
                // console.log(this.returnDate,date.getDate())  2013.22  0.88 2012.34
            },
            airButtomChange(item){
                if( this.buttonCode !== item.code){
                    this.buttonCode = item.code
                }
                
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
    .month{
        width: 100vw;
        padding-bottom: 5px;
        .month-title{
            height: 40px;
            line-height: 40px;
            width: 100%;
            border-bottom: 1px solid #b2b2b2;
            .title-text{
                padding-left: 10px;
            }
        }
        .title-level{
            width: 100vw;
            height: 30px;
            line-height: 30px;
            display: flex;
            .level-left{
                padding-left: 10px;
                width: 70px;
            }
            .level-right{
                width: calc(100% - 70px );
                height: 100%;
                display: flex;
                .level-li{
                    display: flex;
                    align-items: center;
                    .level-text{
                         margin: 0 5px;
                         color: #75797a;
                    }
                    .level-circular{
                        width: 15px;
                        height: 15px;
                        border-radius: 50%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        .texts{
                            font-size: 10px;
                            color: #FFF;
                        }
                    }
                }
            }
        }
        .primarypols{
            width: 100%;
            display: flex;
            .primarypols-left{
                width: 90px;
                height: 30px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .primarypols-right{
                width: calc(100% - 90px);
                min-height: 30px;
                display: flex;
                // justify-content: center;
                align-items: center;
                flex-wrap: wrap;
                .primarypols-li{
                    display: flex;
                    height: 100%;
                    align-items: center;
                    .primarypols-text{
                         margin: 0 4px;
                         color: #75797a;
                         font-size: 10px;
                    }
                    .primarypols-circular{
                        width: 15px;
                        height: 15px;
                        border-radius: 50%;
                        background: #5c94ff;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        .texts{
                            font-size: 10px;
                            color: #FFF;
                        }
                    }
                }
            }
        }
    }
    .dayInfo{
        height: 155px;
        width: 100vw;
        background: #FFF;
        display: flex;
        .dayInfo-left{
            width: 145px;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            .left-box{
                width: 110px;
                height: 110px;
                background: #eee;
                z-index: 1;
                display: flex;
                justify-content: center;
                align-items: center;
                .border-white{
                    width: 100px;
                    height: 100px;
                    background: #FFF;
                    z-index: 2;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    .box-content{
                        width: 96px;
                        height: 96px;
                        background: #eee;
                        z-index: 3;
                        .box-top{
                            height: 18px;
                            width: 100%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            .box-circular{
                                height: 8px;
                                width: 8px;
                                border-radius: 50%;
                                background: #FFF;
                            }
                        }
                        .box-center{
                            height: calc(100% - 48px );
                            width: 100%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            .box-font{
                                color: #fff;
                                font-size: 24px;
                            }
                        }
                        .box-bottom{
                            height: 30px;
                            width: 100%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            .box-size{
                                color: #FFF;
                                font-size: 12px;
                            }
                        }
                    }
                }
            }
        }
        .dayInfo-right{
            width: calc(100% - 145px);
            height: 100%;
            display: flex;
            align-items: center;
            .right-title{
                width: 100%;
                height: 110px;
                padding: 0 5px;
                // background: chartreuse;
                .title-top{
                    height: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    .title-top-left{
                        font-size: 18px;
                        color: #262626;
                    }
                    .title-top-right{
                        font-size: 12px;
                        color: #777777;
                    }
                }
                .title-center{
                    height: 30px;
                    line-height: 30px;
                    font-size: 14px;
                    color: #262626;
                }
                .title-bottom{
                    height: calc(100% - 62px );
                    width: 100%;
                    display: flex;
                    flex-wrap: wrap;
                    .title-li{
                        width: 30%;
                        height: 30px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        .li-left{
                            padding-right: 5px;
                            font-size: 10px;
                        }
                        .li-right{
                            padding-left: 5px;
                            font-size: 12px;
                            color: #000;
                        }
                    }
                }
            }
            
        }
    }
    .greyArea{
        background: #f5f6f8;
        width: 100vw;
        padding: 0 10px;
        .chart{
            height: 200px;
            width: 100%;
            border: 1px solid cadetblue;
        }
        .air-flex{
            display: flex;
            justify-content: space-around;
            align-items: center;
            .b-text{
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 10px;
            }
        }
        .airButton{
            height: 42px;
            .a-button{
                height: 30px;
                width: 11.5%;
                border-radius: 5px;
                background: #FFF;
                display: flex;
                justify-content: center;
                color: #686868;
            }
            .b_button{
                color: #FFF;
                background: #1f8cf1;
            }
        }
    }
}
</style>