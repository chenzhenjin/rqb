/*
 * @Author: chenzhenjin
 * @email: BrotherStudy@163.com
 * @Date: 2020-08-21 09:53:02
 * @LastEditTime: 2020-09-01 15:04:40
 * @Descripttion: 发布-订阅类模式 订阅者对象建立key-array事件组
 */
export const PubSub = function() {
  this.subscribers = {};
};
//向订阅者对象添加函数
PubSub.prototype.subscriber = function(type, fn) {
  if (!Object.prototype.hasOwnProperty.call(this.subscribers, type)) {
    this.subscribers[type] = [];
  }
  this.subscribers[type].push(fn);
};
//向某个订阅者传入参数
//改良传统的发布方法，引入纯函数返回值
// ...获取剩余参数，args是个数组
PubSub.prototype.publish = function(type, ...args) {
  let listeners = this.subscribers[type];
  if (!listeners || listeners.length === 0) return {};
  let res = {}
  listeners.forEach((fn,index) => {
    res[index] = fn(...args);
  });
  return res
};
