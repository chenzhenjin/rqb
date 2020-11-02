import {ajaxGet, ajaxPost} from "../assets/js/ajax";

import config from "../commonComponent/config"
/**
 * 查询余额明細
 * @params accountType   账户类型 1京店宝账户 2押金账户
 * @params endTime 结束时间
 * @params orderFrom   订单所属产品
 * @params orderType   收支类型 充值0,消费1,消费退款2,转账3,赠送4
 * @params page   页码
 * @params startTime   开始时间
 */
export const searchOrder = (params = {}) => {
    return ajaxPost(config.serverUrl + 'yushu-payreport/search/listOrder', params);
};


/**
 * 用户充值余额
 * @params page
 * @params userId   用户id
 * @params amount   充值金额
 * @params accountType   账户类型
 */
export const recharge = (params = {}) => {
    return ajaxPost(config.serverUrl + 'yushu-pay/order/recharge', params);
};

/**
 * 获取用户余额
 */
export const getAccountBalance = (params = {}) => {
    return ajaxGet(config.serverUrl + 'yushu-payreport/search/getAccountBalance', params);
};
