<template>
    <view class="calendar">
        <!-- <view  class="title">
            <view class="nex" @click="upper">上个月</view>
            <view class="nex" style="width:150px" @click="backToday">时间:{{currentYear}}-{{currentMonth}}-{{currentDay}} </view>
            <view class="nex" @click="lower">下个月</view>
        </view>  -->
    
        <view class="week-header">
            <view class="month" v-for="(item,i) in week" :key="i">{{item}}</view>
        </view>
        <view class="week-date">
                <view class="every-day" v-for="(pre) in preDay" :key="pre+'preDay'" style="color:#999;">
                    <view class="every-box" style=" background: #eee;" >
                        <view class="top-days">{{getLastMonthSize()-preDay+pre }}</view>
                        <view class="bottom-primarypol">-</view>
                    </view>
                    
                </view>
                <view class="every-day" v-for="(count) in monthSize" :key="count+'monthSize'">
                    <view class="every-box"  :class="{dateSelect:count == currentDay }" @click="dateClick({index:count})" :style="{background:listData[count-1] && listData[count-1].background?listData[count-1].background:'',color:listData[count-1] && listData[count-1].color?listData[count-1].color:'',}">
                        <view class="top-days">{{count}}</view>
                        <view class="bottom-primarypol"> <text v-if="listData[count-1]"> <text v-html="listData[count-1].air"></text> </text>  <text v-else>-</text>  </view>
                        
                    </view>
                    
                </view>
                <view class="every-day" v-for="next in nextDay" :key="next + 'nextDay'" style="color:#999">
                   <view class="every-box">
                       <view class="top-days">{{next}}</view>
                        <view class="bottom-primarypol">-</view>
                    </view> 
                </view>
            </view>
    </view>
</template>

<script>
import {getLastDateOfMonth,getDateYMD,getLastDateDay} from '@/utils/date.js'
import {getAqiColor,getAqiTextColor} from '@/utils/aqi.js'
export default {
    name:"calendar",
    props:{
        calendarData:{
            type: Array,//必传
        }
    },
    data() {
        return {
            currentDay: "",//当前日期
            currentMonth: "",//当前月份
            currentYear: "",//当前年份
            preDay:0,//1号前需要多少天
            nextDay:0,//月底后面需要多少天
            monthSize:0,//当前月份 有多少天
            week:['日','一','二','三','四','五','六'],
            monthList:[31,28,31,30,31,30,31,31,30,31,30,31],
            listData:[],//数据
            strObj:{'PM2.5':`PM<sub>2.5</sub>`,'PM25':'PM<sub>2.5</sub>','PM10':'PM<sub>10</sub>','SO2':`SO<sub>2</sub>`,'NO2':'NO<sub>2</sub>','o3':'O<sub><sub>3</sub>'},
            // wrwObj:{aqi:'AQI','pm25':'PM2.5','pm10':'PM10','so2':'SO2','o3':'O3','no2':'NO2','co':'CO','o3_8h':'O3' },

        }
    },
    created() {
        this.getCurrent();
        this.getLastMonthSize();
        this.getNextMonthSize();

    },
    computed: {

    },
    watch: {
        calendarData(val){//当数据发生变化时
            // this.initCelendarData();
        }
    },
    methods: {
        initCelendarData(){//值发生变化
            let dataArr = []
            this.calendarData.map(item=>{
                let day =new Date(item.datatime.replace(/-/g, '/')).getDate();
                item['day'] = day;
                if(item.primarypol == 'O3-8h' ){
                    item.primarypol = 'o3'
                }

                item['background'] = getAqiColor(item.aqi);
                item['color'] = getAqiTextColor(item.aqi);
                item['air'] = this.strObj[item.primarypol]
                dataArr.push(item)
            })
            this.listData = dataArr
            console.log(dataArr,'1')
        },
        getCurrent(){
            //获取年月日
            const date = new Date();
            this.currentYear = date.getFullYear();
            this.currentMonth = date.getMonth()+1;
            this.currentDay = date.getDate();
            //判断闰年
            if( (this.currentYear % 4 === 0 && this.currentYear % 100 !== 0 ) || (this.currentYear % 400 === 0) ){
                this.monthList[1] = 29;
            }else{
                this.monthList[1] = 28;
            }
        },
        getLastMonthSize(){
            //获取当月的天数
            this.monthSize = getLastDateDay(new Date(`${this.currentYear}/${this.currentMonth}`) );
            //获取本月第一天是星期几
            const  firstDay = new Date(`${this.currentYear}/${this.currentMonth/1}`).getDay();
            //当月一号前面的上月剩余天数
            this.preDay = firstDay === 7 ? 0 : firstDay;
            //获取上月天数大小,这个月是1的话上个月就是12, 就是31天
            return this.currentMonth - 1 === 0 ? 31 : this.monthList[ this.currentMonth -2 ];
        },
        getNextMonthSize(){
            //获取当月天数
            this.monthSize = getLastDateDay(new Date(`${this.currentYear}/${this.currentMonth}`) );
            //获取本月最后一天是星期几
            const lastDay = new Date(`${this.currentYear}/${this.currentMonth}/${this.monthSize}`).getDay();
            this.nextDay  = lastDay === 7 ? 6 : 6 - lastDay;
        },
        upper(){//上个月
            this.currentMonth = (this.currentMonth - 1);
            if( this.currentMonth == 0){//当他为0时
                this.currentMonth = 12;//初始化到12月
                this.currentYear = (this.currentYear  - 1);
            }
            this.listData = [];
            this.getLastMonthSize();
            this.getNextMonthSize();

            this.judgeDay();
        },
        lower(){//下个月
            let date = new Date();
            if( this.currentMonth == (date.getMonth()+1) && this.currentYear == (date.getFullYear()) ){//当他为今年今月时,不让他执行下一个月
                return;
            }
            this.currentMonth = (this.currentMonth + 1);
            if( this.currentMonth > 12){//当他为13时
                this.currentMonth = 1;//初始化到1月
                this.currentYear = (this.currentYear  + 1);
            }
            this.listData = [];
            this.getLastMonthSize();
            this.getNextMonthSize();
            this.judgeDay();
        },
        judgeDay(){//切换月份
            let lastDay= getLastDateDay(new Date(`${this.currentYear}/${this.currentMonth}`));
            if(  (Number(this.currentDay)) > (Number(lastDay)   ) ){
                this.currentDay = lastDay;
            }
            //返回日期
            this.$emit('dateMonthChanges',{
                date:`${this.currentYear}/${this.currentMonth}/${this.currentDay}`,
                chineseDateMonth:`${this.currentYear}年${this.currentMonth}月`,
                month:this.currentMonth,
                year:this.currentYear,
                })
        },
        dateClick(obj){//点击日期
            this.currentDay = obj.index;
            //点击时返回
            this.$emit('dateChanges',{
                date:`${this.currentYear}/${this.currentMonth}/${this.currentDay}`,
                })
        },
        backToday(){//返回今天
            const date = new Date();
            if( (this.currentYear == date.getFullYear()) && (this.currentMonth == (date.getMonth()+1)) && (this.currentDay == date.getDate()) ){//当他为今天时 不发生任何变化
                return
            }
            this.currentYear = date.getFullYear();
            this.currentMonth = date.getMonth()+1;
            this.currentDay = date.getDate();

            this.getLastMonthSize();
            this.getNextMonthSize();
            this.judgeDay();
        }


    },
}
</script>

<style lang="less" scoped>
.calendar{
    width: 100vw;
    .title{
        display: flex;
        margin-left: 50px;
        .nex{
            width: 60px;
            height: 40px;
            text-align: center;
            line-height: 40px;
        }
    }
    .week-header{
        margin: 0;
        padding: 10px 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        .month{
            display: inline-block;
            width: 13.6%;
            text-align: center;
        }
    }
    .week-date{
        padding: 0;
        background: #ffffff;
        margin: 0;
        display: flex;
        flex-wrap: wrap;
        font-size: 12px;
        justify-content: space-around;
        .every-day{
            display: inline-block;
            width: 14.2%;
            padding-bottom: 5px;
            .every-box{
                display: flex;
                justify-content: center;
                align-items: center;
                width: 80%;
                height: 45px;
                margin: 0 10%;
                padding: 0 5px;
                flex-wrap: wrap;
                background: #eee;
                .top-days{
                    height: 20px;
                    line-height: 20px;
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .bottom-primarypol{
                    height: 30px;
                    line-height: 10px;
                    width: 100%;
                    font-size: 8px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    
                }
            }
            .dateSelect{
                border: 1px solid #92a7f6;
            }
        }
    }
}
</style>
