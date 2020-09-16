<template>
	<view>
		<button type="primary" @click="gotu">页面主操作 Normal</button>
		<!-- #ifdef APP-PLUS || H5 -->
		<view @click="echarts.onClick" :prop="option" :change:prop="echarts.updateEcharts" id="echarts1" class="echarts"></view>
		<button @click="changeOption">更新数据</button>
		<!-- #endif -->
		<view @click="echarts.onClick" :prop="option1" :change:prop="echarts.updateEcharts" id="echarts2" class="echarts2"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				option: {},
				option1:{}
			};
		},
		mounted(){
			console.log('创建完成')
			var _seft = this;
			setTimeout(()=>{
				//模拟动态数据
				let colorList  = [ '#000','#aaa','#ddd','#www','#qqq','#ffsfsa']
				_seft.option = {
					show:"chart1",
					title: {
						text: 'ECharts 入门示例'
					},
					tooltip: {
                        trigger: 'axis',
                        // position:['20%','30%']
                        confine:true,
                    },
					legend: {
						data: ['销量']
					},
					xAxis: {
						data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
					},
					yAxis: {},
					series: [{
						name: '销量',
						type: 'bar',
						data: [5, 20, 36, 10, 10, 20],
						itemStyle: {
                            normal: {
                                color: function(params) {
									console.log('ap')
									return colorList[params.dataIndex];
                                },
                            }
                        },
					}]
				}
				_seft.option1 = {
					show:"chart2",
					title: {
						text: 'ECharts 入门示例'
					},
					tooltip: {
                        trigger: 'axis',
                        // position:['20%','30%']
                        confine:true,
                    },
					legend: {
						data: ['销量122']
					},
					xAxis: {
						data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
					},
					yAxis: {},
					series: [{
						name: '销量122',
						type: 'bar',
						data: [5, 20, 36, 10, 10, 20],
						
					}]
				}
			},1000)
		},
		methods: {
			gotu(){
				uni.navigateTo({
					url:`../user/user`
				})
			},
			changeOption() {//模拟数据发生变化
				const data = this.option.series[0].data
				// 随机更新示例数据
				data.forEach((item, index) => {
					data.splice(index, 1, Math.random() * 40)
				})
			},
			onViewClick(options) {
				console.log(options)
			}
		},
		
	}
</script>

<script module="echarts" lang="renderjs">
	let myChart
	let myChart1
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
				myChart1 = echarts.init(document.getElementById('echarts2'))
				myChart1.setOption(this.option1)
			},
			updateEcharts(newValue, oldValue, ownerInstance, instance) {
				// 监听 service 层数据变更
				//由于不好分别就判断来执行   2个echart表
				if(newValue.show=="chart1"){
					myChart.setOption(newValue)
				}
				if(newValue.show=="chart2"){
					myChart1.setOption(newValue)
				}
			},
			onClick(event, ownerInstance) {
				// 调用 service 层的方法
				ownerInstance.callMethod('onViewClick', {
					test: event
				})
			}
		}
	}
</script>

<style lang="less">
.echarts {
		margin-top: 100px;
		width: 100%;
		height: 300px;
	}
.echarts2 {
		margin-top: 100px;
		width: 100%;
		height: 300px;
	}
		
</style>
