<template>
    <view class="container">
        <u-popup v-model="monthShow"  mode="bottom" border-radius="14">
            <view class="monthlyCalendar">
                        <!-- 关闭按钮 -->
                        <view class="month-close">
                            <view class="month-close-left">
                                日期选择
                            </view>
                            <view class="month-close-right" @click="monthClose">
                                <u-icon name="close"></u-icon>
                            </view>
                           
                        </view>
                        <view class="month-title">
                            <view class="title-left" @click="upper"> <u-icon name="arrow-left"></u-icon> </view>
                            <view class="title-center">  {{currentYear}}年 </view>
                            <view class="title-right" @click="lower"> <u-icon name="arrow-right"></u-icon></view>
                        </view>
                        <!-- 内容 -->
                        <view class="month-cotent">
                            <view class="month-ul">
                                <view class="month-li"  v-for="(item, index) in monthLive" :key="'month'+index" @click="monthSelect(item)">
                                    <view class="month-box"   :class="{dateSelect:((yearDateSelct[0] == currentYear && monthDateSelct[0] == item ) || (yearDateSelct[1] == currentYear && monthDateSelct[1] == item)) }">
                                        <view class="month-day"> {{item}}月</view>
                                        <view class="month-font" v-if="( yearDateSelct[0] == currentYear && monthDateSelct[0] == item )"> 开始 </view>
                                        <view class="month-font" v-if="( yearDateSelct[1] == currentYear && monthDateSelct[1] == item )"> 结束 </view>
                                    </view>
                                </view>
                                <view class="month-li"  v-for="(item, index) in monthNoLive" :key="'ash'+index">
                                    <view class="month-box">
                                        <view class="month-day month-ash"> {{12 - monthNoLive + item}}月</view>
                                    </view>
                                </view>
                            </view>
                        </view>
                        <!-- 底部空间 -->
                        <view class="month-bottom">

                        </view>
                    </view>
		</u-popup>
    </view>
</template>
<script>
export default {
    props:{
        show:{
            type: Boolean,//必传
            default:false
        }
    },
    created() {
        this.monthShow = this.show;
    },
    data() {
        return {
            defaultDate:[new Date('2020/09/01'),new Date('2020/09/17')],//默认选中
            monthLive:9,
            monthNoLive:3,
            monthShow:true,//月份
            currentYear: 2020,//当前年份
            monthDateSelct:[],
            yearDateSelct:[]
        }
    },
    watch: {
        show(){
            this.monthShow = this.show;
        }
    },
    methods: {
            monthClose(){//日期关闭
                this.monthShow = false;
            },
            upper(){//上一年
                this.currentYear = (this.currentYear - 1);
                let date = new Date();
                if(date.getFullYear() == this.currentYear  ){
                    this.monthLive = Number(date.getMonth()+1);
                    this.monthNoLive = Number(12 - this.monthLive);
                }else if(  this.currentYear > date.getFullYear()  ){
                    this.monthLive = 0;
                    this.monthNoLive = 12
                }else if(  this.currentYear < date.getFullYear()  ){
                    this.monthLive = 12;
                    this.monthNoLive = 0
                }
                //S
                // console.log(this.monthLive,  )
            },
            lower(){//下一年
                this.currentYear = (this.currentYear + 1);
                let date = new Date();
                if(date.getFullYear() == this.currentYear  ){
                    this.monthLive = Number(date.getMonth()+1);
                    this.monthNoLive = Number(12 - this.monthLive);
                }else if(  this.currentYear > date.getFullYear()  ){
                    this.monthLive = 0;
                    this.monthNoLive = 12
                }else if(  this.currentYear < date.getFullYear()  ){
                    this.monthLive = 12;
                    this.monthNoLive = 0
                }
            },
            monthSelect(e){
                if( JSON.stringify(this.monthDateSelct) == '[]'){
                    this.monthDateSelct.push(e);
                    this.yearDateSelct.push(this.currentYear)
                }else{
                    if( this.yearDateSelct[0] > this.currentYear ){
                        //清空数据发生变化
                        this.monthDateSelct = [];
                        this.yearDateSelct = [];
                        this.monthDateSelct.push(e);
                        this.yearDateSelct.push(this.currentYear)
                    }else{
                        if(this.monthDateSelct[0] > e  ){
                            //清空数据发生变化
                            this.monthDateSelct = [];
                            this.yearDateSelct = [];
                            this.monthDateSelct.push(e);
                            this.yearDateSelct.push(this.currentYear)
                        }else{
                            if( this.monthDateSelct.length == 2){
                                this.monthDateSelct = [];
                                this.yearDateSelct = []
                                this.monthDateSelct.push(e);
                                this.yearDateSelct.push(this.currentYear)
                            }else{
                                this.monthDateSelct.push(e);
                                this.yearDateSelct.push(this.currentYear)
                                this.$emit('monthDateChanges',{
                                    starttime:`${this.yearDateSelct[0]}/${this.monthDateSelct[1]}`,
                                    endtime:`${this.yearDateSelct[1]}/${this.monthDateSelct[1]}`
                                });//返回数据
                                
                            }
                        }
                    }
                    
                }
                
            }
    },
		
}
</script>
<style lang="less" scoped>
.container{
    height: 100%;
    width: 100%;
    .monthlyCalendar{
        height: 100%;
        width: 100%;
        .month-close{
            height: 50px;
            width: 100%;
            display: flex;
            position: relative;
            .month-close-left{
                height: 100%;
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .month-close-right{
                height: 100%;
                width: 70px;
                position: absolute;
                right: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: chartreuse;
            }
        }
        .month-title{
            height: 40px;
            line-height: 40px;
            width: 100%;
            display: flex;
            padding-top: 10px;
            .title-left{
                width: 25%;
                height: 100%;
                display: flex;
                justify-content: flex-end;
                align-items: center;
            }
            .title-center{
                width: 50%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .title-right{
                width: 25%;
                height: 100%;
                display: flex;
                justify-content: flex-start;
                align-items: center;
            }
        }
        .month-cotent{
            width: 100%;
            .month-ul{
                height: 100%;
                width: calc(100% - 30px);
                padding: 0 15px;
                display: flex;
                flex-wrap: wrap;
                .month-li{
                    width: 25%;
                    height: 80px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: #000;
                    .dateSelect{
                        background: #3c72f9;
                        color: #fff;
                    }
                    .month-box{
                        height: 64px;
                        width: 52px;
                        font-size: 12px;
                        // background-color: aqua;
                        .month-day{
                            height: 42px;
                            width: 100%;
                            text-align: center;
                            line-height: 60px;
                        }
                        .month-font{
                            height: 20px;
                            line-height: 14px;
                            text-align: center;
                        }
                        .month-ash{
                            color: #c8c9cc;
                        }
                    }
                }
            }
        }
        .month-bottom{
            height: 30px;
            width: 100%;
        }
    }
}

</style>