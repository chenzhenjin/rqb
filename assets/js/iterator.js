/*
 * @Author: chenzhenjin
 * @email: BrotherStudy@163.com
 * @Date: 2020-07-15 09:27:36
 * @LastEditTime: 2020-10-20 09:29:28
 * @Descripttion: 迭代器模式
 */

/**
 * @description: 路劲查找 处理连续对复杂对象（对象嵌套数组）.语法和[]语法的取值判断简化操作
 * @param {object} obj
 * @example '{array:[{a:1}],a:{b:1}}'
 * @param {string} key
 * @example 'array[0].a' || 'a.b'
 * @return  {undefined} undefined || any
 */
export const findObjAttr = function(obj, key) {
  if (!obj || !key) {
    return undefined;
  }
  let result = obj;
  key = key.split(".");
  // console.log('key', key)
  let keyLength = key.length;
  for (let findI = 0; findI < keyLength; findI++) {
    let arrayIndex = null;
    if (key[findI].includes("[")) {
      let keys = key[findI].split("[");
      key[findI] = keys[0];
      arrayIndex = Number(keys[1].match(/\d+/)[0]);
    }
    // console.log('key[findI]',key[findI])
    // console.log("result[key[findI]]", result[key[findI]]);
    if (result[key[findI]] !== undefined) {
      if (Array.isArray(result[key[findI]])) {
        // console.log('length', result[key[findI]].length)
        if (arrayIndex >= 0 && arrayIndex + 1 > result[key[findI]].length) {
          //判断查找小标值是否存在于数组
          // console.log('undefined')
          return undefined;
        }
        if (arrayIndex != null) {
          result = result[key[findI]][arrayIndex];
        } else {
          result = result[key[findI]];
        }
        // console.log("Array result", result);
      } else {
        result = result[key[findI]];
      }
    } else {
      return undefined;
    }
  }
  // console.log("result", result);
  return result;
};
// 测试用例
// console.log("findObjAttr", findObjAttr({ array: [{a:[1,2]}] }, "array[1].a.length"));

/**
 * @description: 设置对象嵌套对象或者数组的设置 递归导致对象变化和结束条件 数组队列变化shift
 * @param {object} obj 
 * @example '{a[{b:{c:5}}]}'
 * @param {string} key 
 * @example 'a[0].b.c'
 * @param {} val 基本类型为主 
 * @return {} 无 
 */
export const setObjAttr = function(obj, key, val) {
  if(obj instanceof Array || !(obj instanceof Object)) {
    console.error(`${obj} must Object`)
    return
  }else if(!key){
    console.error(`key can not ${key};key must String and not null`)
    return
  }
  function nextObjSetAndGet(mode, obj, key, val) {
    let nextObj = {};
    if (key.includes("[")) {
      const firstKey = key.split("[")[0];
      const sendKey = key.split("[")[1].match(/\d+/)[0];
      if (mode === 1) {
        if (!obj[firstKey] || obj[firstKey].length === 0) {
          obj[firstKey] = [];
          obj[firstKey][sendKey] = {};
        }
        nextObj = obj[firstKey][sendKey] || (obj[firstKey][sendKey] = {});
      }
      mode === 2 && (obj[firstKey][sendKey] = val);
      // console.log("[]", nextObj);
    } else {
      mode === 1 && (nextObj = obj[key] || (obj[key] = {}));
      mode === 2 && (obj[key] = val);
      // console.log("no []", nextObj);
    }
    return nextObj;
  }
  //利用队列出队的形式，改变keys原有的数组，通过keys的个数去判断是取值还是赋值
  function deepObjAttr(obj, keys, val) {
    const key = keys.shift();
    const keysLength = keys.length;
    // console.log("deepObjAttr", key, val);
    if (keysLength > 0) {
      deepObjAttr(nextObjSetAndGet(1, obj, key), keys, val);
    } else {
      nextObjSetAndGet(2, obj, key, val);
    }
  }
  let keys = key.split(".");
  // console.log("setObjAttr keys", keys);
  deepObjAttr(obj, keys, val);
};
// let a = { a: [{ b: { c: 5 } }] };
// let b = { a: { b: { c: 5 } } };
// let c = { a: [] };
// let d = { a: [{ d: {} }] };
// let e = {a:'abc'}
// let f = 'abc'
// setObjAttr(a, "a[0].b.c", 6);
// setObjAttr(a, "b[0].b.c", 6);
// setObjAttr(a, "b[0]", 6);
// setObjAttr(b, "a.b.c", 6);
// setObjAttr(b, "a.d.d", 6);
// setObjAttr(c, "a[0].b.c", 6);
// setObjAttr(d, "a[0].b.c", 6);
// console.log("setObjAttr", a);
// console.log("setObjAttr", b);
// console.log("setObjAttr", c);
// console.log("setObjAttr", d);
// setObjAttr(e, null, 5)
// setObjAttr(f, 'a', 5)
