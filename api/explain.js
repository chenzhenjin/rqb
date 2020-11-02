import {
  ajaxGet,
  ajaxPost
} from "../assets/js/ajax";

import config from "../commonComponent/config"
/**
 * 获取单个下单说明文章
 * @params id   下单说明文章Id
 */
export const getOneOrderDescriptionById = (params = {}) => {
  return ajaxGet(config.serverUrl + 'yushu-operation/orderDescription/getOneOrderDescriptionById', params);
};


/**
 * 获取单个任务简介文章
 * @params id 任务简介文章Id
 */
export const getOneTaskDescriptionById = (params = {}) => {
  return ajaxGet(config.serverUrl + 'yushu-operation/taskDescription/getOneTaskDescriptionById', params);
};
