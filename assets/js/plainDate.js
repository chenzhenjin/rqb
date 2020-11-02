/*
 * @Author: chenzhenjin
 * @email: BrotherStudy@163.com
 * @Date: 2020-07-02 12:32:29
 * @LastEditTime: 2020-08-12 09:57:18
 * @Descripttion: 根据业务场景返回相应的日期数组和日期格式
 */


/**
 * @description: 处理开始日期和结束日期数组，返回逐天递增的数组，同时要处理过去日期数组延长差值
 * @params: formatDateArray:Array
 * @params: carryOutModeNeedHour:Boolean 
 * @timeToFormatDateFn: 时间戳转换函数
 * @formatDateArray: [startDate:String,endDate:string] example:'2020-07-09'
 * @return: {dateArray,hour}
 */
export const getDayArray = function(
  formatDateArray,
  carryOutModeNeedHour = false,
  timeToFormatDateFn = timeToFormatDate
) {
  const nowDate = new Date();
  const formatNowDate = timeToFormatDateFn(nowDate)
  const startDate = new Date(formatDateArray[0]);
  const formatStartDate = timeToFormatDateFn(startDate);
  const startDateTime = startDate.getTime();
  const endDateTime = new Date(formatDateArray[1]).getTime();
  let hour = null;
  if (carryOutModeNeedHour) {
    hour = startDate.getHours();
    if (formatNowDate === formatStartDate) {
      const nowHours = nowDate.getHours();
      hour > nowHours ? hour : (hour = nowHours);
    }
  }
  // console.log("formatDateArray", formatDateArray);
  // let incrementDay = 0;
  // if (formatNowDate > formatStartDate) {
  //   incrementDay = formatNowDate - formatStartDate;
  // }
  // const startDateTime =
  //   new Date(formatDateArray[0]).getTime() + incrementDay * 3600 * 24 * 1000;
  // formatStartDate = new Date(startDateTime).getDate();
  // const endDateTime =
  //   new Date(formatDateArray[1]).getTime() + incrementDay * 3600 * 24 * 1000;
  const durationDays = (endDateTime - startDateTime) / 1000 / 3600 / 24;
  // console.log("durationDays", durationDays);
  // console.log("formatNowDate", formatNowDate);
  // console.log("formatStartDate", formatStartDate);
  let dateArray = [];
  let i = 0;
  if (formatNowDate === formatStartDate) { // 以年月日保证唯一性
    dateArray[i] = "今日";
    i = 1;
  }
  for (i; i <= durationDays; i++) {
    const otherDay = new Date(startDateTime + i * 1000 * 3600 * 24).getDate();
    let otherDayString = "";
    // if (otherDay === formatNowDate) {
    //   otherDayString = "今日";
    // } else {
    otherDayString = otherDay + "号";
    // }
    dateArray.push(otherDayString);
  }
  // console.log("dateArray", dateArray);
  return { dateArray, hour };
};

/**
 * @description: 功能描述
 * @params: data:Object
 * @data: id:Number
 * @return: Promise
 */
export const getStartHour = function(val) {
  let hour = val;
  return hour;
};

/**
 * @description: 将时间戳转成 "YYYY-MM-DD" "YYYY-MM-DD hh:mm:ss"格式显示
 * @params: dateTime:15xxx
 * @return: "YYYY-MM-DD" 或者 "YYYY-MM-DD hh:mm:ss"
 */
export const timeToFormatDate = function(
  dateTime,
  format = "YYYY-MM-DD",
  dateSeperator = "-",
  timeSeperator = ":"
) {
  const date = new Date(dateTime);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = month > 9 ? month : "0" + month;
  let day = date.getDate();
  day = day > 9 ? day : "0" + day;
  if (format === "YYYY-MM-DD") {
    return year + dateSeperator + month + dateSeperator + day;
  } else {
    let hour = date.getHours();
    hour = hour > 9 ? hour : "0" + hour;
    let minutes = date.getMinutes();
    minutes = minutes > 9 ? minutes : "0" + minutes;
    let seconds = date.getSeconds();
    seconds = seconds > 9 ? seconds : "0" + seconds;
    // console.log('hour, minutes, seconds', hour,minutes, seconds)
    return `${year}${dateSeperator}${month}${dateSeperator}${day} ${hour}${timeSeperator}${minutes}${timeSeperator}${seconds}`;
  }
};

/**
 * @description: 将过去日期数组自动延长差值
 * @params: formatDateArray:Array
 * @formatDateArray: [startDate:String,endDate:string] example:'2020-07-09'
 * @timeToFormatDateFn: 时间戳转换函数
 * @return: Array
 */
export const datePastHandle = function(
  formatDateArray,
  timeToFormatDateFn = timeToFormatDate
) {
  const nowDate = new Date();
  let nowTime = nowDate.getTime();
  const hour = nowDate.getHours();
  hour >= 23 && (nowTime += 24 * 60 * 60 * 1000);
  const startDate = new Date(formatDateArray[0]);
  const startTime = startDate.getTime();
  let incrementDay = 0;
  let startDateTime = 0;
  let endDateTime = 0;
  if (nowTime > startTime) {
    incrementDay = Math.floor((nowTime - startTime) / (24 * 60 * 60 * 1000));
    startDateTime =
      new Date(formatDateArray[0]).getTime() + incrementDay * 3600 * 24 * 1000;
    endDateTime =
      new Date(formatDateArray[1]).getTime() + incrementDay * 3600 * 24 * 1000;
    return [timeToFormatDateFn(startDateTime), timeToFormatDateFn(endDateTime)];
  } else {
    return formatDateArray;
  }
};

export const timePastHandle = function(
  formatTime,
  timeToFormatDateFn = timeToFormatDate
) {
  const nowDate = new Date();
  let nowTime = nowDate.getTime();
  const hour = nowDate.getHours();
  hour >= 23 && (nowTime += 8 * 60 * 60 * 1000);
  const startDate = new Date(formatTime);
  const startTime = startDate.getTime();
  let incrementDay = 0;
  let startDateTime = 0;
  let incrementHour = 0;
  if (nowTime > startTime) {
    incrementDay = Math.floor((nowTime - startTime) / (24 * 60 * 60 * 1000));
    startDateTime = startTime + incrementDay * 3600 * 24 * 1000;
    // console.log('startDateTime', startDateTime)
    // console.log('nowTime', nowTime)
    if (nowTime > startDateTime) {
      incrementHour = (nowTime - startDateTime) / (60 * 60 * 1000);
      startDateTime += incrementHour * 3600 * 1000;
      // console.log('incrementHour', incrementHour)
      // console.log('startDateTime', startDateTime)
    }
    return timeToFormatDateFn(startDateTime, "YYYY-MM-DD hh:mm:ss");
  } else {
    // 修复后端切掉秒的格式化的时间
    return timeToFormatDateFn(new Date(formatTime).getTime(), "YYYY-MM-DD hh:mm:ss");
  }
};
// console.log("timePastHandle", timePastHandle("2020-07-02 12:20:10"));
