/*
 * @Author: chenzhenjin
 * @email: BrotherStudy@163.com
 * @Date: 2020-07-17 16:43:56
 * @LastEditTime: 2020-09-15 13:50:53
 * @Descripttion: 表单校验
 */

/**
 * @description: 关键字是否都包含在商品标题
 * @attribute: title:String 商品标题  注意赋值
 * @params: value:String
 * @params: callback:Function
 * @return: callback
 */
export const checkKeyWords = function(rule, value, callback) {
  console.log("value", typeof value);
  console.log("platForm", checkKeyWords.params.platForm);
  value === "" && callback(new Error("请输入关键词"));
  let valueArray = value.split("");
  valueArray = valueArray.filter(item => item !== ' ')
  console.log('valueArray', valueArray)
  const title = checkKeyWords.title;
  console.log("title", title);
  let isExit = true;
  if (!(checkKeyWords.params.platForm === "pdd")) {
    valueArray.map(item => {
      isExit = isExit && title.includes(item);
    });
  }
  if (isExit) {
    callback();
  } else {
    callback(new Error("关键词不符合要求，请看任务简介"));
  }
  // console.log("checkKeyWords valueArray", valueArray);
  // console.log(" isExit", isExit);
};

export const checkIsInteger = function(rule, value, callback) {
  console.log("checkIsInteger", Number.isInteger(value));
  if (!Number.isInteger(value) || value <= 0 ) {
    callback(new Error("请输入大于0的整数"));
  } else {
    callback();
  }
};

export const checkZeroInteger = function(rule, value, callback) {
  if (!Number.isInteger(value) || value < 0) {
    callback(new Error("请输入大于或者等于0的整数"));
  } else {
    callback();
  }
};
