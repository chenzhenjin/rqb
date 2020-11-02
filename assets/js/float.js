/*
 * @Author: chenzhenjin
 * @email: BrotherStudy@163.com
 * @Date: 2020-07-27 17:49:13
 * @LastEditTime: 2020-10-28 15:18:19
 * @Descripttion: 小数处理
 */

/**
 * @description: 保留两位小数，四舍五入
 * @param {Number} float  正浮点数
 * @param {Number} digit  保留的位数
 * @return {Number} 两位小数的浮点数
 */
export const floatHandle = function(float, digit = 2) {
  // return Number(float.toFixed(digit)) //1.335 1.035 不能转成 1.34 1.04  a.b35  1<a<7 && 0<b<3 不能转为 2.34 3.34 
  const multiple = Math.pow(10, digit);
  if (float < 0) {
    return -Math.round(-float * multiple) / multiple;
  }
  return Math.round(float * multiple) / multiple; //处理不了-1.335
};

