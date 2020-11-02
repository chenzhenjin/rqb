/*
 * @Author: chenzhenjin
 * @email: BrotherStudy@163.com
 * @Date: 2020-07-10 13:11:11
 * @LastEditTime: 2020-08-17 15:10:49
 * @Descripttion: 观察者模式 观察者 目标 观察者列表  
 * @compare：其实就是多个函数的抽离成公共函数，但是与之不同的是，
 * 观察者实现函数松耦合，不用老是修改公共函数，而是通过subject进行管理
 */
//观察者 可由用户自行编写
//针对对象  改变对象某个属性
//待观察者数据创建完成后追加观察者声明observer1、2、3.。。
//针对对象
export const Observer = function(changeObj) {
  // console.log('changeObj', changeObj)
  this.changeObj = changeObj;
  // console.log("Observer this.changeObj", this)
};
Observer.prototype.update = function({ type, val }) {
  this.changeObj[type] = val;
};
//针对数组含有对象  改变对象某个属性
export const ObserverArray = function(changeObj) {
  this.changeObj = changeObj;
};
ObserverArray.prototype.update = function({ type, val }) {
  this.changeObj.map(item => {
    item[type] = val;
  });
};

/**
 * @description: 用于涉及传参的多个观察者update调用 待观察者数据创建完成后追加观察者 代码场景
 * @attribute: observerList:Array 观察者列表
 * @function: addObserver 向观察者列表添加观察者
 *  @params: obs:Class 观察者类 
 * @function: removeObserver 向观察者列表移除观察者
 *  @params: obs:Class 观察者类 
 * @function: notify 待数据返回函数时，执行观察者的update方法
 *  @params: args:arguments 参数 
 */
export const Subject = function() {
  this.observerList = []; //观察者列表
};
Subject.prototype.addObserver = function(obs) {
  this.observerList.push(obs);
};
Subject.prototype.removeObserver = function(obs) {
  this.observerList = this.observerList.filter(item => obs !== item);
  // console.log('this.observerList', this.observerList )
};
Subject.prototype.notify = function(args) {
  this.observerList.map(item => {
    item.update(args);
  });
};

/**
 * @description: 用于不涉及传参的多个函数调用 代码场景
 * @attribute: observerList:Array 观察者列表
 * @function: addObserver 向观察者列表添加观察者
 *  @params: obs:Class 观察者函数
 * @function: removeObserver 向观察者列表移除观察者
 *  @params: obs:Class 观察者函数
 * @function: notify 待数据返回函数时，执行观察者函数
 *  @params: args:arguments 参数 
 */
export const Subjectfn = function() {
  this.observerList = []; 
};
Subjectfn.prototype.addObserver = function(obs) {
  this.observerList.push(obs);
};
Subjectfn.prototype.removeObserver = function(obs) {
  this.observerList = this.observerList.filter(item => obs !== item);
  // console.log('this.observerList', this.observerList )
};
Subjectfn.prototype.notify = function(args) {
  this.observerList.map(item => {
    item(args);
  });
};
