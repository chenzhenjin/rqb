/*
 * @Author: chenzhenjin
 * @email: BrotherStudy@163.com
 * @Date: 2020-08-20 15:19:01
 * @LastEditTime: 2020-10-30 17:23:59
 * @Descripttion: 发布页面纯函数 减少视觉代码
 */
import { floatHandle } from '@/commonProject/assets/js/float.js'
import { timeToFormatDate, datePastHandle, timePastHandle } from '@/commonProject/assets/js/plainDate.js'

/**
 * @description: 订阅和发布形式的 表单检验
 * @param {string} val
 * @param {{string,string}} promptText
 * @example '{nullError, regFailError}'
 * @param {RegExp} Reg
 * @return {string} string
 */
export const linkRegFn = function(val, promptText, Reg) {
  if ([null, ''].includes(val)) {
    return promptText.nullError
  } else if (!val.match(Reg)) {
    return promptText.regFailError
  } else {
    return ''
  }
}

/**
 * @description: 纯函数 创建每个表格的总数和分配的数组单元
 * @param {number} limitNums
 * @param {number} mode
 * @param {[]} tempArray
 * @return {object} { array, total }
 */
export const createAssignTableObj = (limitNums, mode, tempArray) => {
  let array = []
  let total = 0
  if (limitNums.includes(mode)) {
    array = tempArray
    total = tempArray.length > 1 ? tempArray.reduce((x, y) => x + y) : 0
  }
  return { array, total }
}
/**
 * @description: 纯函数 将后端计划的内容解析为前端所适配的内容
 * @param {object}  receivePlan 从后端接收的某个计划数据
 * @param {object}  transformPlain
 * @param {[number]}  twoAlgorithmNums
 * @param {[number]}  customArrayNums
 * @param {[number]}  showDateNums
 * @param {[number]}  showTimeNums
 * @param {Function}  createAssignTableObjFn
 * @return {object} {
    plainId: plainId,
    indexSymbol: Date.now(),
    form: frontForm,
    typeTableTotal: frontTypeTableTotal,
    assign: frontAssign
  }
 */
export const analysyPlan = (
  receivePlan,
  transformPlain,
  twoAlgorithmNums,
  customArrayNums,
  showDateNums,
  showTimeNums,
  i,
  createAssignTableObjFn = createAssignTableObj
) => {
  const { form, assign, typeTableTotal } = transformPlain
  const plainId = receivePlan['id']
  // console.log('analysyPlan plainId', plainId)
  let frontForm = {}
  for (let key in form) {
    if (Array.isArray(form[key])) {
      // console.log('form[key]', form[key])
      const dateKey = form[key][0]
      // console.log('dateKey', dateKey)
      frontForm[dateKey] || (frontForm[dateKey] = [])
      const dateIndex = form[key][1]
      // console.log('dateIndex', dateIndex)
      frontForm[dateKey][dateIndex] = receivePlan[key]
    } else {
      frontForm[form[key]] = receivePlan[key]
    }
  }
  if (showDateNums.includes(frontForm['carryOutMode'])) {
    frontForm['carryOutTime'] && delete frontForm['carryOutTime']
    frontForm.carryOutDate !== undefined && (frontForm.carryOutDate = datePastHandle(frontForm.carryOutDate))
  } else if (showTimeNums.includes(frontForm['carryOutMode'])) {
    frontForm['carryOutDate'] && delete frontForm['carryOutDate']
    frontForm.carryOutTime !== undefined && (frontForm.carryOutTime = timePastHandle(frontForm.carryOutTime))
  }
  console.log('analysyPlan frontForm', frontForm)
  let frontTypeTableTotal = {}
  for (let key in typeTableTotal) {
    frontTypeTableTotal[typeTableTotal[key]] = receivePlan[key]
  }
  console.log('analysyPlan frontTypeTableTotal', frontTypeTableTotal)
  const carryOutMode = frontForm['carryOutMode']
  // console.log('carryOutMode', carryOutMode)
  let frontAssign = {}
  for (let key in assign) {
    // console.log('receivePlan[key]', receivePlan[key])
    console.log('assign[key].array', assign[key].array)
    frontAssign[assign[key].array] = { array: [] }
    if (receivePlan[key]) {
      frontAssign[assign[key].array].array = receivePlan[key].map(item => {
        console.log('receivePlan[key] item', item)
        // 转化hour的字符串为数组，同时防止hour为null的情况
        const tempArray = item.hour ? item.hour.split(',').map(num => +num) : []
        console.log('tempArray', tempArray)
        const { array: tableArray, total } = createAssignTableObjFn(twoAlgorithmNums, carryOutMode, tempArray)
        const { array: customTableArray, total: customNumber } = createAssignTableObjFn(
          customArrayNums,
          carryOutMode,
          tempArray
        )
        return { tableArray, customTableArray, total, customNumber }
      })
    }
  }
  console.log('frontAssign', frontAssign)
  return {
    plainId: plainId,
    indexSymbol: Date.now() + i ,
    form: frontForm,
    typeTableTotal: frontTypeTableTotal,
    assign: frontAssign
  }
}

/**
 * @description: 纯函数 设置每条支付信息的表格
 * @param {object} val
 * @param {object} priceMap
 * @return {object} data
 */
export const setTableDataItem = (val, priceMap) => {
  let data = {}
  data.money = 0
  for (let key in val) {
    console.log('setTableDataItem key', key)
    if (key === 'incrementRatio' || key === 'carryOutMode' || key === 'carryOutData') continue
    // console.log('setTableDataItem', priceMap[key], key)
    if (key.includes('Total')) {
      data.money = floatHandle(data.money + floatHandle(val[key] * priceMap[key]))
      console.log('floatHandle', key, floatHandle(val[key] * priceMap[key]))
    }
    data[key] = val[key]
  }
  data.money = '￥' + data.money
  return data
}

/**
 * @description: 纯函数 删除表单属性数组和表格属性数组的头个对象
 * @param {[object]} props
 * @return {[object]} deleteProps
 */
export const deepCopyDeleteArray = props => {
  const deleteProps = JSON.parse(JSON.stringify(props))
  deleteProps.shift()
  return deleteProps
}

/**
 * @description: 纯函数 解析plains为发布页面渲染的renderplains
 * @param {object} plain 
 * @param {number} mode 某些任务选中加搜索时，弹框表单增加keyWords
 * @param {[number]} twoAlgorithmNums 两种分配算法，当所选的分配方式不在里面，就删除递增量
 * @param {[number]} customArrayNums 
 * @param {{string}} carryOutModeLabel 用于分配方式类型转义文本
 * @param {boolean} carryOutModeNeedHour 用于控制date和time显示，只会取一个
 * @param {{number:number}} ratioObj 
 * @return {{date,numberstring,array,object,object}}  {
    indexSymbol,
    plainId,
    ...typeTableTotal,
    ...form,
    assignsDaysObj
  }
 */
export const deepCopyPlains = (
  plain,
  mode,
  twoAlgorithmNums,
  customArrayNums,
  carryOutModeLabel,
  carryOutModeNeedHour,
  ratioObj
) => {
  console.log('deepCopyPlains entryMode', mode)
  // 耦合解决下进入方式与keywords的关联
  let deepCopyCal = JSON.parse(JSON.stringify(plain))
  console.log('deepCopyPlains plain', plain)
  deepCopyCal.indexSymbol = plain.indexSymbol
  let { typeTableTotal, form, plainId, indexSymbol, assign } = deepCopyCal
  // let indexSymbol = symbol ? symbol : deepCopyCal.indexSymbol
  // console.log('deepCopyPlains serialNum', serialNum)
  console.log('deepCopyPlains indexSymbol', indexSymbol)
  console.log('deepCopyCal.indexSymbol == indexSymbol', deepCopyCal.indexSymbol == indexSymbol)
  console.log('deepCopyPlains mode', mode)
  // mode做值限定结合短路运算来做关键字在计划区域和支付区域的显示
  if (mode === 0 || Number(mode) > 1) {
    console.log('delete form.keyWords')
    delete form.keyWords
  }
  ;[('1', 1)].includes(mode) && (form.keyWords || (form.keyWords = ''))
  let assignsDaysObj = {}
  for (let key in assign) {
    if (twoAlgorithmNums.includes(form.carryOutMode)) {
      assignsDaysObj[key] = assign[key].array.map(item => item.total)
    } else if (customArrayNums.includes(form.carryOutMode)) {
      assignsDaysObj[key] = assign[key].array.map(item => item.customNumber)
    } else {
      assignsDaysObj[key] = [form[key + 'Number']]
    }
  }
  for (let key of Object.keys(form).filter(item => item.includes('Number'))) {
    delete form[key]
  }
  // console.log('JSON.parse1 form', JSON.parse(JSON.stringify(form)))
  if (!twoAlgorithmNums.includes(form.carryOutMode)) {
    form['incrementRatio'] !== undefined && delete form['incrementRatio']
  }
  for (let key in form) {
    if (key === 'carryOutMode') {
      carryOutModeNeedHour
        ? form.carryOutDate !== undefined && delete form.carryOutDate
        : form[key] === 2
          ? form.carryOutDate !== undefined && delete form.carryOutDate
          : form.carryOutTime !== undefined && delete form.carryOutTime
      form[key] = carryOutModeLabel[form[key]]
    }
  }
  // const ratioObj = this.ratioObj
  for (let key in form) {
    if (key === 'carryOutDate') {
      console.log('form[carryOutDate]', form[key])
      if (form[key][0] === form[key][1]) {
        form['incrementRatio'] !== undefined && delete form['incrementRatio']
      }
      // form[key] = datePastHandle(form[key])
      form[key] = form[key].reduce((x, y) => x + '~' + y)
    } else if (key === 'incrementRatio') {
      form[key] = ratioObj[form[key]] * 100 + '%'
    } else if (key === 'carryOutTime') {
      form['incrementRatio'] !== undefined && delete form['incrementRatio']
    }
  }
  // console.log('JSON.parse3 form', JSON.parse(JSON.stringify(form)))
  console.log('form.carryOutMode', typeof form.carryOutMode, form.carryOutMode)
  console.log('form', form)
  return {
    indexSymbol,
    plainId,
    ...typeTableTotal,
    ...form,
    assignsDaysObj
  }
}

/**
 * @description: 纯函数 获取前端计划的index标志做增删改查
 * @param {[]} plains
 * @param {Date} currentSymbol 时间戳
 * @return {number} currentIndex
 */
export const getPlainsIndex = (plains, currentSymbol) => {
  let currentIndex = null
  plains.forEach((item, index) => {
    item.indexSymbol == currentSymbol && (currentIndex = index)
  })
  return currentIndex
}

/**
 * @description: 纯函数 根据mode删除form的关键字
 * @param {object} plain
 * @param {number} mode
 * @param {undefined | boolean} tqKeyWords
 * @return {object}
 */
export const deepCopySendPlainModal = (plain, mode, tqKeyWords) => {
  const sendPlain = JSON.parse(JSON.stringify(plain))
  mode === 0 && delete sendPlain.form.keyWords
  mode === 1 && (sendPlain.form.keyWords || (sendPlain.form.keyWords = ''))
  console.log('deepCopySendPlainModal', tqKeyWords)
  if (tqKeyWords !== undefined) {
    tqKeyWords ? sendPlain.form.keyWords || (sendPlain.form.keyWords = '') : delete sendPlain.form.keyWords
  }
  return sendPlain
}

/**
 * @description: 解构返回给后端的计划格式
 * @param {object} plain 前端的plain
 * @param {object} backplain 构造后端key的value为plain的key
 * @param {[number]} twoAlgorithmNums 两种分配算法，当所选的分配方式不在里面，就删除递增量
 * @param {[number]} customArrayNums 用于取出自定义数组
 * @param {[number]} showDateNums
 * @param {[number]} showTimeNums
 * @param {boolean} carryOutModeNeedHour
 * @return {object}
 */
export const sendBackPlan = (
  plain,
  backplain,
  twoAlgorithmNums,
  customArrayNums,
  showDateNums,
  showTimeNums,
  carryOutModeNeedHour
) => {
  const id = plain[backplain['id']],
    backForm = backplain.form,
    frontForm = plain.form
  let form = {}
  for (let key in backForm) {
    if (Array.isArray(backForm[key])) {
      let res = JSON.parse(JSON.stringify(frontForm))
      const array = backForm[key]
      if (res[array[0]] === undefined) continue
      const length = array.length
      for (let i = 0; i < length; i++) {
        res = res[array[i]]
      }
      form[key] = res
    } else {
      form[key] = frontForm[backForm[key]]
    }
  }
  if (showDateNums.includes(form['executeType'])) {
    form['startTime'] && delete form['startTime']
  } else if (showTimeNums.includes(form['executeType'])) {
    form['startDate'] && delete form['startDate']
    form['endDate'] && delete form['endDate']
  }
  const startDate = form.startDate,
    startTime = form.startTime,
    carryOutMode = plain.form.carryOutMode,
    backAssign = backplain.assign,
    frontAssign = plain.assign
  let assgin = {}
  for (let key in backAssign) {
    console.log('frontAssign', frontAssign[backAssign[key].array])
    assgin[key] = frontAssign[backAssign[key].array].array
    assgin[key] = assgin[key].map((item, index) => {
      // console.log('item', item)
      let hour = ''
      if (twoAlgorithmNums.includes(carryOutMode)) {
        hour = item.tableArray.reduce((x, y) => x + ',' + y)
      } else if (customArrayNums.includes(carryOutMode)) {
        hour = item.customTableArray.reduce((x, y) => x + ',' + y)
      }
      if (showDateNums.includes(form['executeType'])) {
        return {
          hour,
          date: timeToFormatDate(new Date(startDate).getTime() + index * 24 * 3600 * 1000)
        }
      } else if (showTimeNums.includes(form['executeType'])) {
        return {
          hour,
          date: carryOutModeNeedHour ? timeToFormatDate(new Date(startTime).getTime()) : ''
        }
      }
    })
  }
  const backTypeTableTotal = backplain.typeTableTotal
  const frontTypeTableTotal = plain.typeTableTotal
  let typeTableTotal = {}
  // console.log('backAssign.typeTableTotal', backAssign.typeTableTotal)
  for (let key in backTypeTableTotal) {
    typeTableTotal[key] = frontTypeTableTotal[backTypeTableTotal[key]]
  }
  console.log('typeTableTotal', typeTableTotal)
  return { id, ...form, ...assgin, ...typeTableTotal }
}
/**
 * @description: 设置除点击外的每个类型单价
 * @param {object} changePrice
 * @param {undefined | null | number} mode
 * @param {object} priceContent
 * @param {string} priceMapKey
 * @param {object} platForm
 * @param {object} glCarryOutConfig
 * @param {object} priceMap
 * @return {number}
 */
export const getPrice = (changePrice, mode, priceContent, priceMapKey, platForm, glCarryOutConfig, priceMap) => {
  // console.log('changePrice mode entryPrice', changePrice, mode, entryPrice)
  const entryPrice = priceContent.entryPrice
  const carryOutConfig = priceContent.carryOutConfig
  if (Object.keys(entryPrice).length === 0) return
  // platForm = 'tb'
  if (mode === null || mode === undefined) {
    //人气套餐和人气排名 3.2.0版本默认为停留时间对应的价格基数 淘宝和拼多多加carryOutConfig
    let price =
      platForm === 'jd'
        ? entryPrice[changePrice.entryPrice].default
        : entryPrice[changePrice.entryPrice].visit
          ? entryPrice[changePrice.entryPrice].visit[2][glCarryOutConfig['stayType']]
          : 0
    if (platForm !== 'jd' && changePrice.carryOutConfig !== undefined) {
      changePrice.carryOutConfig.map(key => {
        price = floatHandle(price + carryOutConfig[key][glCarryOutConfig[key]])
        console.log('getPrice changePrice.carryOutConfig', key, carryOutConfig[key][glCarryOutConfig[key]])
      })
    }
    console.log('getPrice', price)
    priceMap[priceMapKey] = price
    return price
  } else {
    //人气套餐子类型的任务页面  3.2.0版本 进入方式为0 无访客价格 3.2.0版本 进入方式为1 默认为停留时间对应的价格基数
    // 淘宝和拼多多加carryOutConfig
    // let price = entryPrice[changePrice.entryPrice]['visit'][mode + 1]
    let price = 0
    mode === 0
      ? (price = entryPrice[changePrice.entryPrice].default)
      : (price = entryPrice[changePrice.entryPrice]['visit'][mode + 1][glCarryOutConfig['stayType']])
    if (mode === 1 && platForm !== 'jd' && changePrice.carryOutConfig !== undefined) {
      changePrice.carryOutConfig.map(key => {
        price = floatHandle(price + carryOutConfig[key][glCarryOutConfig[key]])
        // console.log(
        //   'getPrice changePrice.carryOutConfig',
        //   key,
        //   carryOutConfig[key][this.carryOutConfig[key]]
        // )
      })
    }
    console.log('getPrice', price)
    priceMap[priceMapKey] = price
    return price
  }
}
/**
 * @description: 设置radioGoup所对应的价格集合  根据backPriceProp
 * mapkey 对应 entryPrice carryoutConfig
 * typeKey 对应 entryPrice下addbuy  carryoutConfig下click pddCommon
 * key 对应 addbuy下visit pddCommon下compare
 * @param {object} platForm
 * @param {object} backPriceProp
 * @param {object} backprice
 * @param {[]} priceList
 * @return {object}
 */
export const setPriceContent = (platForm, backPriceProp, backprice, priceList) => {
  let priceContent = { priceList, carryOutConfig: {}, entryPrice: {} }
  const backPriceMap = backPriceProp[platForm]
  const backpricePlatForm = backprice[platForm]
  console.log('backPriceMap, backpricePlatForm', backPriceMap, backpricePlatForm)
  for (let mapkey in backPriceMap) {
    // priceContent降级key
    let configPriceMap = backPriceMap[mapkey]
    console.log('configPriceMap', configPriceMap)
    for (let typeKey in configPriceMap) {
      // backpricePlatForm降级与priceContent再降级
      console.log('typeKey', typeKey)
      let unitBackPrice = backpricePlatForm[typeKey]
      console.log('unitBackPrice', unitBackPrice)
      if (['goodsAttention', 'shopAttention', 'addCart'].includes(typeKey)) {
        priceContent[mapkey][typeKey] = {}
      }
      const unitPriceMap = configPriceMap[typeKey] // 找出最后的key数组
      console.log('unitPriceMap', unitPriceMap)
      if (Array.isArray(unitPriceMap)) {
        unitPriceMap.map(key => {
          if (mapkey === 'carryOutConfig') {
            //  处理carryOutConfig的click tbCommon recordClick等
            // 降级unitBackPrice unitPriceMap 融入到carryOutConfig
            console.log('unitPriceMap', key)
            //停留时间在点击和其他类型的价格不一样  typeKey来做区分
            priceContent[mapkey][key] = unitBackPrice[key]
            key === 'compare' && (priceContent[mapkey][key]['0'] = 0)
            key === 'visitOther' && (priceContent[mapkey][key]['0'] = 0)
          } else {
            // 处理entryPrice字段的addBuy collection attention
            priceContent[mapkey][typeKey][key] = unitBackPrice[key]
            if (priceContent[mapkey][typeKey][key] instanceof Object) {
              // 针对rankUpShop值为基本类型  京东人气套餐价格类型默认值是无访客
              // 淘宝和拼多多所有任务价格由停留时间等叠加
              // let defaultIndex = '1'
              priceContent[mapkey][typeKey]['default'] = priceContent[mapkey][typeKey][key][1]
            } else {
              priceContent[mapkey][typeKey] = {
                default: priceContent[mapkey][typeKey][key]
              }
            }
          }
        })
      } else {
        console.log('unitBackPrice[unitPriceMap]', backpricePlatForm[unitPriceMap])
        priceContent[mapkey][unitPriceMap] = backpricePlatForm[unitPriceMap]
      }
    }
  }
  return priceContent
}
// 之前发布页面的纯函数
export const purefn = () => {
  // 纯函数
  //将后端计划的内容解析为前端所适配的内容
  // analysyPlan(
  //   receivePlan,
  //   transformPlain,
  //   twoAlgorithmNums,
  //   customArrayNums,
  //   showDateNums,
  //   showTimeNums
  // ) {
  //   const { form, assign, typeTableTotal } = transformPlain
  //   const plainId = receivePlan['id']
  //   // console.log('analysyPlan plainId', plainId)
  //   let frontForm = {}
  //   for (let key in form) {
  //     if (Array.isArray(form[key])) {
  //       // console.log('form[key]', form[key])
  //       const dateKey = form[key][0]
  //       // console.log('dateKey', dateKey)
  //       frontForm[dateKey] || (frontForm[dateKey] = [])
  //       const dateIndex = form[key][1]
  //       // console.log('dateIndex', dateIndex)
  //       frontForm[dateKey][dateIndex] = receivePlan[key]
  //     } else {
  //       frontForm[form[key]] = receivePlan[key]
  //     }
  //   }
  //   if (showDateNums.includes(frontForm['carryOutMode'])) {
  //     frontForm['carryOutTime'] && delete frontForm['carryOutTime']
  //     frontForm.carryOutDate !== undefined &&
  //       (frontForm.carryOutDate = datePastHandle(frontForm.carryOutDate))
  //   } else if (showTimeNums.includes(frontForm['carryOutMode'])) {
  //     frontForm['carryOutDate'] && delete frontForm['carryOutDate']
  //     frontForm.carryOutTime !== undefined &&
  //       (frontForm.carryOutTime = timePastHandle(frontForm.carryOutTime))
  //   }
  //   console.log('analysyPlan frontForm', frontForm)
  //   let frontTypeTableTotal = {}
  //   for (let key in typeTableTotal) {
  //     frontTypeTableTotal[typeTableTotal[key]] = receivePlan[key]
  //   }
  //   console.log('analysyPlan frontTypeTableTotal', frontTypeTableTotal)
  //   const carryOutMode = frontForm['carryOutMode']
  //   // console.log('carryOutMode', carryOutMode)
  //   let frontAssign = {}
  //   for (let key in assign) {
  //     // console.log('receivePlan[key]', receivePlan[key])
  //     console.log('assign[key].array', assign[key].array)
  //     frontAssign[assign[key].array] = { array: [] }
  //     if (receivePlan[key]) {
  //       frontAssign[assign[key].array].array = receivePlan[key].map(
  //         (item) => {
  //           console.log('receivePlan[key] item', item)
  //           // 转化hour的字符串为数组，同时防止hour为null的情况
  //           const tempArray = item.hour
  //             ? item.hour.split(',').map((num) => +num)
  //             : []
  //           console.log('tempArray', tempArray)
  //           const { array: tableArray, total } = createAssignTableObj(
  //             twoAlgorithmNums,
  //             carryOutMode,
  //             tempArray
  //           )
  //           const {
  //             array: customTableArray,
  //             total: customNumber
  //           } = createAssignTableObj(
  //             customArrayNums,
  //             carryOutMode,
  //             tempArray
  //           )
  //           return { tableArray, customTableArray, total, customNumber }
  //         }
  //       )
  //     }
  //   }
  //   console.log('frontAssign', frontAssign)
  //   return {
  //     plainId: plainId,
  //     indexSymbol: Date.now(),
  //     form: frontForm,
  //     typeTableTotal: frontTypeTableTotal,
  //     assign: frontAssign
  //   }
  // },
  // 纯函数 创建每个表格的总数和分配的数组单元
  // createAssignTableObj(limitNums, mode, tempArray) {
  //   let array = []
  //   let total = 0
  //   if (limitNums.includes(mode)) {
  //     array = tempArray
  //     total = tempArray.length > 1 ? tempArray.reduce((x, y) => x + y) : 0
  //   }
  //   return { array, total }
  // },
  // 纯函数 设置每条支付信息的表格
  // setTableDataItem(val, priceMap) {
  //   let data = {}
  //   data.money = 0
  //   for (let key in val) {
  //     console.log('setTableDataItem key', key)
  //     if (
  //       key === 'incrementRatio' ||
  //       key === 'carryOutMode' ||
  //       key === 'carryOutData'
  //     )
  //       continue
  //     // console.log('setTableDataItem', priceMap[key], key)
  //     if (key.includes('Total')) {
  //       data.money = floatHandle(
  //         data.money + floatHandle(val[key] * priceMap[key])
  //       )
  //       console.log('floatHandle', key, floatHandle(val[key] * priceMap[key]))
  //     }
  //     data[key] = val[key]
  //   }
  //   data.money = '￥' + data.money
  //   return data
  // },
  // 纯函数 删除表单属性数组和表格属性数组的头个对象
  // deepCopyDeleteArray(props) {
  //   const deleteProps = JSON.parse(JSON.stringify(props))
  //   deleteProps.shift()
  //   return deleteProps
  // },
  // 纯函数
  // mode某些任务选中加搜索时，弹框表单增加keyWords
  // twoAlgorithmNums两种分配算法，当所选的分配方式不在里面，就删除递增量
  // carryOutModeLabel 用于分配方式类型转义文本
  // carryOutModeNeedHour 用于控制date和time显示，只会取一个
  // deepCopyPlains(
  //   plain,
  //   mode,
  //   twoAlgorithmNums,
  //   customArrayNums,
  //   carryOutModeLabel,
  //   carryOutModeNeedHour,
  //   ratioObj
  // ) {
  //   console.log('deepCopyPlains entryMode', mode)
  //   // 耦合解决下进入方式与keywords的关联
  //   let deepCopyCal = JSON.parse(JSON.stringify(plain))
  //   console.log('deepCopyPlains plain', plain)
  //   deepCopyCal.indexSymbol = plain.indexSymbol
  //   let { typeTableTotal, form, plainId, indexSymbol, assign } = deepCopyCal
  //   // let indexSymbol = symbol ? symbol : deepCopyCal.indexSymbol
  //   // console.log('deepCopyPlains serialNum', serialNum)
  //   console.log('deepCopyPlains indexSymbol', indexSymbol)
  //   console.log(
  //     'deepCopyCal.indexSymbol == indexSymbol',
  //     deepCopyCal.indexSymbol == indexSymbol
  //   )
  //   console.log('deepCopyPlains mode', mode)
  //   // mode做值限定结合短路运算来做关键字在计划区域和支付区域的显示
  //   mode === 0 && delete form.keyWords
  //   mode === 1 && (form.keyWords || (form.keyWords = ''))
  //   let assignsDaysObj = {}
  //   for (let key in assign) {
  //     if (twoAlgorithmNums.includes(form.carryOutMode)) {
  //       assignsDaysObj[key] = assign[key].array.map((item) => item.total)
  //     } else if (customArrayNums.includes(form.carryOutMode)) {
  //       assignsDaysObj[key] = assign[key].array.map(
  //         (item) => item.customNumber
  //       )
  //     } else {
  //       assignsDaysObj[key] = [form[key + 'Number']]
  //     }
  //   }
  //   for (let key of Object.keys(form).filter((item) =>
  //     item.includes('Number')
  //   )) {
  //     delete form[key]
  //   }
  //   // console.log('JSON.parse1 form', JSON.parse(JSON.stringify(form)))
  //   if (!twoAlgorithmNums.includes(form.carryOutMode)) {
  //     form['incrementRatio'] !== undefined && delete form['incrementRatio']
  //   }
  //   for (let key in form) {
  //     if (key === 'carryOutMode') {
  //       carryOutModeNeedHour
  //         ? form.carryOutDate !== undefined && delete form.carryOutDate
  //         : form[key] === 2
  //         ? form.carryOutDate !== undefined && delete form.carryOutDate
  //         : form.carryOutTime !== undefined && delete form.carryOutTime
  //       form[key] = carryOutModeLabel[form[key]]
  //     }
  //   }
  //   // const ratioObj = this.ratioObj
  //   for (let key in form) {
  //     if (key === 'carryOutDate') {
  //       console.log('form[carryOutDate]', form[key])
  //       if (form[key][0] === form[key][1]) {
  //         form['incrementRatio'] !== undefined &&
  //           delete form['incrementRatio']
  //       }
  //       // form[key] = datePastHandle(form[key])
  //       form[key] = form[key].reduce((x, y) => x + '~' + y)
  //     } else if (key === 'incrementRatio') {
  //       form[key] = ratioObj[form[key]] * 100 + '%'
  //     } else if (key === 'carryOutTime') {
  //       form['incrementRatio'] !== undefined && delete form['incrementRatio']
  //     }
  //   }
  //   // console.log('JSON.parse3 form', JSON.parse(JSON.stringify(form)))
  //   console.log(
  //     'form.carryOutMode',
  //     typeof form.carryOutMode,
  //     form.carryOutMode
  //   )
  //   console.log('form', form)
  //   return {
  //     indexSymbol,
  //     plainId,
  //     ...typeTableTotal,
  //     ...form,
  //     assignsDaysObj
  //   }
  // },
  // 纯函数 获取前端计划的index标志做增删改查
  // getPlainsIndex(plains, currentSymbol) {
  //   let currentIndex = null
  //   plains.forEach((item, index) => {
  //     item.indexSymbol == currentSymbol && (currentIndex = index)
  //   })
  //   return currentIndex
  // },
  // 纯函数 根据mode删除form的关键字
  // deepCopySendPlainModal(plain, mode) {
  //   const sendPlain = JSON.parse(JSON.stringify(plain))
  //   mode === 0 && delete sendPlain.form.keyWords
  //   mode === 1 && (sendPlain.form.keyWords || (sendPlain.form.keyWords = ''))
  //   return sendPlain
  // },
  // 纯函数
  // plain 前端的plain
  // backplain 构造后端key的value为plain的key
  // twoAlgorithmNums两种分配算法，当所选的分配方式不在里面，就删除递增量
  // customArrayNums 用于取出自定义数组
  // 解构返回给后端的计划格式
  // sendBackPlan(
  //   plain,
  //   backplain,
  //   twoAlgorithmNums,
  //   customArrayNums,
  //   showDateNums,
  //   showTimeNums,
  //   carryOutModeNeedHour
  // ) {
  //   const id = plain[backplain['id']]
  //   const backForm = backplain.form
  //   const frontForm = plain.form
  //   let form = {}
  //   for (let key in backForm) {
  //     if (Array.isArray(backForm[key])) {
  //       let res = JSON.parse(JSON.stringify(frontForm))
  //       const array = backForm[key]
  //       if (res[array[0]] === undefined) continue
  //       const length = array.length
  //       for (let i = 0; i < length; i++) {
  //         res = res[array[i]]
  //       }
  //       form[key] = res
  //     } else {
  //       form[key] = frontForm[backForm[key]]
  //     }
  //   }
  //   if (showDateNums.includes(form['executeType'])) {
  //     form['startTime'] && delete form['startTime']
  //   } else if (showTimeNums.includes(form['executeType'])) {
  //     form['startDate'] && delete form['startDate']
  //     form['endDate'] && delete form['endDate']
  //   }
  //   const startDate = form.startDate
  //   const startTime = form.startTime
  //   const carryOutMode = plain.form.carryOutMode
  //   const backAssign = backplain.assign
  //   const frontAssign = plain.assign
  //   let assgin = {}
  //   for (let key in backAssign) {
  //     console.log('frontAssign', frontAssign[backAssign[key].array])
  //     assgin[key] = frontAssign[backAssign[key].array].array
  //     assgin[key] = assgin[key].map((item, index) => {
  //       // console.log('item', item)
  //       let hour = ''
  //       if (twoAlgorithmNums.includes(carryOutMode)) {
  //         hour = item.tableArray.reduce((x, y) => x + ',' + y)
  //       } else if (customArrayNums.includes(carryOutMode)) {
  //         hour = item.customTableArray.reduce((x, y) => x + ',' + y)
  //       }
  //       if (showDateNums.includes(form['executeType'])) {
  //         return {
  //           hour,
  //           date: timeToFormatDate(
  //             new Date(startDate).getTime() + index * 24 * 3600 * 1000
  //           )
  //         }
  //       } else if (showTimeNums.includes(form['executeType'])) {
  //         return {
  //           hour,
  //           date: carryOutModeNeedHour
  //             ? timeToFormatDate(new Date(startTime).getTime())
  //             : ''
  //         }
  //       }
  //     })
  //   }
  //   const backTypeTableTotal = backplain.typeTableTotal
  //   const frontTypeTableTotal = plain.typeTableTotal
  //   let typeTableTotal = {}
  //   // console.log('backAssign.typeTableTotal', backAssign.typeTableTotal)
  //   for (let key in backTypeTableTotal) {
  //     typeTableTotal[key] = frontTypeTableTotal[backTypeTableTotal[key]]
  //   }
  //   console.log('typeTableTotal', typeTableTotal)
  //   return { id, ...form, ...assgin, ...typeTableTotal }
  // },
  // // 纯函数 设置除点击外的每个类型单价
  // getPrice(
  //   changePrice,
  //   mode,
  //   priceContent,
  //   priceMapKey,
  //   platForm,
  //   glCarryOutConfig,
  //   priceMap
  // ) {
  //   // console.log('changePrice mode entryPrice', changePrice, mode, entryPrice)
  //   const entryPrice = priceContent.entryPrice
  //   const carryOutConfig = priceContent.carryOutConfig
  //   if (Object.keys(entryPrice).length === 0) return
  //   // platForm = 'tb'
  //   if (mode === null || mode === undefined) {
  //     //人气套餐和人气排名 3.2.0版本默认为停留时间对应的价格基数 淘宝和拼多多加carryOutConfig
  //     let price =
  //       platForm === 'jd'
  //         ? entryPrice[changePrice.entryPrice].default
  //         : entryPrice[changePrice.entryPrice].visit
  //         ? entryPrice[changePrice.entryPrice].visit[2][
  //             glCarryOutConfig['stayType']
  //           ]
  //         : 0
  //     if (platForm !== 'jd' && changePrice.carryOutConfig !== undefined) {
  //       changePrice.carryOutConfig.map((key) => {
  //         price = floatHandle(
  //           price + carryOutConfig[key][glCarryOutConfig[key]]
  //         )
  //         console.log(
  //           'getPrice changePrice.carryOutConfig',
  //           key,
  //           carryOutConfig[key][glCarryOutConfig[key]]
  //         )
  //       })
  //     }
  //     console.log('getPrice', price)
  //     priceMap[priceMapKey] = price
  //     return price
  //   } else {
  //     //人气套餐子类型的任务页面  3.2.0版本 进入方式为0 无访客价格 3.2.0版本 进入方式为1 默认为停留时间对应的价格基数
  //     // 淘宝和拼多多加carryOutConfig
  //     // let price = entryPrice[changePrice.entryPrice]['visit'][mode + 1]
  //     let price = 0
  //     mode === 0
  //       ? (price = entryPrice[changePrice.entryPrice].default)
  //       : (price =
  //           entryPrice[changePrice.entryPrice]['visit'][mode + 1][
  //             glCarryOutConfig['stayType']
  //           ])
  //     if (
  //       mode === 1 &&
  //       platForm !== 'jd' &&
  //       changePrice.carryOutConfig !== undefined
  //     ) {
  //       changePrice.carryOutConfig.map((key) => {
  //         price = floatHandle(
  //           price + carryOutConfig[key][glCarryOutConfig[key]]
  //         )
  //         // console.log(
  //         //   'getPrice changePrice.carryOutConfig',
  //         //   key,
  //         //   carryOutConfig[key][this.carryOutConfig[key]]
  //         // )
  //       })
  //     }
  //     console.log('getPrice', price)
  //     priceMap[priceMapKey] = price
  //     return price
  //   }
  // },
  // 纯函数 引用处理
  // 设置radioGoup所对应的价格集合  根据backPriceProp
  // mapkey 对应 entryPrice carryoutConfig
  // typeKey 对应 entryPrice下addbuy  carryoutConfig下click pddCommon
  // key 对应 addbuy下visit pddCommon下compare
  // setPriceContent(platForm, backPriceProp, backprice, priceList) {
  //   let priceContent = { priceList, carryOutConfig: {}, entryPrice: {} }
  //   const backPriceMap = backPriceProp[platForm]
  //   const backpricePlatForm = backprice[platForm]
  //   console.log(
  //     'backPriceMap, backpricePlatForm',
  //     backPriceMap,
  //     backpricePlatForm
  //   )
  //   for (let mapkey in backPriceMap) {
  //     // priceContent降级key
  //     let configPriceMap = backPriceMap[mapkey]
  //     console.log('configPriceMap', configPriceMap)
  //     for (let typeKey in configPriceMap) {
  //       // backpricePlatForm降级与priceContent再降级
  //       console.log('typeKey', typeKey)
  //       let unitBackPrice = backpricePlatForm[typeKey]
  //       console.log('unitBackPrice', unitBackPrice)
  //       if (
  //         ['goodsAttention', 'shopAttention', 'addCart'].includes(typeKey)
  //       ) {
  //         priceContent[mapkey][typeKey] = {}
  //       }
  //       const unitPriceMap = configPriceMap[typeKey] // 找出最后的key数组
  //       console.log('unitPriceMap', unitPriceMap)
  //       if (Array.isArray(unitPriceMap)) {
  //         unitPriceMap.map((key) => {
  //           if (mapkey === 'carryOutConfig') {
  //             //  处理carryOutConfig的click tbCommon recordClick等
  //             // 降级unitBackPrice unitPriceMap 融入到carryOutConfig
  //             console.log('unitPriceMap', key)
  //             //停留时间在点击和其他类型的价格不一样  typeKey来做区分
  //             priceContent[mapkey][key] = unitBackPrice[key]
  //             key === 'compare' && (priceContent[mapkey][key]['0'] = 0)
  //             key === 'visitOther' && (priceContent[mapkey][key]['0'] = 0)
  //           } else {
  //             // 处理entryPrice字段的addBuy collection attention
  //             priceContent[mapkey][typeKey][key] = unitBackPrice[key]
  //             if (priceContent[mapkey][typeKey][key] instanceof Object) {
  //               // 针对rankUpShop值为基本类型  京东人气套餐价格类型默认值是无访客
  //               // 淘宝和拼多多所有任务价格由停留时间等叠加
  //               // let defaultIndex = '1'
  //               priceContent[mapkey][typeKey]['default'] =
  //                 priceContent[mapkey][typeKey][key][1]
  //             } else {
  //               priceContent[mapkey][typeKey] = {
  //                 default: priceContent[mapkey][typeKey][key]
  //               }
  //             }
  //           }
  //         })
  //       } else {
  //         console.log(
  //           'unitBackPrice[unitPriceMap]',
  //           backpricePlatForm[unitPriceMap]
  //         )
  //         priceContent[mapkey][unitPriceMap] = backpricePlatForm[unitPriceMap]
  //       }
  //     }
  //   }
  //   return priceContent
  // },
}
