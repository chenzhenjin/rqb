/*
 * @Author: chenzhenjin
 * @email: BrotherStudy@163.com
 * @Date: 2020-07-10 11:22:40
 * @LastEditTime: 2020-10-20 16:51:15
 * @Descripttion: number策略集合
 */
// 策略模式 numHandlerMap 处理输入默认number处理的所有策略合集
let numStrategyMap = {}

/**
 * @description: 处理num标识+-.策略
 * @param {number} val
 * @param { [string] | string} symbol 传数组注意'-' '+'优于 '.'
 * @example '['+','.']'
 * @return {number} 
 */
numStrategyMap.numSymbol = function(val, symbol) {
  let valArray = []
  const valString = val + '' //注意+10 会变成 '10' -10 会变成 '-10' 10.25 会变成 '10.25'
  // console.log('numHandlerMap valString', valString)
  if (Array.isArray(symbol)) {
    // [] '-' '+'优于 '.'
    let initVal = valString
    symbol.map(symbolItem => {
      if (initVal.includes(symbolItem)) {
        valArray = initVal.split(symbolItem).filter(item => item !== '')
        // console.log('numHandlerMap valArray', valArray)
        initVal = valArray[0]
        // console.log('numHandlerMap initVal', initVal)
      }
    })
    return Number(initVal)
  } else {
    if (valString.includes(symbol)) {
      valArray = valString.split(symbol).filter(item => item !== '')
      return Number(valArray[0])
    } else {
      return Number(val)
    }
  }
}
/**
 * @description: 限制输入最大最小值
 * @param {number} val 
 * @param {?number} min 
 * @param {number} max 
 * @return {number} val
 */
numStrategyMap.minMax = function(val, min = 0, max = 100) {
  if (val > max) return max
  if (val < min) return min
  return val
}
/**
 * @description: 封装上下文，只对外提供一个接口
 * @param {string} type
 * @param {[]} ...params
 * @return { undefined | Function}
 */
export const context = function(type, ...params) {
  return numStrategyMap[type] && numStrategyMap[type](...params)
}
