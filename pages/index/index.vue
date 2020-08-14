
<template>
         <view class="container">

<van-button type="primary">主要按钮</van-button>
<van-button type="info">信息按钮</van-button>
                <picker mode="date" :value="date" start="2015-09-01" end="2020-09-01" @change="DateChange">
					<view class="picker">
						{{date}}
					</view>
				</picker>

                <van-cell title="选择单个日期" :value="date" @click="show = true" />
                <van-calendar v-model="show" @confirm="onConfirm" />
           </view>
</template>
<script>
    export default {
        data() {
            return {
                show: false,
                minDate: new Date(2020, 0, 1),
                maxDate: new Date(2025, 10, 1),
                currentDate: new Date(),
                value: '',
                date: '2018-12-25',
                actions: [{ name: '选项一' }, { name: '选项二' }, { name: '选项三' }],
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
        methods: {
            setColumnValue(){

            },
            DateChange(e){
                console.log('====',e)
            },
             formatDate(date) {
            return `${date.getMonth() + 1}/${date.getDate()}`;
            },
            onConfirm(date) {
            this.show = false;
            this.date = this.formatDate(date);
            },
            onSelect(item) {
            // 默认情况下点击选项时不会自动收起
            // 可以通过 close-on-click-action 属性开启自动收起
            this.show = false;
            Toast(item.name);
            },
        },
    }
</script>
<style>
    
</style>