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