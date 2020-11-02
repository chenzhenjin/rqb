import {ajaxGet, ajaxPost} from "../assets/js/ajax";

import config from "../commonComponent/config"


/**
 * 获取图片链接
 * @params location广告位置码
     1.京店宝首页上方广告
     2.京店宝首页下方广告
     3.京客集市首页广告
     4.京客集市套餐方案广告
     5.京客集市个体方案广告
     6.人气宝首页广告
     7.人气宝充值中心页面广告
     8.人气宝消费明细页面广告
 */
export const getImgsUrl = (params = {}) => {
    return ajaxGet(config.serverUrl + 'yushu-operation/adsManage/getImgsUrl', params);
};
