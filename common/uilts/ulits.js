
const togo = function(url,data={}){//封装路由跳转  
	 if(data && data != null && data != {}){
		 let str  = '';
		 for(var key in data ){
			 str += `${key}=${data[key]}&`;
		 }
		 uni.navigateTo({
			url:`/pages/${url}?${str.substring(0,str.length-1)}`  
		 }) 
	 }else{
		uni.navigateTo({
			url:`/pages/${url}`  
		}) 
	 }
} 

const http = function(url,data = {}, method){//封装api请求
	//基础地址
	let path = 'http://47.104.79.24:18061/wangge-boot/wangge';
	
	//返回promise
	return new Promise((resolve,reject)=>{
		//请求
		uni.request({
			url:`${path}${url}`,
			data:data,
			method:method,
			success(res) {
				resolve(res)
			},
			fail:(err)=>{
				reject(err);
			}
		})
	})
} 
export {
	http,
	togo
}