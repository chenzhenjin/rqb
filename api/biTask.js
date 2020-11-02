import {ajaxGet, ajaxPost} from "../assets/js/ajax";
import config from '../commonComponent/config';
/**
 * 个性化任务接口相关
 * @author siyong
 */


/**
 * 获取个性化任务单价
 */
export const getUnitPrice = (params = {}) => {
    return ajaxGet(config.serverUrl + 'yushu-popbao/biTask/getUnitPrice', params)
};

/**
 * 保存任务
  "biTaskType": 0, BI任务类型
  "competingNum": 0, 竞品数量
  "competingUrls": [ 竞拍链接
    "string"
  ],
  "dateType": 0, 日期类型
  "dealTaskType": 0, 执行方式
  "endDate": "string", 结束时间
  "id": 0,任务id
  "imageUrl": "string",商品图片
  "incrementType": 0,增量类型
  "keyword": "string",关键词
  "sku": 0,
  "startDate": "string",开始时间
  "taskNum": 0,任务数量
  "title": "string"标题
 */
export const saveBiTask = (params = {}) => {
    return ajaxPost(config.serverUrl + 'yushu-popbao/biTask/saveBiTask', params)
};


/**
 * 任务支付
 "biTaskType": 0, BI任务类型
 "competingNum": 0, 竞品数量
 "competingUrls": [ 竞拍链接
 "string"
 ],
 "dateType": 0, 日期类型
 "dealTaskType": 0, 执行方式
 "endDate": "string", 结束时间
 "id": 0,任务id
 "imageUrl": "string",商品图片
 "incrementType": 0,增量类型
 "keyword": "string",关键词
 "sku": 0,
 "startDate": "string",开始时间
 "taskNum": 0,任务数量
 "title": "string"标题
 */
export const payBiTask = (params = {}) => {
    return ajaxPost(config.serverUrl + 'yushu-popbao/biTask/payBiTask', params)
};

/**
 *获取任务列表
  "endDate": "string",
  "id": 0,
  "keyword": "string",
  "page": 0,
  "sku": 0,
  "startDate": "string"
 */
export const listUserBiTask = (params = {}) => {
    return ajaxPost(config.serverUrl + 'yushu-popbao/biTask/listUserBiTask', params)
};
/**
 * 任务支付
 id
 */
export const editBiTask = (params = {}) => {
    return ajaxGet(config.serverUrl + 'yushu-popbao/biTask/editBiTask', params)
};

/**
 * 删除任务
 id
 */
export const deleteBiTask = (params = {}) => {
    return ajaxGet(config.serverUrl + 'yushu-popbao/biTask/deleteBiTask', params)
};

/**
 * 获取任务详情
 id
 */
export const listBiDayTask = (params = {}) => {
    return ajaxGet(config.serverUrl + 'yushu-popbao/biTask/listBiDayTask', params)
};

/**
 * 获取sku信息
 * @params id
 */
export const getSkuInfo = (params = {}) => {
    return ajaxGet(config.serverUrl + 'yushu-popbao/sku/getSkuInfo', params)
};

/**
 * 根据sku查询这个sku淘宝的产品信息
 * @params skuId
 */
export const getTaobaoSkuInfo = (params = {}) => {
    return ajaxGet(config.serverUrl + 'yushu-jdapi/api/getTaobaoSkuInfo', params)
};


/**
 * 根据sku查询这个sku拼多多的产品信息
 * @params skuId
 */
export const getPinSkuInfo = (params = {}) => {
    return ajaxGet(config.serverUrl + 'yushu-jdapi/api/getPinSkuInfo', params)
};


/**
 * 放弃任务
 * @params id
 */
export const cancelBiTask = (params = {}) => {
    return ajaxGet(config.serverUrl + 'yushu-popbao/biTask/cancelBiTask', params)
};