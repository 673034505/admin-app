 function getFlexRank(value) 
 {
	 let ret="";
	 if(value==1) ret="重度传输影响";
	 else if(value==2) ret="中度传输影响";
	 else ret="轻度传输影响";
     return ret;
}
 function getWrwName(type) 
 {
	 let ret="re";
	 if(type=='pm25') ret="PM2.5";
	 else if(type=='pm10') ret="PM10";
	 else if(type=='so2') ret="So2";
	 else if(type=='no2') ret="NO2";
	 else if(type=='co') ret="CO";
	 else if(type=='o3') ret="O3";
	 return ret;
}

/**
 * uniapp 跳转 需要在引入uni文件下
 * @param {String} url [跳转的路由地址]
 * @param {Object} params [请求时携带的参数]
 */
function navigateTo(url,params={}) 
{
	if(params && params != null && params != {}){
		let str  = '';
		for(var key in params ){
			str += `${key}=${params[key]}&`;
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
/**
 * get方法，对应get请求   需要在axios文件下
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function getHttp(url,params){
	let path = 'http://47.104.79.24:18061/wangge-boot/wangge';
	//返回promise
	return new Promise((resolve,reject)=>{
		//请求
		//请求
		axios.get(`${path}${url}`, {            
            params: params        
        }).then(res => {
            resolve(res);
        }).catch(err =>{
            reject(err)        
    	}) 
	})
}
/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */

function postHttp(url,params){
	let path = 'http://47.104.79.24:18061/wangge-boot/wangge';
	let paramStr = ''
	if(params && JSON.stringify(params) != '{}'){
		for(let key in params ){
			paramStr += `${key}=${params[key]}&`;
		}
		paramStr = paramStr.substring(0,paramStr.length-1);
	}
	//返回promise
	return new Promise((resolve,reject)=>{
		//请求
		axios.post(`${path}${url}`,paramStr )
        .then(res => {
            resolve(res);
        })
        .catch(err =>{
            reject(err)
        })  
	})
}