
<template>
         <view class="container">
            <view class="navTitle">
                <view class="nav-city">
                    <picker @change="PickerChange" :value="cityIndex" :range="cityArr" range-key="name">
                        <view class="picker">
                            {{cityArr[cityIndex].name}}<u-icon name="arrow-down"></u-icon>
                        </view>
                        
                    </picker>
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
                    <!-- #ifdef APP-PLUS || H5 -->
                    <view @click="echarts.onClick" :prop="option" :change:prop="echarts.updateEcharts" id="echarts1" class="echarts" ref="echarts1"></view>
                    <!-- #endif -->
                </view>
                <view class="airButton air-flex">
                    <view class="a-button" v-bind:class="[ item.code == buttonCode ? 'b_button' : '']" v-for="(item,index) in airButtonArr" :key="index" @click="airButtomChange(item)">  <view v-html="item.html" class="b-text"></view> </view>
                </view>
                <view class="airButton air-flex">
                    <view class="a-button" style="width:30%;" v-bind:class="[ item.code == buttonCode ? 'b_button' : '']" v-for="(item,index) in buttonArr" :key="index" @click="airButtomChange(item)">  <view v-html="item.html" class="b-text"></view> </view>
                </view>
            </view>

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
                chineseDateMonth:'',//显示当前年与月
                starttime:'',//查询当月开始时间 格式YYYYMMDDhhmmss
                endtime:'',//查询当月结束时间 格式YYYYMMDDhhmmss
                calendarData:[],//当月时间数组
                lowerShow:false,//如果为当年当月右侧图表不显示
                airButtonArr:[
                    {code:'aqi',name:'AQI',html:'AQI'},
                    {code:'pm25',name:'PM2.5',html:'PM<sub>2.5</sub>'},
                    {code:'pm10',name:'PM10',html:'PM<sub>10</sub>'},
                    {code:'o3',name:'O3',html:'O<sub>3</sub>'},
                    {code:'so2',name:'SO2',html:'SO<sub>2</sub>'},
                    {code:'no2',name:'NO2',html:'NO<sub>2</sub>'},
                    {code:'co',name:'CO',html:'CO'},
                    {code:'shuiwen',name:'水温',html:'水温'},
                ],
                buttonArr:[
                    {code:'sidu',name:'相对湿度',html:'相对湿度'},
                    {code:'fen',name:'风速',html:'风速'},
                    {code:'jisnghui',name:'降水量',html:'降水量'},
                ],
                buttonCode:'aqi',
                strObj:{'PM2.5':`PM<sub>2.5</sub>`,'PM25':'PM<sub>2.5</sub>','PM10':'PM<sub>10</sub>','SO2':`SO<sub>2</sub>`,'NO2':'NO<sub>2</sub>','o3':'O<sub><sub>3</sub>','O3-8h':'O<sub><sub>3</sub>','O3':'O<sub><sub>3</sub>','-':'-'},
                returnDate:'',//当前日期
                airObj:{},
                cityname:'邢台市',
                citycode:'130500',//城市编码
                cityIndex: 0,
                cityArr:[{code:'130500',name:"邢台市" } ,{code:'130400',name:"邯郸市" }],
                dayDataArr:[],
                option:{},//echart 图表数据
                echatName:'AQI',
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
            PickerChange(e) {
                if( this.cityIndex == e.detail.value){
                    return
                }
                this.cityIndex = e.detail.value
                this.citycode = this.cityArr[e.detail.value].code;
                this.cityname = this.cityArr[e.detail.value].name;
               
			},
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
                        this.queryDayData();
                    }
                })
            },
            queryDayData(){//查询切换日期

                let date = new Date(this.returnDate);
                console.log(this.returnDate)                
                let starttime = `${getDateYMD(dateAdd(new Date(this.returnDate),'d',-0),'')}000000`;
                let endtime = `${getDateYMD(dateAdd(new Date(this.returnDate),'d',-0),'')}230000`;
                let params = {
                    starttime:starttime,
                    endtime:endtime,
                    type:'hour',
                    citycode:this.citycode
                }
                this.$http('/airMoniData/getCityMoniListByLongTime',params,'Get').then(res=>{
                    if(res.data.result && res.data.result.length>0){
                        this.dayDataArr = res.data.result;
                        this.setBarEchart();
                    }
                })
                console.log(params)
            },
            setBarEchart(){//设置折线图
                //因为有可能日期不是全的
                var t = 0;
                let arr = [];
                var endtime = new Date( `${this.returnDate} 23:00:00` );
                let startInitialDate = this.returnDate;
                while(dateAdd(new Date(startInitialDate+" 00:00:00"),'h',t)<=endtime)//遍历日期时间
                {
                var times =getDateYMDHMS(dateAdd(new Date(startInitialDate+" 00:00:00"),'h',t));//获得日期
                var foreValue 
                    for(let i=0;i<this.dayDataArr.length;i++)//遍历模型下面的数组
                    {
                        if(times==this.dayDataArr[i]["datatime"])//根据时间查找当天的预报值
                        {
                            foreValue=this.dayDataArr[i][this.buttonCode];
                        break;
                        }else{
                            foreValue = null;
                        }
                    }
                    arr.push([times,foreValue])
                    t=t+1;
                }
                let _self = this;
                this.option = {
                    tooltip: {
                        trigger: 'axis',
                        confine:true,
                    },
                    grid: {  
                        left: '10%',  
                        right: '8%', 
                        top: '10%',  
                        bottom: '10%',
                    },
					xAxis: {
                        type : 'time',
                        axisLine:{lineStyle:{color:"#9898a4"}},
                        splitLine:{show:false},
                        axisLabel: {
                                interval: 'auto',
                                // showMaxLabel:false,
                                formatter: (params,index)=>
                                {
                                    let date = new Date(params)
                                    let str =  `${addZero(date.getHours())}:00`;
                                    console.log(str)
                                    return str
                                }
                        },
                    },
                    //9898a4
					yAxis: {
                        axisLine:{show:false, lineStyle:{color:"#9898a4"}},
                        axisTick:{show:false},
                        splitLine:{
                            lineStyle:{
                                type:'dashed'
                            }
                        }
                    },
					series: [{
						name: this.echatName,
                        type: 'bar',
                        // color: function(params){
                        //     console.log(params)
                        //     return  getPollLevelColor(_self.buttonCode,params.data[1],'hour')
                        // },
                        itemStyle: {
                            normal: {
                                color: function(params) {
                                    console.log( getPollLevelColor(_self.buttonCode,params.data[1],'hour'),'=-====')
                                    return getPollLevelColor(_self.buttonCode,params.data[1],'hour')
                                },
                            }
                        },
						data: arr
					}]
                }
                

            },
            dateChange(e){
                //返回日期
                let date = new Date(e.date);
                this.returnDate = e.date;
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
            },
            airButtomChange(item){
                if( this.buttonCode !== item.code){
                    this.buttonCode = item.code;
                    this.echatName = item.name;
                    this.setBarEchart()
                }
                
            },
            
		}
        
    }
</script>

<script module="echarts" lang="renderjs">
	var myChart
	export default {
		mounted() {
			if (typeof window.echarts === 'function') {
				this.initEcharts()
			} else {
				// 动态引入较大类库避免影响页面展示
				const script = document.createElement('script')
				// view 层的页面运行在 www 根目录，其相对路径相对于 www 计算
				script.src = 'static/echarts.js'
				script.onload = this.initEcharts.bind(this)
				document.head.appendChild(script)
			}
		},
		methods: {
			initEcharts() {
                myChart = echarts.init(document.getElementById('echarts1'))
				// 观测更新的数据在 view 层可以直接访问到
				myChart.setOption(this.option)
			},
			updateEcharts(newValue, oldValue, ownerInstance, instance) {
                // 监听 service 层数据变更
                if(myChart){
                    console.log();
                    myChart.setOption(newValue)
                }
			},
			onClick(event, ownerInstance) {
				// 调用 service 层的方法
				// ownerInstance.callMethod('onViewClick', {
				// 	test: event
				// })
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
            .picker{
                height: 38px;
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
            }
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
            // border: 1px solid cadetblue;
            .echarts{
                height: 100%;
                width: 100%;
            }
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