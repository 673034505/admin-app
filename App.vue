<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			

			//消息推送
			plus.push.addEventListener('click',function(msg){
				plus.ui.alert('click'+JSON.stringify(msg));
				var msgObj = JSON.parse(msg.payload);//可以将json字符串转换成json对象
				plus.ui.alert(msgObj)
				plus.ui.alert(msgObj.id)
				setTimeout(function(){
					uni.navigateTo({
						url:"./pages/navBar/navBar"
					},1000)
				})

			},false)
			//监听在线消息事件
			
			plus.push.addEventListener('receive',function(msg){
				//plus.ui.alert(2)
				plus.ui.alert('recevice'+JSON.stringify(msg));
				setTimeout(() => {
					uni.navigateTo({
						url:"./pages/navBar/navBar"
					})
				}, 1000);
			})
			
		},
		onShow: function() {
			console.log('App Show')
		
		},
		onHide: function() {
			console.log('App Hide')
		},
	}
</script>

<style>
	/*每个页面公共css */
	::-webkit-scrollbar {
	/*隐藏滚轮*/
	display: none;
	}
</style>
