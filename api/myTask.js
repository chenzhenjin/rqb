/*
 * @Author: chenzhenjin
 * @email: BrotherStudy@163.com
 * @Date: 2020-07-20 18:22:56
 * @LastEditTime: 2020-08-04 11:04:44
 * @Descripttion: 模块描述
 */ 
import {ajaxGet, ajaxPost} from "../assets/js/ajax";
import config from "../commonComponent/config";
export const taskList = function(params = {}) {
  return ajaxGet(config.serverUrl + 'yushu-jdb-popbao/default/taskList', params)
}
export const deleteTask = function(params = {}){
  return ajaxGet(config.serverUrl + 'yushu-jdb-popbao/default/deleteTask', params)
}
export const getPrice = function(params = {}){
  return ajaxGet(config.serverUrl + 'yushu-jdb-popbao/default/getPrice', params)
}

export const giveUpTask = function(url, params = {}){
  return ajaxGet(config.serverUrl + 'yushu-jdb-popbao/' + url, params)
}

export const taskDetail = function(url, params = {}){
  return ajaxGet(config.serverUrl + 'yushu-jdb-popbao/' + url, params)
}
export const dayTaskList = function(url, params= {}){
  return ajaxGet(config.serverUrl + 'yushu-jdb-popbao/' + url, params)
}
