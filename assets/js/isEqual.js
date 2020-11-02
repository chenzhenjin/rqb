/*
 * @Author: chenzhenjin
 * @email: BrotherStudy@163.com
 * @Date: 2020-10-30 10:28:16
 * @LastEditTime: 2020-10-30 10:46:43
 * @Descripttion: 判断两个对象是否相等
 */
function isObject(obj) {
  // 利用这个值类型来做处理
  return typeof obj === 'object' && obj !== null
}
export const isEqual = function(obj1, obj2) {
  if (!isObject(obj1) || !isObject(obj2)) {
    return obj1 === obj2
  }
  if (obj1 === obj2) {
    return true
  }
  const obj1keys = Object.keys(obj1)
  const obj2keys = Object.keys(obj2)
  if (obj1keys.length !== obj2keys.length) {
    return false
  }
  for (const key in obj1) {
    const res = isEqual(obj1[key], obj2[key])
    // console.log('isEqual key', res, key)
    if (!res) {
      // 这个很关键，只要检查一个false就抛出
      return false
    }
  }
  return true
}

console.log('isEqual', isEqual({a: 12, b:123}, {a:12, b:123}))
