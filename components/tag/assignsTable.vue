<template>
  <div class="assign">
    <div class="flex">
      <div class="day">
        <span>{{day}}:</span>
      </div>
      <div class="table-div">
        <table>
          <tr v-for="(tr,trIndex) in tableData" :key="'tr'+ trIndex">
            <td v-for="(td,tdIndex) in tr.td" :key="'td'+tdIndex">
              <template v-if="trIndex === 0 || trIndex === 2 ">{{ td }}</template>
              <input
                v-else-if="trIndex === 1 || trIndex === 3 "
                v-model.number="td.num"
                type="number"
                @change="changeNumCb(td.num,trIndex,tdIndex)"
                @click="numSelect($event)"
                :disabled="mode === 5 || mode === 3"
              />
            </td>
          </tr>
        </table>
      </div>
    </div>
    <p class="total">
      <span>数量：</span>
      <template v-if="mode === 5 || mode === 3">{{fixTotal}}</template>
      <template v-else-if="mode === 4 || mode === 2">{{customTotal}}</template>
    </p>
  </div>
</template>

<script>
// import eventBus from '../assets/js/eventBus.js'
import { context as numStrageContext } from '@/assets/js/numStrategyMap'
export default {
  name: '',
  props: {
    total: {
      type: Number,
      default: 0
    },
    day: {
      type: String,
      default: '今日'
    },
    sendPlain: {
      type: Object,
      default: () => {}
    },
    tabActiveIndex: {
      type: String,
      default: 'click'
    },
    carryOutMode: {
      type: Number,
      default: 1
    },
    tableArray: {
      type: Array,
      default: function () {
        return []
      }
    },
    customTableArray: {
      type: Array,
      default: function () {
        return [
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
      }
    },
    customNumber: {
      type: Number,
      default: 0
    }
  },
  components: {},
  data() {
    return {
      tableData: [
        {
          td: [
            '0~1',
            '1~2',
            '2~3',
            '3~4',
            '4~5',
            '5~6',
            '6~7',
            '7~8',
            '8~9',
            '9~10',
            '10~11',
            '11~12'
          ]
        },
        {
          td: [
            { num: 0 },
            { num: 0 },
            { num: 0 },
            { num: 0 },
            { num: 0 },
            { num: 0 },
            { num: 0 },
            { num: 0 },
            { num: 0 },
            { num: 0 },
            { num: 0 },
            { num: 0 }
          ]
        },
        {
          td: [
            '12~13',
            '13~14',
            '14~15',
            '15~16',
            '16~17',
            '17~18',
            '18~19',
            '19~20',
            '20~21',
            '21~22',
            '22~23',
            '23~24'
          ]
        },
        {
          td: [
            { num: 0 },
            { num: 0 },
            { num: 0 },
            { num: 0 },
            { num: 0 },
            { num: 0 },
            { num: 0 },
            { num: 0 },
            { num: 0 },
            { num: 0 },
            { num: 0 },
            { num: 0 }
          ]
        }
      ],
      customTds: this.customTableArray,
      mode: this.carryOutMode,
      fixTotal: this.total
    }
  },
  computed: {
    customTotal: function () {
      const total = this.setCustomTotalToNum().reduce((x, y) => {
        x === '' && (x = 0)
        y === '' && (y = 0)
        return x + y
      })
      this.$emit('update:customNumber', total)
      return total
    }
  },
  watch: {
    tabActiveIndex: function () {
      // 特别重要 因為切換只是更換tab和更新showTableArray数据 而key绑定在天数上 ，切换时并没有改变天数，
      // 所以组件的数据还是之前的，但也帮我们减少组件重新渲染，而是采用改变customTds数据的形式
      // 该组件的customTds还是保持上个tabActiveIndex区域的值
      this.customTds = this.customTableArray
      this.init()
      // console.log('customTableArray', this.customTableArray)
    },
    sendPlain: function () {
      this.customTds = this.customTableArray
      this.init()
      // console.log('this.customTds', this.customTds)
    },
    carryOutMode: function (val) {
      this.mode = val
      this.init()
    },
    total: function (val) {
      this.fixTotal = val
      this.init()
    },
    tableArray: function (val) {
      this.init()
    }
  },
  created() {
    // eventBus.$on('setTableArray', this.setTableArrayCb)
    // eventBus.$on('setCustomTableArray', this.setCustomTableArrayCb)
    this.init()
  },
  mounted() {},
  methods: {
    init() {
      let tds = []
      if (this.mode === 3 || this.mode === 5) {
        tds = this.tableArray.slice()
      } else if (this.mode === 4 || this.mode === 2) {
        tds = this.customTds.slice()
      }
      this.setTableDataTd(tds)
    },

    setTableDataTd(tds) {
      let tableDataTd1 = []
      let tableDataTd3 = []
      for (let i = 0; i < 24; i++) {
        if (i < 12) {
          tableDataTd1[i] = { num: 0 }
          tableDataTd1[i].num = tds[i]
        } else {
          tableDataTd3[i - 12] = { num: 0 }
          tableDataTd3[i - 12].num = tds[i]
        }
      }
      // console.log('tableDataTd1', tableDataTd1)
      this.tableData[1].td = tableDataTd1
      this.tableData[3].td = tableDataTd3
    },
    numSelect(event) {
      event.toElement.select()
    },
    // 清除-+.符号和数字前为0（由vue已经处理）的情况，替换页面的数据
    // 同时将内容存入到自定义tds中，保证切换时数据存在  比如处理-10.25 +10.25 -10
    changeNumCb(val, trIndex, tdIndex) {
      // console.log('changeNumCb', val)
      // 输入+10 过来是10 所以+10没法处理，vue不能主动更新替换+10 但数据存储也会是10
      console.log('changeNumCb', val)
      if (val === '') {
        val = 0
        this.tableData[trIndex].td[tdIndex].num = val
      } else {
        let valString = val + ''
        const numSymbolArray = ['-', '+', '.'].map((item) => {
          // ['-', '+', '.'] '-' '+'优于 '.'
          return valString.includes(item) && item
        })
        if (numSymbolArray.length > 0) {
          val = numStrageContext('numSymbol', val, numSymbolArray)
        }
        this.tableData[trIndex].td[tdIndex].num = val
      }
      const customTdsOffset = trIndex === 1 ? 0 : 12
      this.customTds[customTdsOffset + tdIndex] = val
      this.$emit('update:customTableArray', this.customTds) // 添加计划时进行耦合
    },

    // tableDate的输入框数据变动影响数量计算
    setCustomTotalToNum() {
      let tds = []
      this.tableData.map((tr, index) => {
        if (index === 1 || index === 3) {
          tr.td.map((td) => {
            tds.push(td.num)
          })
        }
      })
      return tds
    }
  }
}
</script>

<style lang="scss" scoped>
.assign {
  margin-bottom: 10px;
  .flex {
    display: flex;
    padding: 10px 24px;
    .day {
      width: 40px;
      text-align: right;
      margin-right: 10px;
    }
    .table-div {
      width: 100%;
      border: 1px solid #eeeeee;
      border-radius: 10px;
    }
    table {
      width: 100%;
      text-align: center;
      line-height: 200%;
      td {
        width: 30px;
        input {
          text-align: center;
          width: 90%;
          border: 1px solid white;
          background: white;
          outline: 0;
          border-radius: 4px;
        }
        input:focus {
          border: 1px solid $theme-color;
        }
      }
      tr:nth-child(2n + 1) {
        background: #f8f8f8;
      }
    }
  }
  .total {
    margin-left: 24px;
  }
}
</style>
