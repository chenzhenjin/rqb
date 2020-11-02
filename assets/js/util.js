export function skuReg(skuUrl = '') {
    let reg = new RegExp('(^|\\\\.com|)[1-9]\\d*(^|\\\\.html|)');
    if (!isNaN(skuUrl)) {
        return skuUrl;
    } else {
        if (skuUrl.match(reg)) {
            return skuUrl.match(reg)[0];
        } else {
            return false
        }
    }
}

export function getNowFormatDate() {
    let date = new Date();
    let seperator1 = "-";
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    return year + seperator1 + month + seperator1 + strDate;
}

export function formatDateTime(inputTime) {
    let date = new Date(inputTime);
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    return y + '-' + m + '-' + d;
}

//两个时间戳之间的天数(转入时间戳)
export function selectDay(startTime, endTime) {
    return Math.abs((startTime - endTime)) / (1000 * 60 * 60 * 24);
}

//两个时间戳之间的天数(转入YYYY-MM-DD)
export function checkLimitDay(sDate1, sDate2) {
    let dateSpan,
        iDays;
    sDate1 = Date.parse(sDate1);
    sDate2 = Date.parse(sDate2);
    dateSpan = sDate2 - sDate1;
    dateSpan = Math.abs(dateSpan);
    iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
    return iDays
}

//YYYY-MM-DD 转时间戳

export function valueToStamp(date) {
    return Date.parse(new Date(date));
}

export function getNextDay(d) {
    d = new Date(d);
    d = +d + 1000 * 60 * 60 * 24;
    d = new Date(d);
    //格式化
    let month = d.getMonth() + 1 < 10 ? ('0' + (d.getMonth() + 1)) : d.getMonth() + 1;
    let day = d.getDate() < 10 ? ('0' + d.getDate()) : d.getDate();
    return d.getFullYear() + "-" + month + "-" + day
}

export function dateIsToday(date) {
    let targetDate = new Date(date);
    let nowDate = new Date();
    return nowDate.getFullYear() === targetDate.getFullYear()
        && nowDate.getMonth() === targetDate.getMonth()
        && nowDate.getDate() === targetDate.getDate();
}