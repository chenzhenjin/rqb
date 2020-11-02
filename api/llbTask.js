import {
  ajaxGet,
  ajaxPost
} from "@/assets/js/ajax";
import config from "@/commonComponent/config";

/**
 * 能量宝任务接口相关
 * @author siyong
 */


/**
 * 删除任务
 * @params int id
 */
export const deletePowerPop = (params = {}) => {
  return ajaxGet(config.serverUrl + 'yushu-popbao/powerPop/delete', params)
};

/**
 * 获取价格列表
 */
export const getPowerPopTaskPrice = (params = {}) => {
  return ajaxGet(config.serverUrl + 'yushu-popbao/powerPop/getPowerPopTaskPrice', params)
};

/**
 * 获取任务列表
 */
export const listPowerPopTask = (params = {}) => {
  return ajaxGet(config.serverUrl + 'yushu-popbao/powerPop/listPowerPopTask', params)
};

/**
 * 支付任务(京东)
 */
export const payPowerPopTask = (params = {}) => {
  return ajaxPost(config.serverUrl + 'yushu-popbao/powerPop/payPowerPopTask', params)
};
/**
 * 支付任务(淘宝)
 */
export const payTbPowerPopTask = (params = {}) => {
  return ajaxPost(config.serverUrl + 'yushu-popbao/powerPopTaobao/payPowerPopTask', params)
};

/**
 * 支付任务(拼多多)
 */
export const payPddPowerPopTask = (params = {}) => {
  return ajaxPost(config.serverUrl + 'yushu-popbao/powerPopPin/payPowerPopTask', params)
};
/**
 * 保存任务(京东)
 */
export const savePowerPopTask = (params = {}) => {
  return ajaxPost(config.serverUrl + 'yushu-popbao/powerPop/savePowerPopTask', params)
};

/**
 * 保存任务(淘宝)
 */
export const saveTbPowerPopTask = (params = {}) => {
  return ajaxPost(config.serverUrl + 'yushu-popbao/powerPopTaobao/savePowerPopTask', params)
};

/**
 * 保存任务(拼多多)
 */
export const savePddPowerPopTask = (params = {}) => {
  return ajaxPost(config.serverUrl + 'yushu-popbao/powerPopPin/savePowerPopTask', params)
};

/**
 * 编辑任务
 */
export const editPowerPopTask = (params = {}) => {
  return ajaxGet(config.serverUrl + 'yushu-popbao/powerPop/editPowerPopTask', params)
};

/**
 *获取能量宝任务标题
 */
export const getTaskTitle = (params = {}) => {
  return ajaxGet(config.serverUrl + 'yushu-popbao/sku/getTaskTitle', params)
};
/**
 *放弃任务
 */
export const cancelPowerPopTask = (params = {}) => {
  return ajaxGet(config.serverUrl + 'yushu-popbao/powerPop/cancelPowerPopTask', params)
};
/**
 *获取任务详情
 */
export const listPowerPopDayTask = (params = {}) => {
  return ajaxGet(config.serverUrl + 'yushu-popbao/powerPop/listPowerPopDayTask', params)
};
/**
 * 京东单个任务保存
 * @params String endDate 结束时间
 * @params String id  任务id
 * @params String keyword  关键词
 * @params String planType   执行方式 1根据用户购买曲线执行 2集中短时间完成 3到24点平均执行 4自定义执行
 * @params String platformType     前端不用传 ，电商平台，1京东，3拼多多，2淘宝
 * @params String powerPopType  业务类型选择
 * @params String shortUrl   短链url
 * @params String startDate  开始时间
 * @params String subTaskType    任务类型 1只领券 2只提单 3领券加提单
 * @params String taskNum 每日数量
 * @params String title   任务标题
 * @params String url 产品url
 */
export const saveSinglePopTask = (params = {}) => {
  return ajaxPost(config.serverUrl + 'yushu-popbao/powerPop/saveSinglePopTask', params)
};
/**
 * 京东单个任务支付
 * @params String endDate 结束时间
 * @params String id  任务id
 * @params String keyword  关键词
 * @params String planType   执行方式 1根据用户购买曲线执行 2集中短时间完成 3到24点平均执行 4自定义执行
 * @params String platformType     前端不用传 ，电商平台，1京东，3拼多多，2淘宝
 * @params String powerPopType  业务类型选择
 * @params String shortUrl   短链url
 * @params String startDate  开始时间
 * @params String subTaskType    任务类型 1只领券 2只提单 3领券加提单
 * @params String taskNum 每日数量
 * @params String title   任务标题
 * @params String url 产品url
 */
export const paySinglePopTask = (params = {}) => {
  return ajaxPost(config.serverUrl + 'yushu-popbao/powerPop/paySinglePopTask', params)
};
/**
 * 获取用户是否是黑名单 旧的接口yushu-popbao//general/checkIsBlackUser
 */
export const checkIsBlackUser = (params = {}) => {
  return ajaxGet(config.serverUrl + 'yushu-jdb-popbao/default/checkIsBlackUser', params)
};
