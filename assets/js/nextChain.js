/*
 * @Author: chenzhenjin
 * @email: BrotherStudy@163.com
 * @Date: 2020-08-28 13:52:19
 * @LastEditTime: 2020-09-01 15:03:36
 * @Descripttion: 责任链模式 定义函数 统一处理函数 next指向 单例模式 微应用 针对next只需要一次赋值或者null
 */

export const NextChain = function(fn) {
  this.fn = fn;
  this.next = null;
};
NextChain.prototype.setNext = function(nextChain) {
  //避免重复设置下个责任，另外还可以重置next为null
  if (!!this.next && !!nextChain) return;
  this.next = nextChain;
};
// 只有前面的函数执行通过才去执行下一次
// 并且判断next是否有值
// 传入对象参数，便于多个fn解构
NextChain.prototype.handler = function(arg) {
  if (!!this.next) {
    return this.fn(arg) && this.next.handler(arg);
  } else {
    return this.fn(arg);
  }
};
