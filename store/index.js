import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		/**
		 * 是否需要强制登录
		 */
		forcedLogin: false,
		hasLogin: false,
		userName: "",
		token:'',
		userid:'',
		version:'',//版本号名称  本地版本号
		versionCode:'',//版本号  本地版本号
		serverversion:'',//服务器 版本号 名称
		serverversionCode:'',//服务器 版本号
		url:'',//服务器 软件下载地址
	},
	actions: {
		
	 },
	mutations: {
		login(state, response) {
			//接受到了值
			//userInfo：{},token:''
			state.token = response.token
			state.userName = response.userInfo.realname
			state.userid = response.userInfo.id
			state.hasLogin = true;
			state.forcedLogin = true;//登录成功 强制登录
		},
		logout(state) {
			state.userName = "";
			state.hasLogin = false;
		},
		getAppInfo(state,response){//获取版本号
			console.log('获取到版本号')
			state.version = response.version;
			state.versionCode = response.versionCode
		},
		AppVersion(state,response){//服务器版本
			state.serverversion = response.versionname
			state.serverversionCode = response.versioncode
			state.url = response.url
		}, 
	}
})

export default store
