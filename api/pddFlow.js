import {ajaxGet,ajaxPost} from "../assets/js/ajax";
import config from "../commonComponent/config";
/**
 * 保存流量任务
 * @params String incrementType 增量类型 1 无增量 2 10% 3 15% 4 20% 5 25% 6 30% 7 50%
 * @params String flowType  流量类型：1Wifi 24G
 * @params String shopName  店铺名称
 * @params String shopCar   加入购物车量
 * @params String click     点击量
 * @params String schedulerEnd  结束日期（yyyy-MM-dd）
 * @params String schedulerStart    开始日期 （yyyy-MM-dd）
 * @params String attentionProduct  关注商品数
 * @params String shopNumber    店铺编号
 * @params String goodsImageUrl 商品图片url
 * @params String keyword   关键词
 * @params String sku
 * @params String attentionStore    关注店铺数
 * @params String taskType  任务类型 1为快车任务 2为流量任务
 * @params String goodsTitle
 * @params String goodsPrice
 * @params String goodsBrand
 * @params String dateType
 * @params String id    修改id(从根据sku查商品信息获取)
 */
export const saveTaskFlow = (params = {}) => {
    return ajaxPost(config.serverUrl + 'yushu-popbao/flowPin/saveTaskFlow', params)
};
/**
 * 获取任务列表
 * @params String page
 */
export const getFlowTaskList = (params = {}) => {
    return ajaxGet(config.serverUrl + 'yushu-popbao/flowPin/getFlowTaskList', params)
};


/**
 * 获取详情
 * @params String page
 * @params String taskId    任务编号
 */
export const getTaskDateList = (params) => {
    return ajaxGet(config.serverUrl + 'yushu-popbao/flowPin/getTaskDateList', params)
};


/**
 * 获取价格列表
 */
export const getCostList = (params) => {
    return ajaxGet(config.serverUrl + 'yushu-popbao/flowPin/getCostList', params)
};

/**
 * 获取任务详情（再编辑）
 * @params String taskId
 */
export const getFlowTaskDetail = (params) => {
    return ajaxGet(config.serverUrl + 'yushu-popbao/flow/getFlowTaskDetail', params)
};


/**
 * 发布
 * @params String incrementType 增量类型 1 无增量 2 10% 3 15% 4 20% 5 25% 6 30% 7 50%
 * @params String flowType  流量类型：1Wifi 24G
 * @params String shopName  店铺名称
 * @params String shopCar   加入购物车量
 * @params String click     点击量
 * @params String schedulerEnd  结束日期（yyyy-MM-dd）
 * @params String schedulerStart    开始日期 （yyyy-MM-dd）
 * @params String attentionProduct  关注商品数
 * @params String shopNumber    店铺编号
 * @params String goodsImageUrl 商品图片url
 * @params String keyword   关键词
 * @params String sku
 * @params String attentionStore    关注店铺数
* @params String taskType  任务类型 1为快车任务 2为流量任务
* @params String goodsTitle
* @params String goodsPrice
* @params String goodsBrand
* @params String dateType
* @params String id    修改id(从根据sku查商品信息获取)
*/
export const releaseTaskFlow = (params) => {
    return ajaxPost(config.serverUrl + 'yushu-popbao/flowPin/releaseTaskFlow', params)
};

/**
 * 根据拼多多店铺链接获取店铺名
 * @params String shopUrl 店铺链接
 */
export const getPinShop = (params) => {
    return ajaxGet(config.serverUrl + 'yushu-jdapi/api/getPinShop', params)
};