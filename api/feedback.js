import {
  ajaxGet,
  ajaxPost
} from "../assets/js/ajax";
import config from "../commonComponent/config";
/*
 *   获取模块列表
 */

export const getJdbProductModule = (params = {}) => {
  return ajaxGet(config.serverUrl + 'yushu-operation/feedback/getJdbProductModule', params);
};

/*
 *   获取模块列表
 */

export const addFeedback = (params = {}) => {
  return ajaxPost(config.serverUrl + 'yushu-operation/feedback/addFeedback', params);
};
/*
 *   获取消息列表
 */

export const getMessageShowList = (params = {}) => {
  return ajaxGet(config.serverUrl + 'yushu-operation/message/getMessageShowList', params);
};
/*
 *   获取最新消息
 */

export const checkHaveNews = (params = {}) => {
  return ajaxGet(config.serverUrl + 'yushu-operation/message/checkHaveNews', params);
};
