// 日期格式转换
// author dengjie

// 数值添加0，变成2位
export  function addZero(temp) {
    if (temp >= 0 && temp < 10) {
        return "0" + temp
    }
    else return temp + "";
};
// 获取星期几  getDay返回的是数字下标  返回格式：星期一
export  function getWeek(date,fig) {
    var  weekday =[]
    if(fig){
      weekday=["周日","周一","周二","周三","周四","周五","周六"];
    }else{
      weekday=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
    }
    return weekday[date.getDay()];
};


// 获取:年月日，''格式：yyyyMMdd，'-'格式：yyyy-MM-dd
export function getDateYMD(date,seperator='-') {
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var currentdate = date.getFullYear() + seperator + addZero(month) + seperator + addZero(strDate);
    return currentdate;
};

// 获取：年月日时，''格式：yyyyMMddHH，'-'格式：yyyy-MM-dd HH
export function getDateYMDH(date,seperator='-') {
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  var hour = date.getHours();
  var currentdate =''
  if(seperator==='-')
  {
    currentdate=date.getFullYear() + seperator + addZero(month) + seperator + addZero(strDate)+ ' ' + addZero(hour);
  }
  else
    {
    currentdate=date.getFullYear() + seperator + addZero(month) + seperator + addZero(strDate)+ seperator + addZero(hour);
  }
  return currentdate;
};
//获取：年月日时分秒 ，''格式：yyyyMM，'-'格式：yyyy-MM
export function getDateYM(date,seperator='-') {
    var date = date;
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var seconds = date.getSeconds();
    var currentdate ='';
  if(seperator==='-')
  {
    currentdate=date.getFullYear() + seperator + addZero(month) 
  }
  else
  {
    currentdate=date.getFullYear() + seperator + addZero(month) 
  }
    return currentdate;
};

//获取：年月日时分秒 ，''格式：yyyyMMddHHmmss，'-'格式：yyyy-MM-dd HH:mm:ss
export function getDateYMDHMS(date,seperator='-') {
    var date = date;
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var seconds = date.getSeconds();
    var currentdate ='';
  if(seperator==='-')
  {
    currentdate=date.getFullYear() + seperator + addZero(month) + seperator + addZero(strDate)+ ' ' + addZero(hour)+':' + addZero(minute)+':' + addZero(seconds);
  }
  else
  {
    currentdate=date.getFullYear() + seperator + addZero(month) + seperator + addZero(strDate)+ seperator + addZero(hour)+ seperator + addZero(minute)+ seperator + addZero(seconds);
  }
    return currentdate;
};

/* 获取中文日期， MM月dd日 */
export function getDateMD_CN(date) {
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  var currentdate =  month + '月' + strDate + '日';
  return currentdate;
};

/* 获取中文日期， yyyy年MM月dd日 */
export function getDateYMD_CN(date) {
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  var currentdate = date.getFullYear() + '年' + month + '月' + strDate + '日';
  return currentdate;
};

/* 获取中文日期， yyyy年MM月dd日HH时 */
export function getDateYMDH_CN(date) {
  var month =addZero(date.getMonth() + 1);
  var strDate = addZero(date.getDate());
  var hour = addZero(date.getHours());
  var currentdate = date.getFullYear() + '年' + month + '月' + strDate + '日'+hour+ '时';
  return currentdate;
};

/* 返回中文日期， yyyy年MM月dd日HH时mm分ss秒 */
export function getDateYMDHMS_CN(date) {
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var seconds = date.getSeconds();
  var currentdate = date.getFullYear() + '年' + month + '月' + strDate + '日'+hour+ '时' + minute + '分' + seconds + '秒';
  return currentdate;
};
/* 对日期进行加减 */
export function dateAdd(date,type,number)
{
  if(type==='y') date.setFullYear(date.getFullYear() + number);
  if(type==='m') date.setMonth(date.getMonth() + number);
  if(type==='d') date.setDate(date.getDate() + number);
  if(type==='h') date.setHours(date.getHours() + number);
  return date;
}
/* 2个日期字符串相减，返回相差天数，日期参数格式*/
export function DateDiff(sDate1, sDate2) {
  //sDate1和sDate2是yyyy-MM-dd格式
  var aDate, oDate1, oDate2, iDays;

  aDate = sDate1.split("-");
  oDate1 = new Date();  //转换为yyyy-MM-dd格式
  oDate1.setFullYear(aDate[0]);
  oDate1.setMonth(aDate[1]-1)
  oDate1.setDate(aDate[2])
  oDate1.setHours(0);
  oDate1.setMinutes(0);
  oDate1.setMilliseconds(0);
  // oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);  //转换为yyyy-MM-dd格式
  aDate = sDate2.split("-");
  oDate2 = new Date();  //转换为yyyy-MM-dd格式
  oDate2.setFullYear(aDate[0]);
  oDate2.setMonth(aDate[1]-1)
  oDate2.setDate(aDate[2])
  oDate2.setHours(0);
  oDate2.setMinutes(0);
  oDate2.setMilliseconds(0);
  // oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);
  iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24); //把相差的毫秒数转换为天数
  return iDays;  //返回相差天数
}
/* 2个日期字符串相减，返回相差小时数,日期参数格式yyyyMMddHH格式*/
export function DateDiffHour(sDate1, sDate2) {
  var oDate1, oDate2, iDays;
  oDate1 = new Date(sDate1.substring(0, 4), sDate1.substring(4, 6), sDate1.substring(6, 8), sDate1.substring(8, 10), 0, 0);  //转换为yyyy-MM-dd格式
  oDate2 = new Date(sDate2.substring(0, 4), sDate2.substring(4, 6), sDate2.substring(6, 8), sDate2.substring(8, 10), 0, 0);  //转换为yyyy-MM-dd格式
  iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60); //把相差的毫秒数转换为天数
  return iDays * 1 + 1;  //返回相差小时数
}
/* 对日期进行格式化，fmt为任意格式，比如：yyyy年MM月dd日 hh:mm:ss */
export function dateFormat(date,fmt)
{ //author: meizz
  var o = {
    "M+" : date.getMonth()+1,     //月份
    "d+" : date.getDate(),     //日
    "h+" : date.getHours(),     //小时
    "m+" : date.getMinutes(),     //分
    "s+" : date.getSeconds(),     //秒
    "q+" : Math.floor((date.getMonth()+3)/3), //季度
    "S" : date.getMilliseconds()    //毫秒
  };
  if(/(y+)/.test(fmt))
    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)
    if(new RegExp("("+ k +")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
  return fmt;
}
/* 字符串转日期，字符串格式：yyyyMMddHHmmss,说明：如果是yyyy-MM-dd格式，可以直接new Date('yyyy-MM-dd')*/
export function stringToDate(str) {
  var year = str.substr(0, 4);
  var month = str.substr(4, 2);
  var date = str.substr(6, 2);
  var hour = str.substr(8, 2);
  var reDate = new Date();
  reDate.setFullYear(year);
  reDate.setMonth(parseInt(month) - 1,1);//实际月份减一
  reDate.setDate(date);
  reDate.setHours(hour);
  reDate.setMinutes("00");
  reDate.setSeconds("00");
  return reDate;
}
/* 获得日期年份的第一天的日期*/
export function getFirstDateOfYear(date) {
  return new Date(date.getFullYear(), 0, 1);
}
/* 获得日期年份的最后一天的日期*/
export function getLastDateOfYear(date) {
  var date1=new Date(date.getFullYear()+1, 0, 1);
  return (new Date(date1.getTime() - 1000 * 60 * 60 * 24))
}
/* 获得日期月的第一天的日期*/
export function getFirstDateOfMonth(date) {
  date.setFullYear(date.getFullYear());
  date.setMonth(date.getMonth());
  date.setDate(1);
  return date;
}
/* 获得日期月的最后一天的日期*/
export function getLastDateOfMonth(date) {
  //取当下月中的第一天
  date.setMonth(date.getMonth()+1)
  date.setDate(1);
  return (new Date(date.getTime() - 1000 * 60 * 60 * 24));//获取当月最后一天日期
}
//获取月份的最后一天返回天数
export function getLastDateDay(date) {
  //取当下月中的第一天
  let lastDate = getLastDateOfMonth(date)
  return lastDate.getDate();
}




