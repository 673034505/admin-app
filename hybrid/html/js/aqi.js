/***
 * 空气质量AQI计算相关类，
 * author dengjie
 */


/***
 * 根据aqi值，获取AQI等级对应的颜色
 * @param aqi
 * @returns {string}
 */
 function getAqiColor(aqi) {
  if(aqi==null||aqi<0){
    return "#999999";
  }
  if (aqi <= 50) {
    return '#00e400';
  } else if (aqi <= 100) {
    return '#f1db30';
  } else if (aqi <= 150) {
    return '#ff7e00';
  } else if (aqi <= 200) {
    return '#ff0000';
  } else if (aqi <= 300) {
    return '#99004c';
  } else if(aqi>300){
    return '#7e0023';
  }
}

/***
 * 基于AQI不同等级的背景颜色，给text不同的颜色才能看清数字
 * @param aqi
 * @returns {string}
 */
 function getAqiTextColor(aqi) {
  if (aqi <= 50) {
    return '#000000';
  } else if (aqi <= 100) {
    return '#000000';
  } else if (aqi <= 150) {
    return '#000000';
  } else if (aqi <= 200) {
    return '#ffffff';
  } else if (aqi <= 300) {
    return '#ffffff';
  } else {
    return '#ffffff';
  }
}

/***
 * 根据aqi的值，获取aqi的等级，注意是简写
 * @param aqi
 * @returns {string}
 */
 function getAqiLevels(aqi) {
  if (aqi <= 50) {
    return '优';
  } else if (aqi <= 100) {
    return '良';
  } else if (aqi <= 150) {
    return '轻度';
  } else if (aqi <= 200) {
    return '中度';
  } else if (aqi <= 300) {
    return '重度';
  } else {
    return '严重';
  }
}

/***
 * 根据aqi的值，获取空气质量等级
 * @param aqi
 * @returns {string}
 */
 function getAqiLevel(aqi) {
  if (aqi>0&&aqi <= 50) {
    return '优';
  } else if (aqi <= 100) {
    return '良';
  } else if (aqi <= 150) {
    return '轻度污染';
  } else if (aqi <= 200) {
    return '中度污染';
  } else if (aqi <= 300) {
    return '重度污染';
  } else if (aqi > 300){
    return '严重污染';
  }else{
    return "-";
  }
}

/***
 * 根据aqi，获取aqi的级别序号，从0开始
 * @param aqi
 * @returns {number}
 */
 function getAqiNumLevel(aqi) {
  aqi = parseInt(aqi);
  if (aqi>0&&aqi <= 50) {
    return 1;
  } else if (aqi <= 100) {
    return 2;
  } else if (aqi <= 150) {
    return 3;
  } else if (aqi <= 200) {
    return 4;
  } else if (aqi <= 300) {
    return 5;
  } else  if (aqi > 300) {
    return 6;
  }else{
    return 0;
  }
}
/***
 * 根据污染物参数，获取等级对应的颜色
 * @param polltype 污染物类型 so2
 * @param pollvalue 污染物的浓度值 58
 * @param timetype 时间类型，hour，day
 * @returns {string}
 */
 function getPollLevelTextColor(polltype, pollvalue, timetype)
{
  if(pollvalue==null||pollvalue<0){
    return "#000000";
  }
  var level=getPollLevel(polltype, pollvalue, timetype);
  if (level == 1) {
    return '#000000';
  } else if (level == 2) {
    return '#000000';
  } else if (level == 3) {
    return '#000000';
  } else if (level == 4) {
    return '#ffffff';
  } else if (level == 5) {
    return '#ffffff';
  } else if(level==6){
    return '#ffffff';
  }
}
/***
 * 根据污染物参数，获取等级对应的颜色
 * @param polltype 污染物类型 so2
 * @param pollvalue 污染物的浓度值 58
 * @param timetype 时间类型，hour，day
 * @returns {string}
 */
 function getPollLevelColor(polltype, pollvalue, timetype)
{
  if(pollvalue==null||pollvalue<0){
    return "#999999";
  }
  var level=getPollLevel(polltype, pollvalue, timetype);
  if (level == 1) {
    return '#00e400';
  } else if (level == 2) {
    return '#f1db30';
  } else if (level == 3) {
    return '#ff7e00';
  } else if (level == 4) {
    return '#ff0000';
  } else if (level == 5) {
    return '#99004c';
  } else if(level==6){
    return '#7E0023';
  }
}
/**
 * 功能：获得污染物浓度级别序号，从0开始
 * @param polltype 污染物类型 pm25
 * @param pollvalue 污染物浓度值  58
 * @param timetype  时间类型 hour
 * @return {number}
 */
 function getPollLevel(polltype, pollvalue, timetype) {
  pollvalue = parseInt(pollvalue);
  var level = 0;
  if (polltype == "voc") 
  {
	  if (pollvalue <= 100) {
	    level = 1;
	  } else if (pollvalue <= 200) {
	    level = 2;
	  } else if (pollvalue <= 300) {
	    level = 3;
	  } else if (pollvalue <= 400) {
	    level = 4;
	  } else if (pollvalue <= 500) {
	    level = 5;
	  } else if (pollvalue > 500) {
	    level = 6;
	  }
	}
  else if (polltype == "aqi") {
    if (pollvalue <= 50) {
      level = 1;
    } else if (pollvalue <= 100) {
      level = 2;
    } else if (pollvalue <= 150) {
      level = 3;
    } else if (pollvalue <= 200) {
      level = 4;
    } else if (pollvalue <= 300) {
      level = 5;
    } else if (pollvalue > 300) {
      level = 6;
    }
  } else if (polltype == "so2") {            //-----------------SO2------------------------
    if (timetype == "hour") {//小时
      if (pollvalue <= 150) {
        level = 1;
      } else if (pollvalue <= 500) {
        level = 2;
      } else if (pollvalue <= 650) {
        level = 3;
      } else if (pollvalue <= 800) {
        level = 4;
      } else {
        level = 5;
      }
    } else { //天 月 年
      if (pollvalue <= 50) {
        level = 1;
      } else if (pollvalue <= 150) {
        level = 2;
      } else if (pollvalue <= 475) {
        level = 3;
      } else if (pollvalue <= 800) {
        level = 4;
      } else if (pollvalue <= 1600) {
        level = 5;
      } else if (pollvalue <= 2100) {
        level = 6;
      } else {
        level = 6;
      }
    }
  } else if (polltype == "no2") {       //-----------------------------NO2-----------------------
    if (timetype == "hour") {   //小时
      if (pollvalue <= 100) {
        level = 1;
      } else if (pollvalue <= 200) {
        level = 2;
      } else if (pollvalue <= 700) {
        level = 3;
      } else if (pollvalue <= 1200) {
        level = 4;
      } else if (pollvalue <= 2340) {
        level = 5;
      } else if (pollvalue <= 3090) {
        level = 6;
      } else {
        level = 6;
      }
    } else {   //天 月 年
      if (pollvalue <= 40) {
        level = 1;
      } else if (pollvalue <= 80) {
        level = 2;
      } else if (pollvalue <= 180) {
        level = 3;
      } else if (pollvalue <= 280) {
        level = 4;
      } else if (pollvalue <= 565) {
        level = 5;
      } else if (pollvalue <= 750) {
        level = 6;
      } else {
        level = 6;
      }
    }
  } else if (polltype == "pm25") {                            //------------------PM25---------
    if (pollvalue <= 35) {
      level = 1;
    } else if (pollvalue <= 75) {
      level = 2;
    } else if (pollvalue <= 115) {
      level = 3;
    } else if (pollvalue <= 150) {
      level = 4;
    } else if (pollvalue <= 250) {
      level = 5;
    } else if (pollvalue <= 350) {
      level = 6;
    } else {
      level = 6;
    }
  } else if (polltype == "pm10") {                            //------------------PM10---------
    if (pollvalue <= 50) {
      level = 1;
    } else if (pollvalue <= 150) {
      level = 2;
    } else if (pollvalue <= 250) {
      level = 3;
    } else if (pollvalue <= 350) {
      level = 4;
    } else if (pollvalue <= 420) {
      level = 5;
    } else if (pollvalue <= 500) {
      level = 6;
    } else {
      level = 6;
    }
  }
   else if (polltype == "co") {                            //------------------co---------
     if (pollvalue <= 5) {
       level = 1;
     } else if (pollvalue <= 10) {
       level = 2;
     } else if (pollvalue <= 35) {
       level = 3;
     } else if (pollvalue <= 60) {
       level = 4;
     } else if (pollvalue <= 90) {
       level = 5;
     } else if (pollvalue <= 120) {
       level = 6;
     } else {
       level = 6;
     }
   }
   else if (polltype == "o3") {//---------------------O3-----------------
    if (pollvalue <= 160) {
      level = 1;
    } else if (pollvalue <= 200) {
      level = 2;
    } else if (pollvalue <= 300) {
      level = 3;
    } else if (pollvalue <= 400) {
      level = 4;
    } else if (pollvalue <= 800) {
      level = 5;
    } else if (pollvalue <= 1000) {
      level = 6;
    } else {
      level = 6;
    }
  } else if (polltype == "o3_8h") {
    if (pollvalue <= 100) {
      level = 1;
    } else if (pollvalue <= 160) {
      level = 2;
    } else if (pollvalue <= 215) {
      level = 3;
    } else if (pollvalue <= 265) {
      level = 4;
    } else {
      level = 4;
    }
  }
  return level;
}


/***
 * 污染物名称修改，修改成规范格式
 * @param polName
 * @returns {*}
 */
  function getPriPolName(polName) {
  if (polName != null) {
    polName = polName.toUpperCase();
    polName = polName.replace("-", "");
    polName = polName.replace("_", "");
    polName = polName.replace(".", "");
    polName = polName.replace("PM25", "PM<sub>2.5</sub>");
    polName = polName.replace("PM10", "PM<sub>10</sub>");
    polName = polName.replace("O31H", "O<sub>3</sub>-1h");
    polName = polName.replace("O38H", "O<sub>3</sub>-8h");
    polName = polName.replace("O3_8H", "O<sub>3</sub>-8h");
    polName = polName.replace("O31", "O<sub>3</sub>");
    polName = polName.replace("O38", "O<sub>3</sub>");
    polName = polName.replace("O3", "O<sub>3</sub>");
    polName = polName.replace("NO2", "NO<sub>2</sub>");
    polName = polName.replace("SO2", "SO<sub>2</sub>");
  }
  return polName;
}