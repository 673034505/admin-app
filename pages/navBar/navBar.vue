
<template>
         <view class="container">
            <view class="relatives">
                <scroll-view scroll-x class="bg-white nav">
                    <view class="flex text-center">
                        <view class="cu-item flex-sub" :class="index==TabCur?'text-orange cur':''" v-for="(item,index) in 4" :key="index" @tap="tabSelect" :data-id="index">
                            Tab{{index+1}}
                        </view>
                    </view>
                </scroll-view>
                <!-- 导航栏与下拉刷新 -->
                <view class="content" ref="btn"   @scroll="scroll">
					<view id="sollop">
                        <view v-if="TabCur == 0">
                            
                            <template v-for="(item,index) in pagelist">
                                <div :key="index" class="botts">
                                    <u-button type="primary"  @click="navigator(item.url)">{{item.name}} </u-button>     
                                </div>   
                            </template>
                        </view>
                        <view v-if="TabCur == 1">
                            
                        </view> 
                        <view v-if="TabCur == 2">
                            
                        </view>
                        <view v-if="TabCur == 3"  >
                            <!-- 导航栏与下拉刷新与设置头部样式 -->
                            <!-- "style": {
                            "navigationBarTitleText": "导航栏",
                            // "enablePullDownRefresh": true,
                            "app-plus":{          //App端扩展配置
                                "pullToRefresh":{
                                    "support":"true",
                                    "style":"default",
                                    "contentdown":"下拉刷新1",
                                    "contentover":"下拉刷新2",
                                    "contentrefresh":"下拉刷新3"
                        
                                },
                                "titleNView":{      //原生导航栏配置参数
                                    "backgroundColor":"#002a61",
                                    "buttons": [{
                                        "color": "#fff",
                                        "float": "left",
                                        "fontSize": "18px",
                                        "text": "邢台市",
                                        "width":"80px"
                                    },
                                    {
                                        "color": "#fff",
                                        "colorPressed": "#eee",
                                        "float": "right",
                                        "fontSize": "22px",
                                        "text": "\ue678" 
                                    }
                                    ]
                                }
                            }
                        } -->
                            <view class="solid-top" v-for="(item,index) in items" :key="index">
                                <view class="item"> {{item}} </view>
                            </view>
                        </view>
                    </view>
                </view>
                
            </view>
            
        </view>
</template>
<script>

    export default {
        data() {
            return {
                items:30,
                TabCur: 0,
                scrollLeft: 0,
                isSupport:true,
                startTop:0,
                pagelist:[
                    {name:'空气质量日历',url:'list/airCalendar/airCalendar'},
                    {name:'空气质量日历',url:'list/airCalendar1/airCalendar1'},
                ]
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
        mounted() {
            let _self = this;
            const query = uni.createSelectorQuery().in(this);
            query.select('#sollop').boundingClientRect(data => {
				//开始获取顶部
				_self.startTop =  data.top
			}).exec();
        },
        methods: {
            tabSelect(e){
                this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
            },
            scroll(e){//滚轮条发生边哈
				  let _self = this;
				  const query = uni.createSelectorQuery().in(this);
				  query.select('#sollop').boundingClientRect(data => {
					if( data.top == _self.startTop){//当他到达顶部时
						_self.isSupport  = true;
					}else{
						_self.isSupport  = false;
                    }
					_self.isOpenRefresh()
				  }).exec();
              },
              isOpenRefresh(){//设置下拉刷新
				const pages = getCurrentPages();  
				const page = pages[pages.length - 1];  
				const currentWebview = page.$getAppWebview();
				currentWebview.setStyle({  
				  pullToRefresh: {  
				    support: this.isSupport,
				  }  
                });  
            },
            navigator(url){
                this.$navTo(url);
            }
        },
        onPullDownRefresh() {
            setTimeout(function(){
                uni.stopPullDownRefresh()
            },1000)
        },
    }
</script>
<style lang="less" scoped>

.container{
    height: 100vh;
	overflow: hidden;
    .bg-white {
        background-color: #ffffff;
        color: #666666;
    }
    .nav {
        white-space: nowrap;
        position: relative;
        .cu-item {
            height: 90upx;
            display: inline-block;
            line-height: 90upx;
            margin: 0 10upx;
            padding: 0 20upx;
            text-align: center;
        }
        .flex-sub {
            flex: 1;
        }
        .flex {
            display: flex;
        }
        .cur {
            border-bottom: 4upx solid;
        }
        .text-orange{
            color: #f37b1d;
        }
    }
    .relatives{
        height: 100%;
        width: 100%;
        position: relative;
    }
    .content{
        height: calc(100% - 90upx );
        width: 100%;
        position: relative;
        overflow: hidden;
        overflow-y: auto;
		.botts{
            margin: 10px 0;
        }
    }
    .item{
        width: 100%;
        height: 100px;
    }
    
}
</style>