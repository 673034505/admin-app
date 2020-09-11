<script>
var _self;
	export default {
		onLaunch: function() {
			console.log('App Launch')
			_self = this;
			// 初始化系统
			this.initSystem()
			// 处理推送消息
			this.handlePush();
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			initSystem(){// 初始化系统
				uni.getSystemInfo({
					success:function(e){
						_self.appUpgrade(e)
					}
				})
			},
			appUpgrade(e){//App更新包
				console.log(e,e.platform)
				if( e.platform == 'android'){
					console.log('安卓')
					 // 获取本地应用资源版本号  
					 // #ifdef APP-PLUS
						plus.runtime.getProperty(plus.runtime.appid,function(inf){  
							//wgtVer=inf.version;  
							// console.log("当前应用版本："+inf.version+"---"+plus.runtime.version);  
							console.log(inf.versionCode,inf.version)
							let appInfo = {
								version:inf.version,
								versionCode:inf.versionCode,
							}
							//保存在vuex中
							_self.$store.commit('getAppInfo',appInfo)
						}); 
					 // #endif
					  
				}else if( e.platform == 'ios'){
					console.log('苹果')
				}
			},
			handlePush(){
				if (uni.getSystemInfoSync().platform == "ios") {
			      plus.runtime.setBadgeNumber(0);
			      //导入个推原生类
			      var GeTuiSdk = plus.ios.importClass("GeTuiSdk");
			      GeTuiSdk.setBadge(0);
				}
				 var inf = plus.push.getClientInfo();
				if (uni.getSystemInfoSync().platform == 'android') {
					console.log('应用的 appid 为安卓：' + inf.clientid);
				} else if (uni.getSystemInfoSync().platform == 'ios') {
					console.log('应用的 appid 为IOS：' + inf.token);
				}

				const _handlePushClick = function(){

				}
				const _handlePushReceive = function(){
					plus.nativeUI.alert("recevice:" + JSON.stringify(msg.title))
					plus.nativeUI.alert("recevice:" + JSON.stringify(msg.payload))
					plus.push.createMessage( msg.title,msg.payload);
				}

				//监听接收透传消息事件  
				plus.push.addEventListener('receive', _handlePushReceive)
				plus.push.addEventListener('click', _handlePushClick)
			}
		},
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	::-webkit-scrollbar {
		/*隐藏滚轮*/
		display: none;
	}
</style>