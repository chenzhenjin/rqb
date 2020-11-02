/*
 * @Author: chenzhenjin
 * @email: BrotherStudy@163.com
 * @Date: 2020-07-15 18:01:16
 * @LastEditTime: 2020-08-17 15:11:02
 * @Descripttion: 发布流量页面统一接口
 */

import { ajaxGet, ajaxPost } from "@/assets/js/ajax";
import config from "@/commonComponent/config";
export const getGoodsInfo = (url, params = {}) => {
  return ajaxGet(config.serverUrl + url, params);
};
export const saveTask = (url, params = {}) => {
  return ajaxPost(config.serverUrl + url, params);
};
export const taskDetail = (url, params = {}) => {
  return ajaxGet(config.serverUrl + url, params);
};
export const getJdLiveInfo = (url, params = {}) => {
  return ajaxGet(config.serverUrl + url, params);
};

export const payMoney = (url, params = {}) => {
  return ajaxGet(config.serverUrl + url, params);
};
