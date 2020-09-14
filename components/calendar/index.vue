<template>
    <view class="calendar">
        <view  class="title">
            <view class="nex" @click="upper">上个月</view>
            <view class="nex" style="width:150px">时间:{{currentYear}}-{{currentMonth}}-{{currentDay}} </view>
            <view class="nex" @click="lower">下个月</view>
        </view>
    
        <view class="week-header">
            <view class="month" v-for="(item,i) in week" :key="i">{{item}}</view>
        </view>
        <view class="week-date">
            <!-- <view class="every-day"> -->
                <view class="every-day" v-for="(pre) in preDay" :key="pre+'preDay'" style="color:#999;">
                    <view class="every-box" style=" background: #eee;">
                        <view class="top-days">{{getLastMonthSize()-preDay+pre }}</view>
                        <view class="bottom-primarypol">-</view>
                    </view>
                    
                </view>
                <view class="every-day" v-for="(count) in monthSize" :key="count+'monthSize'">
                    <view class="every-box">
                        <view class="top-days">{{count}}</view>
                        <view class="bottom-primarypol"></view>
                        
                    </view>
                    
                </view>
                <view class="every-day" v-for="next in nextDay" :key="next + 'nextDay'" style="color:#999">
                   <view class="every-box">
                       <view class="top-days">{{next}}</view>
                        <view class="bottom-primarypol">-</view>
                    </view> 
                </view>
            </view>
        <!-- </view> -->
    </view>
</template>

<script>
export default {
    name:"calendar",
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

        }
    },
    created() {
        this.getCurrent();
        this.getLastMonthSize();
        this.getNextMonthSize();
    },
    methods: {
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
            this.monthSize = this.monthList[this.currentMonth - 1];
            //获取本月第一天是星期几
            const  firstDay = new Date(`${this.currentYear}/${this.currentMonth/1}`).getDay();
            // console.log("本月的第一天是"+firstDay);
            //当月一号前面的上月剩余天数
            this.preDay = firstDay === 7 ? 0 : firstDay;
            //获取上月天数大小,这个月是1的话上个月就是12, 就是31天
            // console.log( this.currentMonth - 1 === 0 ? 31 : this.monthList[ this.currentMonth -2 ])
            return this.currentMonth - 1 === 0 ? 31 : this.monthList[ this.currentMonth -2 ];
        },
        getNextMonthSize(){
            //获取当月天数
            this.monthSize = this.monthList[this.currentMonth - 1 ];
            //获取本月最后一天是星期几
            const lastDay = new Date(`${this.currentYear}/${this.currentMonth}/${this.monthSize}`).getDay();
            // console.log('本月最后一天是'+lastDay)
            this.nextDay  = lastDay === 7 ? 6 : 6 - lastDay;
        },
        upper(){//上个月
            this.currentMonth = (this.currentMonth - 1);
            if( this.currentMonth == 0){//当他为0时
                this.currentMonth = 12;//初始化到12月
                this.currentYear = (this.currentYear  - 1);
            }
            this.getLastMonthSize();
            this.getNextMonthSize();

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
            this.getLastMonthSize();
            this.getNextMonthSize();
        },
        


    },
}
</script>

<style lang="less" scoped>
.calendar{
    width: 100vw;
    height: 100%;
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
                height: 50px;
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
                    line-height: 30px;
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }
        }
    }
}
</style>
