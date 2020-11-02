<template>
  <div class="modal--fixed">
    <div class="modal" @mousewheel="preventScoll">
      <div class="modal-content" :style="{width: `${width}px`}">
        <div class="border-close" @click="close">
          <i class="el-icon-close"></i>
        </div>
        <!-- validate-on-rule-change针对rule动态生成 -->
        <el-form ref="form" :model="form" :rules="rules" :validate-on-rule-change="false">
          <div
            v-for="item in formProps"
            :key="item.label"
            :class="{
            'form-item_div': true, 
            'date-move': item.type === 'date' && twoAlgorithmNums.includes(form['carryOutMode']) }"
          >
            <el-form-item
              v-if="item.prop.includes('Number') ? threeShowNumberNums.includes(form['carryOutMode']) 
            : item.prop.includes('incrementRatio') ? twoAlgorithmNums.includes(form['carryOutMode']) && !carryOutModeNeedHour
            : item.prop.includes('carryOutDate') ? showDateNums.includes(form['carryOutMode'])
            : item.prop.includes('carryOutTime') ? showTimeNums.includes(form['carryOutMode'])
            : item.type !== 'double-input'"
              :prop="item.prop"
            >
              <label :class="{'form-label':true,'date-time_label':item.type === 'datetime'}">
                <span
                  v-if="!(['tb','pdd'].includes($route.params.platForm) 
                  && $route.params.taskType === 'popular-rank' 
                  && item.prop.includes('Number'))"
                  class="star"
                >*</span>
                {{item.label}}
              </label>
              <el-input
                v-if="item.prop === 'keyWords'"
                class="input-key-words"
                v-model="form[item.prop]"
                :placeholder="item.placeholder"
                size="mini"
              >
                <div slot="suffix">
                  <el-tooltip effect="light" placement="top-end">
                    <div
                      v-html="'1、关键词中每个字都需要必须包含在标题中，关键词的字没有先后顺序要求，可以任意调整字的顺序。<br/>' +
        '2、下单时，在一个计划的关键词输入框，输入关键词是：T恤男 T恤夏天。商智的关键词来源分析只有一个词：T恤男 T恤夏天。<br/>' +
        '3、下单时，若将T恤男、T恤夏天分成2个计划，在一个计划中输入关键词：T恤男，在另外一个计划中输入关键词：T恤夏天。 那么商智的关键词来源分析是有两个关键词，分别是T恤男和T恤夏天。'"
                      slot="content"
                      class="keyword-content"
                    ></div>
                    <i class="el-icon-question el-input__icon"></i>
                  </el-tooltip>
                </div>
              </el-input>
              <el-input
                class="number-input"
                v-if="item.type === 'input' && item.prop !== 'keyWords'"
                v-model.number="form[item.prop]"
                :ref="item.prop"
                :placeholder="item.placeholder"
                size="mini"
              >
                <template
                  v-if="computedAssignArray.length >= 3 && item.prop.includes('click')"
                  slot="suffix"
                >{{ numberErrorText.length > 0 ? numberErrorText : saveErrorText}}</template>
              </el-input>
              <el-select v-else-if="item.type === 'select'" v-model="form[item.prop]" size="mini">
                <el-option
                  v-for="option in options[item.options]"
                  :key="option.label"
                  :label="option.label"
                  :value="option.value"
                ></el-option>
              </el-select>
              <el-date-picker
                v-else-if="item.type === 'date'"
                v-model="date"
                :type="item.pickerType"
                :range-separator="item.rangeSeparator"
                :start-placeholder="item.startPlaceholder"
                :end-placeholder="item.endPlaceholder"
                :clearable="false"
                :validate-event="true"
                :picker-options="options[item.options]"
                size="mini"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                @change="changeDateCb"
                @focus="focusDateCb"
              ></el-date-picker>
              <el-date-picker
                v-if="item.type === 'datetime'"
                class="date-time_picker"
                :type="item.type"
                v-model="time"
                :placeholder="item.placeholder"
                :default-time="item.defaultTime"
                :clearable="false"
                :validate-event="true"
                :picker-options="options[item.options]"
                size="mini"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                @change="changeTimeCb"
              ></el-date-picker>
            </el-form-item>
          </div>
          <div class="form-item_div">
            <el-form-item
              class="carray-date-time"
              v-if="showDateNums.includes(form['carryOutMode'])"
            >
              <label>执行天数：</label>
              <div class="el-input">
                <span>{{currentDate.dateArray.length}}天</span>
              </div>
            </el-form-item>
          </div>
          <div
            v-if="formProps.length && formProps[formProps.length-1].type === 'double-input'"
            :class="{'form-item_div': true,'form-item--double': formProps[formProps.length-1].type === 'double-input'}"
          >
            <el-form-item>
              <label
                :class="{
                  'form-label':true,
                  'double-input_label':formProps[formProps.length-1].type === 'double-input'}"
              >{{formProps[formProps.length-1].label}}</label>
              <div class="double-input">
                <el-input
                  v-model.number="form[formProps[formProps.length-1].prop.split(',')[0]]"
                  :placeholder="formProps[formProps.length-1].placeholder.split(',')[0]"
                  size="mini"
                ></el-input>
                <span class="double-input_span">~</span>
                <span class="double-input_error">{{minMaxErrorText}}</span>
                <el-input
                  v-model.number="form[formProps[formProps.length-1].prop.split(',')[1]]"
                  :placeholder="formProps[formProps.length-1].placeholder.split(',')[1]"
                  size="mini"
                ></el-input>
              </div>
            </el-form-item>
          </div>
        </el-form>
        <my-tab
          v-if="assignTabArray.length>1 && showTabNums.includes(form['carryOutMode'])"
          :tabProps="assignTabArray"
          :tabActiveIndex.sync="tabActiveIndex"
          @saveCurrentTab="saveCurrentTabCb"
        ></my-tab>
        <div
          class="assigns-table"
          ref="assignsTable"
          @mousewheel="stopBubbing"
          v-show="showTableNums.includes(form['carryOutMode'])"
        >
          <assigns-table
            v-for="item in showTableArray"
            :key="item.day"
            :total="item.total"
            :sendPlain="sendPlain"
            :customNumber.sync="item.customNumber"
            :tabActiveIndex="tabActiveIndex"
            :customTableArray.sync="item.customTableArray"
            :day="item.day"
            :carryOutMode="form.carryOutMode"
            :tableArray.sync="item.tableArray"
          ></assigns-table>
        </div>
        <div class="save">
          <el-button class="save-button" type="text" size="small" @click="handleSave">保存</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import myTab from './myTab.vue'
import assignsTable from './assignsTable.vue'
import {
  timeToFormatDate,
  getDayArray,
  datePastHandle,
  timePastHandle
} from '@/assets/js/plainDate.js'
import { getReleaseJson } from '@/assets/js/getReleaseJson.js'
import { findObjAttr } from '@/assets/js/iterator.js'
import {
  checkKeyWords,
  checkIsInteger,
  checkZeroInteger
} from '@/assets/js/validator.js'
export default {
  name: 'AddTaskModal',
  components: { myTab, assignsTable },
  props: {
    headerText: {
      type: String,
      default: 'add'
    },
    modalFormProps: {
      type: Array,
      default: () => []
    },
    modalFormOptions: {
      type: Object,
      default: () => {}
    },
    modalControlArea: {
      type: Object,
      default: () => {}
    },
    modalAssignTabArray: {
      type: Array,
      default: () => []
    },
    width: {
      default: 500
    },
    sendPlain: {
      type: Object,
      default: () => {}
    },
    plain: {
      type: Object,
      default: () => {
        return {
          // plainId: 2,
          // indexSymbol: Date.now(),
          form: {
            keyWords: '',
            carryOutMode: 1,
            incrementRatio: 1,
            clickNumber: 0,
            addBuyNumber: 0,
            collectionNumber: 0,
            attentionNumber: 0,
            carryOutDate: [
              timeToFormatDate(Date.now()),
              timeToFormatDate(Date.now())
            ]
          },
          typeTableTotal: {
            clickTotal: 0,
            addBuyTotal: 0,
            collectionTotal: 0,
            attentionTotal: 0
          },
          assign: {
            click: {
              label: '搜索点击',
              array: [
                {
                  total: 500,
                  tableArray: [],
                  day: '今日',
                  customTableArray: [
                    10,
                    0,
                    0,
                    0,
                    0,
                    0,
                    20,
                    0,
                    0,
                    0,
                    0,
                    0,
                    25,
                    0,
                    0,
                    0,
                    0,
                    0,
                    30,
                    0,
                    0,
                    0,
                    0,
                    0
                  ],
                  customNumber: 85
                }
              ]
            },
            addBuy: {
              label: '商品加购',
              array: [
                {
                  total: 100,
                  tableArray: [],
                  day: '今日',
                  customTableArray: [],
                  customNumber: 0
                }
              ]
            },
            collection: {
              label: '商品收藏',
              array: [
                {
                  total: 100,
                  tableArray: [],
                  day: '今日',
                  customTableArray: [],
                  customNumber: 0
                }
              ]
            },
            attention: {
              label: '店铺关注',
              array: [
                {
                  total: 100,
                  tableArray: [],
                  day: '今日',
                  customTableArray: [],
                  customNumber: 0
                }
              ]
            }
          }
        }
      }
    }
  },
  data() {
    // const selectPlainBool = Object.keys(this.sendPlain).length === 0
    // const plain = selectPlainBool ? this.sendPlain : this.plain
    return {
      initPlain: {},
      // computedAssignArray: Object.keys(this.plain.form).filter(item =>
      //   item.includes('Number')
      // ),
      isChangeForm: false,
      computedAssignArray: [],
      formProps: [],
      tabActiveIndex: '',
      options: {},
      date: datePastHandle(['2020-07-12', '2020-07-13']),
      form: {},
      rules: {},
      plainAssign: {},
      assignTabArray: [],
      time: timePastHandle('2020-07-07 08:00:00'),
      currentDate: getDayArray(datePastHandle(['2020-07-12', '2020-07-12'])), // currentDate是从date或者time获取，来达到算法表格的复用性

      threeShowNumberNums: [],
      showDateNums: [],
      // showDateNums: [0],
      twoAlgorithmNums: [],
      customArrayNums: [],
      showTabNums: [],
      showTableNums: [],
      showTimeNums: [],
      // showTimeNums: [3, 4, 5],
      carryOutModeNeedHour: false, // 用来确定哪些页面用date还是time来生成算法表格
      ratioObj: {
        1: 0,
        2: 0.05,
        3: 0.1,
        4: 0.15,
        5: 0.2,
        6: 0.25,
        7: 0.3,
        8: 0.35,
        9: 0.4,
        10: 0.5,
        11: -0.2,
        12: -0.15,
        13: -0.1,
        14: -0.05
      },
      priorityZeroShow: true,
      enterFirst: true,
      saveErrorText: ''
    }
  },
  watch: {
    sendPlain: function (newVal) {
      if (Object.keys(newVal).length > 0) {
        //为回到最初做判断
        this.initPlain = JSON.parse(JSON.stringify(newVal))
        // 初次进入不进行自定义的number校验
        this.enterFirst = true
        this.saveErrorText = ''
        this.init()
        this.$nextTick(function () {
          // 针对已有的校验
          this.$refs.form.clearValidate()
        })
      }
      console.log('sendPlain newVal', newVal)
    },
    modalFormProps: function (newVal) {
      this.formPropsAwait = newVal
      this.isChangeForm = true
      console.log('modalFormProps', newVal)
    },
    modalFormOptions: function (newVal) {
      for (let key in newVal) {
        if (newVal[key]['eval'] !== undefined) {
          const evalString = newVal[key]['eval'],
            // console.log('eval', newVal[key]['eval'])
            cbFn = eval(evalString),
            name = cbFn.name
          // console.log('cbFn', {0:cbFn})
          newVal[key][name] = cbFn
        }
      }
      console.log('modalFormOptions', newVal)
      this.optionsAwait = newVal
    },
    modalControlArea: function (newVal) {
      for (let key in newVal) {
        this[key] = newVal[key]
      }
    },
    modalAssignTabArray: function (newVal) {
      console.log('modalAssignTabArray', newVal)
      this.assignTabArray = newVal
    },
    // 一点击日期会触发这个函数，从而来限制时间选择
    time: {
      handler: function (newVal) {
        const nowDate = new Date(),
          startDate = new Date(newVal),
          nowFormatDate = timeToFormatDate(nowDate.getTime()),
          // console.log('nowFormatDate', nowFormatDate)
          startFormatDate = timeToFormatDate(startDate.getTime())
        // console.log('startFormatDate', startFormatDate)
        if (this.options.pickerDateTimeOptions === undefined) return
        if (nowFormatDate === startFormatDate) {
          // 以年月日保证唯一性
          const nowMinute = nowDate.getMinutes()
          let startMinute =
            nowMinute + 1 > 9 ? nowMinute + 1 + '' : '0' + (nowMinute + 1)
          let nowHour = nowDate.getHours()
          if (startMinute === '60') {
            nowHour = nowHour + 1
            startMinute = '00'
          }
          // console.log('startMinute', startMinute)
          const startHour = nowHour > 9 ? nowHour + '' : '0' + nowHour
          this.options.pickerDateTimeOptions = {
            disabledDate: this.options.pickerDateTimeOptions.disabledDate,
            selectableRange: startHour + ':' + startMinute + ':00 - 22:59:00'
          }
        } else {
          this.options.pickerDateTimeOptions = {
            disabledDate: this.options.pickerDateTimeOptions.disabledDate,
            selectableRange: '00:00:00 - 22:59:00'
          }
        }
        // console.log(
        //   'this.options.pickerDateTimeOptions.selectableRange',
        //   this.options.pickerDateTimeOptions.selectableRange
        // )
        // console.log('pickTime newVal', newVal)
      },
      immediate: true
    }
  },
  computed: {
    minMaxErrorText() {
      const errorText = {
        3: '请输入数字',
        2: '请输入最高价',
        1: '请输入最低价',
        0: ''
      }
      return errorText[this.checkMinMaxPrice]
    },
    checkMinMaxPrice() {
      if (this.form['minPrice'] !== undefined) {
        console.log(
          'this.form',
          this.form['minPrice'],
          typeof this.form['minPrice']
        )
        if (
          ![null, ''].includes(this.form['minPrice']) &&
          !Number.isInteger(this.form['minPrice'])
        ) {
          return 3
        } else if (
          ![null, ''].includes(this.form['maxPrice']) &&
          !Number.isInteger(this.form['maxPrice'])
        ) {
          return 3
        }
        if (
          ![null, ''].includes(this.form['minPrice']) &&
          [null, ''].includes(this.form['maxPrice'])
        ) {
          return 2
        } else if (
          ![null, ''].includes(this.form['maxPrice']) &&
          [null, ''].includes(this.form['minPrice'])
        ) {
          return 1
        } else {
          return 0
        }
      }
    },
    numberErrorText() {
      //做触发依赖
      if (this.computedAssignArray.length === 0) return ''
      console.log('numberErrorText')
      let clickNumber = this.form.clickNumber,
        addBuyNumber = this.form.addBuyNumber,
        collectionNumber = this.form.collectionNumber,
        attentionNumber = this.form.attentionNumber
      // console.log('this.$refs.clickNumber', this.$refs.clickNumber)
      if (this.enterFirst) {
        console.log('enterFirst')
        this.enterFirst = false
        return ''
      }
      if (this.$route.params.platForm === 'jd') {
        // 保证不干扰原有的校验
        if (
          findObjAttr(this.$refs, 'clickNumber[0].focused') &&
          this.form.clickNumber <= 0
        ) {
          return ''
        }
        this.saveErrorText = ''
        return this.checkAllNumber
          ? '搜索点击需要≥商品加购+商品关注+店铺关注'
          : ''
      } else {
        if (findObjAttr(this.$refs, 'clickNumber[0].focused')) {
          if (!Number.isInteger(this.form.clickNumber)) {
            return ''
          } else if (this.form.clickNumber < 0) {
            return ''
          }
        }
        this.saveErrorText = ''
        return this.checkAllZeroNumber ? '请输入任意一个任务数量' : ''
      }
    },
    checkAllZeroNumber() {
      let zero = 0
      for (let value of this.computedAssignArray) {
        const num = this.form[value] === '' ? 0 : this.form[value]
        zero += num
      }
      return zero === 0
    },
    checkAllNumber() {
      let clickNumber = 0
      ![null, undefined].includes(this.form.clickNumber) &&
        (clickNumber = this.form.clickNumber)
      let otherTotal = 0
      for (let value of this.computedAssignArray) {
        if (value === 'clickNumber') {
          // if (this.form[value] === 0) {
          //   return false
          // } else {
          continue
          // }
        }
        const num = this.form[value] === '' ? 0 : this.form[value]
        otherTotal += num
        console.log('checkAllNumber this.form.value', this.form[value])
      }
      console.log('clickNumber < otherTotal', clickNumber < otherTotal)
      return clickNumber < otherTotal
    },
    clickAssigns() {
      if (this.setComputedAssignArray('clickNumber').length > 0) {
        return this.radioArray(
          this.form.clickNumber,
          this.currentDate,
          this.currentDate.dateArray.length,
          this.form.incrementRatio ? this.form.incrementRatio : 1,
          this.form.carryOutMode,
          this.plainAssign['click'],
          this.ratioObj
        )
      }
    },
    addBuyAssigns() {
      if (this.setComputedAssignArray('addBuyNumber').length > 0) {
        return this.radioArray(
          this.form.addBuyNumber,
          this.currentDate,
          this.currentDate.dateArray.length,
          this.form.incrementRatio ? this.form.incrementRatio : 1,
          this.form.carryOutMode,
          this.plainAssign['addBuy'],
          this.ratioObj
        )
      }
    },
    collectionAssigns() {
      if (this.setComputedAssignArray('collectionNumber').length > 0) {
        return this.radioArray(
          this.form.collectionNumber,
          this.currentDate,
          this.currentDate.dateArray.length,
          this.form.incrementRatio ? this.form.incrementRatio : 1,
          this.form.carryOutMode,
          this.plainAssign['collection'],
          this.ratioObj
        )
      }
    },
    attentionAssigns() {
      if (this.setComputedAssignArray('attentionNumber').length > 0) {
        return this.radioArray(
          this.form.attentionNumber,
          this.currentDate,
          this.currentDate.dateArray.length,
          this.form.incrementRatio ? this.form.incrementRatio : 1,
          this.form.carryOutMode,
          this.plainAssign['attention'],
          this.ratioObj
        )
      }
    },
    plainAssignObjArray() {
      const obj = {
        // 这里涉及到tab，请按照tab来改key
        click: this.clickAssigns,
        addBuy: this.addBuyAssigns,
        collection: this.collectionAssigns,
        attention: this.attentionAssigns
      }
      if ([3, 4].includes(this.computedAssignArray.length)) {
        // console.log('plainAssignObjArray', obj)
        return obj // 对象
      } else if (this.computedAssignArray.length === 1) {
        // console.log('this.computedAssignArray[0].split',this.computedAssignArray[0].split('Number')[0])
        return obj[this.computedAssignArray[0].split('Number')[0]] // 数组
      }
    },
    showTableArray() {
      //根据tabActiveIndex更新数据
      if ([3, 4].includes(this.computedAssignArray.length)) {
        console.log(
          'this.plainAssignObjArray',
          this.plainAssignObjArray[this.tabActiveIndex]
        )
        return this.plainAssignObjArray[this.tabActiveIndex]
      } else if (this.computedAssignArray.length === 1) {
        return this.plainAssignObjArray
      }
    }
  },
  created() {},
  methods: {
    init() {
      // this.confirmCloseModal = false
      const computedAssignArray = Object.keys(
        this.initPlain.form
      ).filter((item) => item.includes('Number'))
      //防止只有自定义分配的任务没有number值
      this.computedAssignArray =
        computedAssignArray.length > 0 ? computedAssignArray : ['clickNumber']
      console.log('this.computedAssignArray', this.computedAssignArray)
      this.form = this.initPlain.form
      this.plainAssign = this.initPlain.assign
      this.tabActiveIndex = this.assignTabArray[0].value
      console.log('tabActiveIndex', this.tabActiveIndex)
      console.log('assignTabArray', this.assignTabArray)
      if (![null, undefined].includes(this.form.carryOutDate)) {
        //以增量延长date输入框的日期时间
        this.form.carryOutDate = datePastHandle(this.form.carryOutDate)
        this.date = datePastHandle(this.initPlain.form.carryOutDate)
      } else {
        // 由于分配弹框内的date和time是共生的，没有情况下要创建
        this.form.carryOutDate = JSON.parse(JSON.stringify(this.date))
      }
      console.log('this.form.carryOutDate', this.form.carryOutDate)
      if (![null, undefined].includes(this.form.carryOutTime)) {
        this.form.carryOutTime = timePastHandle(this.form.carryOutTime)
        this.time = timePastHandle(this.initPlain.form.carryOutTime)
      } else {
        this.form.carryOutTime = this.time
      }
      console.log('this.form.carryOutTime', this.form.carryOutTime)
      if (this.carryOutModeNeedHour) {
        this.currentDate = getDayArray(
          [this.time, this.time],
          this.carryOutModeNeedHour
        )
      } else {
        this.currentDate = getDayArray(this.date)
      }
      console.log('this.time', this.time)
      console.log('this.currentDate', this.currentDate)
      //检验
      checkKeyWords.title = this.initPlain.goodsTitle
      checkKeyWords.params = this.$route.params
      if (this.isChangeForm) {
        console.log('this.isChangeForm', this.isChangeForm)
        //避免切换路由时form遗留
        this.formProps = this.formPropsAwait
        this.options = this.optionsAwait
        let rules = {}
        for (let key in this.form) {
          if (key === 'carryOutDate' || key === 'carryOutTime') continue
          rules[key] = []
          if (key === 'keyWords') {
            rules[key].push({
              validator: checkKeyWords,
              trigger: ['blur', 'change']
            })
          }
          if (key.includes('Number')) {
            if (this.$route.params.platForm === 'jd') {
              rules[key].push({
                validator: checkIsInteger,
                trigger: ['blur', 'change']
              })
            } else {
              if (this.$route.params.taskType === 'popular-rank') {
                rules[key].push({
                  validator: checkZeroInteger,
                  trigger: ['blur', 'change']
                })
              } else {
                rules[key].push({
                  validator: checkIsInteger,
                  trigger: ['blur', 'change']
                })
              }
            }
          }
        }

        this.rules = rules
        console.log('this.rules', this.rules)
        this.isChangeForm = false
      }
    },
    setComputedAssignArray(exist) {
      return this.computedAssignArray.filter((item) => item.includes(exist))
    },
    changeDateCb(val) {
      // this.date = [
      //   timeToFormatDate(Date.now()),
      //   timeToFormatDate(Date.now() + 1000 * 3600 * 24)
      // ]
      this.currentDate = {
        dateArray: [
          timeToFormatDate(Date.now()),
          timeToFormatDate(Date.now() + 1000 * 3600 * 24)
        ],
        hour: null
      }
      // 特别重要 强制更新组件 不然vue会判断原来的数据对比新的数据存在相同而不更新
      this.$nextTick(function () {
        // this.date = getDayArray(val).dateArray
        this.currentDate = getDayArray(val)
        this.form.carryOutDate = val
        console.log('this.form.carryOutDate', this.form.carryOutDate)
      })
      console.log('changeDateCb', this.date)
    },
    changeTimeCb(val) {
      // this.time = timeToFormatDate(Date.now(), 'YYYY-MM-DD hh:mm:ss')
      // this.currentDate = {
      //   dateArray: [timeToFormatDate(Date.now(), 'YYYY-MM-DD hh:mm:ss')],
      //   hour: null
      // }
      // this.$nextTick(function() {
      // this.time = val
      this.carryOutModeNeedHour &&
        (this.currentDate = getDayArray([val, val], this.carryOutModeNeedHour))
      console.log('currentDate', this.currentDate)
      this.form.carryOutTime = val
      // })
      console.log('changeTimeCb', val)
    },
    //改变日期做临时缓存操作，分两种情况，一是plainAssignObjArray为对象，另一种是数组
    focusDateCb() {
      for (let key of Object.keys(this.plainAssign)) {
        // 耦合到了initPlain
        console.log('this.plainAssignObjArray', this.plainAssignObjArray)
        if (Array.isArray(this.plainAssignObjArray)) {
          this.plainAssign[key].array = this.plainAssignObjArray
        } else {
          this.plainAssign[key].array = this.plainAssignObjArray[key]
        }
      }
      console.log('focusDateCb', this.plainAssign)
    },
    saveCurrentTabCb() {},
    radioArray(number, date, time, ratio, mode, assign, ratioObj) {
      let array = []
      // const ratioObj = this.ratioObj
      // console.log('radioArray date', date)
      for (let i = 0; i < time; i++) {
        let obj = {}
        obj.day = date.dateArray[i]
        if (i === 0) {
          obj.total = Number.isInteger(+number) ? +number : 0
        } else {
          obj.total = Math.round(array[i - 1].total * (1 + ratioObj[ratio]))
        }
        const zeroTds = [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]
        const ratioTds = [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          4,
          4,
          5,
          6,
          6,
          7,
          7,
          6,
          5,
          5,
          5,
          5,
          7,
          8,
          8,
          8,
          4
        ]
        let tds = []
        let sendFnTds = []
        if (mode === 3) {
          sendFnTds = zeroTds.slice()
        } else if (mode === 5) {
          sendFnTds = ratioTds.slice()
        }
        if (obj.day === '今日') {
          let hour = date.hour === null ? new Date().getHours() : date.hour <= 7 ? 7 : date.hour
          console.log('今日 radioArray hour', hour)
          tds = this.getTds(mode, 24 - hour, obj.total, sendFnTds)
        } else {
          let addNum = date.hour === null ? 17 : 24 - (date.hour <= 7 ? 7 : date.hour)
          console.log('radioArray addNum', addNum)
          tds = this.getTds(mode, addNum, obj.total, sendFnTds)
        }
        obj.tableArray = tds
        // console.log('get length',findObjAttr(assign,`array[${i}].customTableArray.length`))
        // if (
        //   assign.array &&
        //   assign.array[i] &&
        //   assign.array[i].customTableArray &&
        //   assign.array[i].customTableArray.length === 24
        // )
        if (findObjAttr(assign, `array[${i}].customTableArray.length`) === 24) {
          obj.customTableArray = assign.array[i].customTableArray
          // console.log('new assign.array[i]', assign.array[i])
          // console.log('new obj.customTableArray', obj.customTableArray)
          obj.customNumber = assign.array[i].customNumber
        } else {
          obj.customTableArray = [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0
          ]
          obj.customNumber = 0
        }
        array.push(obj)
      }
      return array
    },
    getTds(mode, addNum, total, initTds) {
      if (mode === 3) {
        let average = Math.floor(total / addNum),
          tds = initTds,
          zeroIndex = 24 - addNum,
          remainder = total % addNum
        for (let i = 0; i < zeroIndex; i++) {
          tds[i] = 0
        }
        for (let i = zeroIndex; i < 24; i++) {
          tds[i] = average
        }
        if (remainder !== 0) {
          let tdIndex = zeroIndex
          while (remainder-- > 0) {
            tds[tdIndex] += 1
            tdIndex++
          }
        }
        return tds
      } else if (mode === 5) {
        let zeroIndex = 24 - addNum
        // console.log('getTds mode=5 zeroIndex', zeroIndex)
        let tds = initTds
        for (let i = 0; i < zeroIndex; i++) {
          tds[i] = 0
        }
        const ratioTotal = tds
          .filter((item, index) => {
            return index > zeroIndex - 1
          })
          .reduce((x, y) => x + y)
        // console.log('getTds mode=5 ratioTotal', ratioTotal)
        for (let i = zeroIndex; i < 24; i++) {
          // console.log('getTds mode=5 tds[i]', tds[i])
          tds[i] = Math.floor((tds[i] / ratioTotal) * total)
        }
        let tdsTotal = tds.reduce((x, y) => x + y)
        if (total > tdsTotal) {
          let remainder = total - tdsTotal
          if (remainder > addNum) {
            const addend = Math.floor(remainder / addNum)
            remainder = remainder % addNum
            // console.log('multiplier remainder', multiplier, remainder)
            for (let i = zeroIndex; i < 24; i++) {
              tds[i] += addend
            }
          }
          let tdsIndex = zeroIndex
          while (remainder-- > 0) {
            tds[tdsIndex] += 1
            tdsIndex++
          }
        }
        return tds
      }
    },
    close() {
      // this.confirmCloseModal = true
      console.log('clickAssigns', this.clickAssigns)
      this.$emit('close')
    },
    handleSave() {
      console.log('clickAssigns tableArray', this.clickAssigns)
      let nextBol = true
      this.$refs['form'].validate((valid) => {
        if (!valid) {
          // this.$message.warning('请将带星号的区域按照提示填好')
          nextBol = false
          return false
        } else {
          if (this.twoAlgorithmNums.includes(this.form.carryOutMode)) {
            if (
              this.$route.params.platForm === 'jd' &&
              this.$route.params.taskType === 'popular-rank' &&
              this.checkAllNumber
            ) {
              this.saveErrorText = this.checkAllNumber
                ? '搜索点击需要≥商品加购+商品关注+店铺关注'
                : ''
              nextBol = false
              // this.$message.warning('请将带星号的区域带星号的区域按照提示填好')
            } else if (
              this.$route.params.taskType === 'popular-rank' &&
              this.checkAllZeroNumber
            ) {
              this.saveErrorText = this.checkAllZeroNumber
                ? '请输入任意一个任务数量'
                : ''
              nextBol = false
              // this.$message.warning('请将带星号的区域按照提示填好')
            }
          } else if (this.$route.params.taskType === 'express-train') {
            if (this.checkMinMaxPrice) {
              // this.$message.warning('请将关键词价格区间按照提示填好')
              nextBol = false
            }
          }
        }
      })
      // console.log('nextBol', nextBol)
      if (!nextBol) return
      let plain = {}
      plain.plainId = this.initPlain.plainId
      //继续传goodsTitle回去，保证下次搜索加购使用
      this.initPlain.goodsTitle &&
        (plain.goodsTitle = this.initPlain.goodsTitle)
      plain.indexSymbol =
        this.initPlain.indexSymbol !== undefined
          ? this.initPlain.indexSymbol
          : Date.now()
      plain.form = JSON.parse(JSON.stringify(this.form))
      console.log('plain.form', plain.form)
      // console.log('plain.form.carryOutMode', typeof plain.form.carryOutMode)
      const baseObj = {
        //这里涉及到tab，请按照tab来改key
        click: this.clickAssigns,
        addBuy: this.addBuyAssigns,
        collection: this.collectionAssigns,
        attention: this.attentionAssigns
      }
      let assignsObj = {}
      this.assignTabArray.map((item) => {
        const value = item.value
        assignsObj[value] = { array: baseObj[value] }
      })

      plain.assign = {}
      for (let val of Object.keys(this.initPlain.assign)) {
        plain.assign[val] = assignsObj[val]
      }

      plain.typeTableTotal = {}
      const totalObj = {
        // 这里按照plain的typeTableTotal的key来改
        clickTotal: this.clickAssigns,
        addBuyTotal: this.addBuyAssigns,
        collectionTotal: this.collectionAssigns,
        attentionTotal: this.attentionAssigns
      }
      if (this.customArrayNums.includes(this.form.carryOutMode)) {
        let nextBol = true
        const totalTypeNum = Object.keys(this.initPlain.typeTableTotal).length
        let allTypeDayTotal = {}
        const { platForm, taskType } = this.$route.params
        for (let val of Object.keys(this.initPlain.typeTableTotal)) {
          // console.log('this.initPlain.typeTableTotal', this.initPlain.typeTableTotal)
          // console.log('val totalObj[val]', val, totalObj[val])
          plain.typeTableTotal[val] = totalObj[val]
            .map((item) => {
              //单个任务类型 自定义不能为空
              totalTypeNum === 1 && item.customNumber === 0 && (nextBol = false)
              //拼多多和淘宝人气套餐 一旦填了任务类型，所处的自定义分配表格必须填满
              if (
                ['tb', 'pdd'].includes(platForm) &&
                taskType === 'popular-rank'
              ) {
                allTypeDayTotal[val] === undefined &&
                  (allTypeDayTotal[val] = [])
                allTypeDayTotal[val].push(item.customNumber)
              }

              return item.customNumber
            })
            .reduce((x, y) => x + y)
        }
        console.log('allTypeDayTotal', allTypeDayTotal)
        if (Object.keys(allTypeDayTotal).length !== 0) {
          const maxZeroNum = allTypeDayTotal['clickTotal'].length
          let noZeroLength = {}
          for (let key in allTypeDayTotal) {
            noZeroLength[key] === undefined && (noZeroLength[key] = 0)
            allTypeDayTotal[key].map((item) => {
              item !== 0 && noZeroLength[key]++
            })
          }
          console.log('maxZeroNum noZeroLength', maxZeroNum, noZeroLength)
          for (let key in noZeroLength) {
            noZeroLength[key] > 0 &&
              (nextBol = nextBol && !(noZeroLength[key] % maxZeroNum))
          }
        }
        if (!nextBol) {
          this.$message.warning('单日任务量不能为0，请输入任务量')
          return false
        }
        console.log('plain.typeTableTotal', plain.typeTableTotal)
      } else if (this.twoAlgorithmNums.includes(this.form.carryOutMode)) {
        for (let val of Object.keys(this.initPlain.typeTableTotal)) {
          console.log('totalObj[val]', totalObj[val])
          plain.typeTableTotal[val] = totalObj[val]
            .map((item) => item.total)
            .reduce((x, y) => x + y)
        }
      } else {
        const numTotalObj = {
          clickTotal: this.form.clickNumber,
          addBuyTotal: this.form.addBuyNumber,
          collectionTotal: this.form.collectionNumber,
          attentionTotal: this.form.attentionNumber
        }
        for (let val of Object.keys(this.initPlain.typeTableTotal)) {
          plain.typeTableTotal[val] = numTotalObj[val]
        }
      }
      this.$emit('save', plain)
      this.$emit('close')
    },
    preventScoll(e) {
      e.preventDefault()
    },
    stopBubbing(e) {
      // console.log('stopBubbing', this.$refs.assignsTable, e, e.deltaY)
      const { scrollHeight, offsetHeight, scrollTop } = this.$refs.assignsTable
      // console.log(
      //   'scrollHeight, offsetHeight, scrollTop',
      //   scrollHeight,
      //   offsetHeight,
      //   scrollTop
      // )
      //表格区域可以滚动，阻止冒泡是为了不让父组件阻止滚动事件，其他就冒泡后让父组件阻止
      if (scrollTop + offsetHeight < scrollHeight) {
        e.stopPropagation()
      }
      if (e.deltaY < 0 && scrollTop > 0) {
        e.stopPropagation()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@mixin backgroundButton {
  &.el-button {
    color: white;
    background-color: $theme-color;
    border-radius: 15px;
    padding: 9px 45px;
  }
}

.modal--fixed {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 2001;
}
.modal {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  left: 0;
  top: 0;
  position: absolute;

  .modal-content {
    position: relative;
    background-color: #fff;
    border-radius: 4px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding-bottom: 10px;

    .border-close {
      width: 28px;
      height: 28px;
      position: relative;
      border: 1px solid white;
      border-radius: 50%;
      left: 102.5%;
      top: 0px;
      .el-icon-close {
        position: absolute;
        color: white;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 18px !important;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
      }
    }
    /deep/ .el-form {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      margin-top: -10px;
      .carray-date-time {
        .el-form-item__content {
          margin-left: 0 !important;
          label {
            text-align: right;
            display: inline-block;
            width: 80px;
          }
        }
      }
      .form-item_div:empty {
        width: 0;
      }
      .form-item_div {
        width: 32%;
        &.date-move {
          margin-left: 22px;
        }
        &.form-item--double {
          width: 40%;
        }
        .el-form-item {
          // width: 32%;
          margin-bottom: 10px;
          .el-form-item__content {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            .double-input {
              flex: 1;
              display: flex;
              // input::placeholder {
              // }
              .el-input__inner {
                padding: 0;
                text-align: center;
              }
              .double-input_span {
                margin: 0 5px;
              }
              .double-input_error {
                position: absolute;
                top: 40px;
                left: 120px;
                font-size: 12px;
                line-height: 100%;
                color: $theme-color;
              }
            }
            .number-input {
              .el-input__suffix {
                height: 0;
                width: 270px;
                left: 0;
                top: 25px;
                color: $theme-color;
                text-align: left;
              }
            }
          }
          .form-label {
            display: inline-block;
            min-width: 80px;
            text-align: right;
            padding-left: 10px;
            .star {
              color: $theme-color;
            }
            &.double-input_label {
              width: 70px;
              line-height: 150%;
              text-align: center;
              margin-left: 27px;
            }
          }
          .el-input {
            flex: 1;
            max-width: 160px;
          }
          .input-key-words {
            @extend .el-input;
            .el-input__suffix {
              right: -25px;
              font-size: 24px;
              color: #333;
              z-index: 2002;
            }
          }
          .el-select {
            flex: 1;
            max-width: 160px;
            .el-input__inner:focus {
              border-color: #dcdfe6;
              // border-color: $theme-color;
            }
            span.el-input__suffix {
              top: -3px;
            }
          }
          .el-form-item__error {
            width: 300px;
            padding-top: 0;
            text-align: left;
            margin-left: 42%;
          }
          .el-date-editor {
            width: 65%;
            padding: 3px 5px 3px 8px;
            .el-icon-date {
              display: none;
            }
            .el-icon-time {
              display: none;
            }
            input {
              width: 100%;
            }
          }
          .date-time_label {
            width: 110px;
          }
          .date-time_picker {
            width: 55%;
            padding: 0;
            input {
              padding: 0 10px;
            }
          }
        }
      }
    }
    .save {
      text-align: center;
      margin: 10px auto;
      /deep/ .save-button {
        @include backgroundButton;
      }
    }
    .assigns-table {
      max-height: 320px;
      overflow-y: scroll;
    }
  }
}
</style>
