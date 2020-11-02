import {ajaxGet} from "../assets/js/ajax";
import config from '../commonComponent/config'
/**
 * 排名查询--h5指定商品
 * @params String searchWord    搜索关键词
 * @params String skuId
 * @params Number sortType  排序类型， 1综合排序 2销量排序 3评价排序 4新品排序 5价格排序
 */
export const rankH5Product = (params = {}) => {
    return ajaxGet(config.serverUrl + 'yushu-jdapi/api/rankH5Product', params);
};
/**
 * 排名查询--pc指定商品
 * @params String skuId
 * @params String sortType
 * @params String searchKeyword
 */
export const rankPcProduct = (params = {}) => {
    return ajaxGet(config.serverUrl + 'yushu-jdapi/api/rankPcProduct', params);
};