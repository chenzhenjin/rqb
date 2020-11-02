<template>
  <div class="release-traffic">
    <div class="container">
      <div class="task-order">
        <section class="shop-link">
          <p class="title">商品信息</p>
          <template v-if="Object.keys(liveInfo).length > 0">
            <div v-if="liveInfo.liveUrl === ''">
              <span class="star">*</span>
              <span>{{ liveInfo.label }}</span>
              <el-button type="text" icon="el-icon-plus" class="add-link" @click="isLiveLinkModal = true"
                >添加链接</el-button
              >
            </div>
            <div v-else>
              <div class="link">
                <div class="flex">
                  <p class="label">
                    <span class="star">*</span>
                    <span class="label_span">{{ liveInfo.label }}</span>
                  </p>
                  <p class="content">{{ liveInfo.liveUrl }}</p>
                </div>
                <div>
                  <el-button type="text" class="detele" @click="deleteLiveLink">删除</el-button>
                </div>
              </div>
              <div class="flex" v-for="liveInfoProp in liveInfoProps" :key="liveInfoProp.label">
                <p class="label">
                  <span class="nbsp">&nbsp;</span>
                  <span class="label_span">{{ liveInfoProp.label }}</span>
                </p>
                <p class="content">{{ liveInfo[liveInfoProp.prop] }}</p>
                <span>&nbsp;</span>
              </div>

              <!-- <div class="flex">
              <span class="label">店铺名称:</span>
              <span class="content">{{goodsInfo.name}}</span>
              <span>&nbsp;</span>
              </div>-->
            </div>
          </template>
          <template v-if="Object.keys(liveInfo).length === 0">
            <div v-if="goodsInfo.skuUrl === ''">
              <span class="star">*</span>
              <span>{{ goodsInfo.label }}</span>
              <el-button type="text" icon="el-icon-plus" class="add-link" @click="isLinkModal = true"
                >添加链接</el-button
              >
            </div>
            <div v-else>
              <div class="link">
                <div class="flex">
                  <p class="label">
                    <span class="star">*</span>
                    <span class="label_span">{{ goodsInfo.label }}</span>
                  </p>
                  <p class="content">{{ goodsInfo.skuUrl }}</p>
                </div>
                <div>
                  <el-button type="text" class="detele" @click="deleteGoodsLink">删除</el-button>
                </div>
              </div>
              <div class="flex" v-for="goodsInfoProp in goodsInfoProps" :key="goodsInfoProp.label">
                <p class="label">
                  <span class="nbsp">&nbsp;</span>
                  <span class="label_span">{{ goodsInfoProp.label }}</span>
                </p>
                <p class="content">{{ goodsInfo[goodsInfoProp.prop] }}</p>
                <span>&nbsp;</span>
              </div>
            </div>
          </template>
          <template v-if="(carryOutConfig && carryOutConfig.jtkType) || [6, 8, 9].includes(carryOutConfig.pttqzType)">
            <div v-if="shortInfo.shortUrl === ''">
              <span class="star">*</span>
              <span style="display: inline-block; min-width: 70px">{{ shortInfoLabel }}：</span>
              <el-button type="text" icon="el-icon-plus" class="add-link" @click="isShortLinkModal = true"
                >添加链接</el-button
              >
            </div>
            <div v-else>
              <div class="link">
                <div class="flex">
                  <p class="label">
                    <span class="star">*</span>
                    <span class="label_span">{{ shortInfoLabel }}</span>
                  </p>
                  <p class="content">{{ shortInfo.shortUrl }}</p>
                </div>
                <div>
                  <el-button
                    type="text"
                    class="detele"
                    @click="
                      shortInfo.shortUrl = ''
                      shortInputLink = ''
                    "
                    >删除</el-button
                  >
                </div>
              </div>
            </div>
          </template>
          <div v-if="![null, undefined].includes(entryMode.mode)" class="entry-mode">
            <div class="content">
              <p>
                <span class="star">*</span>
                <span>{{ entryMode.label }}</span>
              </p>
              <el-radio-group v-model="entryMode.mode">
                <el-radio v-for="item in entryMode.radioProps" :key="item.label" :label="item.value">{{
                  item.label
                }}</el-radio>
              </el-radio-group>
            </div>
          </div>
          <div v-for="config in carryOutConfigList" :key="config.label" class="task-type">
            <div v-if="config.type === 'select'" class="content">
              <p>
                <span class="star">*</span>
                <span>{{ config.label }}</span>
              </p>
              <el-select v-model="carryOutConfig[config.prop]" size="mini">
                <el-option
                  v-for="option in config.options"
                  :key="option.label"
                  :label="option.label"
                  :value="option.value"
                ></el-option>
              </el-select>
            </div>
          </div>
          <template v-if="Object.keys(liveInfo).length > 0 && carryOutConfig.jdLiveType > 1">
            <div v-if="['', null].includes(goodsInfo.skuUrl)" class="live-goods">
              <span class="star">*</span>
              <span>{{ goodsInfo.label }}</span>
              <el-button type="text" icon="el-icon-plus" class="add-link" @click="isLinkModal = true"
                >添加链接</el-button
              >
            </div>
            <div v-else>
              <div class="link">
                <div class="flex">
                  <p class="label">
                    <span class="star">*</span>
                    <span class="label_span">{{ goodsInfo.label }}</span>
                  </p>
                  <p class="content">{{ goodsInfo.skuUrl }}</p>
                </div>
                <div>
                  <el-button type="text" class="detele" @click="deleteGoodsLink">删除</el-button>
                </div>
              </div>
              <div class="flex" v-for="goodsInfoProp in goodsInfoProps" :key="goodsInfoProp.label">
                <p class="label">
                  <span class="nbsp">&nbsp;</span>
                  <span class="label_span">{{ goodsInfoProp.label }}</span>
                </p>
                <p class="content">{{ goodsInfo[goodsInfoProp.prop] }}</p>
                <span>&nbsp;</span>
              </div>
              <!-- <div class="flex">
              <span class="label">店铺名称:</span>
              <span class="content">{{goodsInfo.name}}</span>
              <span>&nbsp;</span>
              </div>-->
            </div>
          </template>
        </section>
        <section class="carryout-plain">
          <div class="header">
            <p>
              <span class="title">执行计划</span>
              <span class="max">（最多可添加5个计划）</span>
            </p>
            <el-button type="text" class="add-plain" @click="addPlain">添加计划</el-button>
          </div>
          <div class="plain-description" v-for="(renderPlain, index) in renderPlains" :key="'plain' + index">
            <div class="title">
              <p>
                <span class="star">*</span>
                <span>计划</span>
              </p>
              <p>
                <el-button type="text" class="editor" @click="editorPlain(renderPlain.indexSymbol)">修改</el-button>
                <el-button type="text" class="delete" @click="deletePlain(renderPlain.indexSymbol)">删除</el-button>
              </p>
            </div>
            <div class="content">
              <span v-for="plainProp in plainsProps" :key="plainProp.label">
                <template v-if="renderPlain[plainProp.prop] !== undefined"
                  >{{ plainProp.label }}{{ renderPlain[plainProp.prop] }}</template
                >
              </span>
              <!-- <span>关键词：{{plain.keyWords}}</span> -->
            </div>
          </div>
        </section>
        <section class="carryout-config">
          <p class="title">执行配置</p>
          <div class="flex-group">
            <div class="label">
              <p class="label-item">
                <span class="star">*</span>
                <span>流量类型：</span>
              </p>
              <p v-if="$route.params.taskType === 'shop-attention'" class="label-item">
                <span class="star">*</span>
                <span>粉丝类型：</span>
              </p>
              <p v-if="$route.params.taskType === 'express-train'" class="label-item">
                <span class="star">*</span>
                <span>进入方式：</span>
              </p>
              <p v-for="config in renderCarryOutConfigList" :key="config.label">
                <template v-if="['radioGroup', 'inputGroup'].includes(config.type)">
                  <span class="star">*</span>
                  <span>{{ config.label }}</span>
                </template>
              </p>
            </div>
            <div class="group">
              <div class="group-item">
                <el-radio-group v-model="trafficType">
                  <el-radio :label="1">App端实名访客</el-radio>
                </el-radio-group>
              </div>
              <div v-if="$route.params.taskType === 'shop-attention'" class="group-item">
                <el-radio-group v-model="fanType">
                  <el-radio :label="1">高级粉丝</el-radio>
                </el-radio-group>
              </div>
              <div v-if="$route.params.taskType === 'express-train'" class="group-item">
                <el-radio-group v-model="carryOutConfig.enterType">
                  <el-radio v-if="carryOutConfig.jdKuaiCheType === 5" :label="1">无访客进入</el-radio>
                  <el-radio v-else :label="2">带访客进入</el-radio>
                </el-radio-group>
              </div>
              <div v-for="config in renderCarryOutConfigList" :key="config.label" class="group-item">
                <el-radio-group v-if="config.type === 'radioGroup'" v-model="carryOutConfig[config.prop]">
                  <el-radio v-for="radio in config.radios" :key="radio.text" :label="radio.label">{{
                    radio.text
                  }}</el-radio>
                </el-radio-group>
                <template v-else-if="config.type === 'inputGroup'">
                  <div v-for="(option, i) in config.options" :key="option.label" class="input-group-item">
                    <span class="input-group-item_span">{{ option.label }}</span>
                    <template v-if="i === 0">
                      <el-input
                        class="input-group-item_input"
                        type="number"
                        v-model="carryOutConfig[config.prop]"
                        @input="inputMaleRatio"
                        size="mini"
                      ></el-input>
                    </template>
                    <el-input
                      class="input-group-item_input"
                      v-else
                      :value="100 - carryOutConfig[config.prop]"
                      disabled
                      size="mini"
                    ></el-input>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </section>
        <section
          class="character-portrait"
          v-if="$route.params.platForm === 'jd' && ['traffic-click', 'popular-rank'].includes($route.params.taskType)"
        >
          <div class="header">
            <span class="title">人群画像设置</span>
            <el-button v-show="!isCrowdPortrait" type="text" class="spread" @click="isCrowdPortrait = true">
              展开
              <i class="el-icon-arrow-down"></i>
            </el-button>
            <el-button v-show="isCrowdPortrait" type="text" class="pack-up" @click="isCrowdPortrait = false">
              收起
              <i class="el-icon-arrow-up"></i>
            </el-button>
          </div>
          <el-collapse-transition>
            <div class="content" v-show="isCrowdPortrait">
              <crowd-portrait :portraitConfig.sync="portraitConfig"></crowd-portrait>
            </div>
          </el-collapse-transition>
        </section>
        <section class="one-price">
          <p class="title">单价</p>
          <p v-for="price in priceContent.priceList" :key="price.prop" class="content">
            <span>{{ price.label }}</span>
            <span>{{ showPrice(price.prop, price.changePrice) }}</span>
          </p>
        </section>
        <section class="payment-information">
          <p class="title">支付信息</p>
          <el-table :data="tableData" class="table" stripe>
            <el-table-column label="序号" align="center">
              <template slot-scope="scope">
                <span>{{ scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column
              v-for="item in renderTableProps"
              :key="item.prop"
              :prop="item.prop"
              :label="item.label"
              align="center"
            ></el-table-column>
          </el-table>
          <p class="calculation">
            <span>合计：￥{{ allTotal }}</span>
            <template
              v-if="
                discount < 1 && ($route.params.platForm === 'jd' ? $route.params.taskType !== 'shop-attention' : true)
              "
            >
              <span class="text">会员折扣：</span>
              <span class="num">{{ discount * 10 }}折</span>
              <span class="text">实际支付：</span>
              <span class="num">￥{{ vipTotal }}</span>
            </template>
          </p>
          <p class="operation">
            <el-button type="text" class="save" @click="saveAllPlain" :loading="isSendSaveLoading">{{
              isSendSaveLoading ? '保存中' : '保存'
            }}</el-button>
            <el-button
              type="text"
              size="small"
              class="release"
              @click="releaseAllTask"
              :loading="isSendReleaseLoading"
              >{{ isSendReleaseLoading ? '发布中' : '去发布' }}</el-button
            >
          </p>
        </section>
      </div>
    </div>
    <common-modal v-if="isShortLinkModal" :headerText="shortInfoLabel" width="530" @close="isShortLinkModal = false">
      <div class="content">
        <el-input
          v-model="shortInputLink"
          :placeholder="'请输入' + shortInfoLabel"
          clearable
          @input="checkShortLinkError(shortInputLink)"
        ></el-input>
        <div class="refence-link">
          <div v-html="shortLinkError"></div>
        </div>
        <p>
          <el-button type="text" class="background-btn" @click="addShortLink">添加</el-button>
        </p>
      </div>
    </common-modal>
    <common-modal v-if="isLiveLinkModal" headerText="直播链接" width="530" @close="liveLinkCloseCb">
      <div class="content">
        <el-input
          v-model="liveInputLink"
          placeholder="请输入直播链接"
          clearable
          @input="checkLiveLinkError(liveInputLink)"
        ></el-input>
        <div class="refence-link">
          <div v-html="liveLinkError"></div>
        </div>
        <p>
          <el-button type="text" class="background-btn" :loading="addLiveLinkLoading" @click="addLiveLink">{{
            addLiveLinkText
          }}</el-button>
        </p>
      </div>
    </common-modal>
    <common-modal v-show="isLinkModal" headerText="商品链接" width="530" @close="linkCloseCb">
      <div class="content">
        <el-input
          v-model="inputLink"
          placeholder="请输入商品链接"
          clearable
          @input="checkGoodsLinkError(inputLink)"
        ></el-input>
        <div class="refence-link">
          <div v-html="goodsLinkError"></div>
        </div>
        <p>
          <el-button type="text" class="background-btn" :loading="addGoodsLinkLoading" @click="addGoodsLink">{{
            addGoodsLinkText
          }}</el-button>
        </p>
      </div>
    </common-modal>
    <add-task-modal
      v-show="isTaskModal"
      :sendPlain="sendPlain"
      :modalFormProps="sendModalFormProps"
      :modalFormOptions="modalFormOptions"
      :modalControlArea="modalControlArea"
      :modalAssignTabArray="modalAssignTabArray"
      width="870"
      @close="taskCloseCb"
      @save="saveCb"
    ></add-task-modal>
    <common-modal v-show="isTopUpModal" width="530" @close="isTopUpModal = false">
      <div class="content">
        <p class="explain">
          <span>您好，您的余额不足，请先充值，谢谢~</span>
        </p>
        <p>
          <el-button type="text" class="text-btn" @click="isTopUpModal = false">取消</el-button>
          <a :href="payUrl">
            <el-button type="text" class="background-btn">去充值</el-button>
          </a>
        </p>
      </div>
    </common-modal>
    <common-modal v-show="isReleaseModal" width="530" @close="releaseCloseCb">
      <div class="content">
        <p class="explain">
          <span>你的当前京店宝余额充足，点击支付后将自动扣费</span>
          <span class="money">{{ accountInfo.payMoney }}</span>
          <span>元，是否确认支付?</span>
        </p>
        <p>
          <el-button type="text" class="text-btn" @click="isReleaseModal = false">取消</el-button>
          <el-button type="text" class="background-btn" :loading="isPayLoading" @click="onGetPayMoney">支付</el-button>
        </p>
      </div>
    </common-modal>
    <common-modal v-show="isPayModal" width="530" @close="payCloseCb">
      <div class="content">
        <p class="bold">支付成功</p>
        <!-- <p class="explain">（这是测试，点击不会扣钱，不会发布任务）</p> -->
        <p>
          <el-button type="text" class="text-btn" @click="isPayModal = false">关闭</el-button>
          <!-- <a :href="examineTask"> -->
          <el-button type="text" class="background-btn" @click="onJumpMyTask">去查看任务</el-button>
          <!-- </a> -->
        </p>
      </div>
    </common-modal>
  </div>
</template>

<script>
import commonModal from '@/commonProject/components/tag/commonModal.vue'
import addTaskModal from '@/commonProject/components/tag/addTaskModal.vue'
import crowdPortrait from '@/commonProject/components/tag/crowdPortrait.vue'

import { mapState, mapMutations } from 'vuex'
import { SET_RELATED } from '@/store/type'

import { getReleaseJson } from '@/commonProject/assets/js/getReleaseJson.js'
import { datePastHandle, timeToFormatDate, timePastHandle } from '@/commonProject/assets/js/plainDate.js'
import { Subject, Observer, ObserverArray } from '@/commonProject/assets/js/observer.js'
import { PubSub } from '@/commonProject/assets/js/pubSub.js'
import { NextChain } from '@/commonProject/assets/js/nextChain.js'
import { floatHandle } from '@/commonProject/assets/js/float.js'

import { getGoodsInfo, saveTask, taskDetail, payMoney } from '@/commonProject/api/release.js'
import { getCostList } from '@/commonProject/api/flow.js'
import { getPowerPopTaskPrice } from '@/commonProject/api/llbTask.js'

import { context as numberContext } from '@/commonProject/assets/js/numStrategyMap'
import {
  linkRegFn,
  analysyPlan,
  setTableDataItem,
  deepCopyDeleteArray,
  deepCopyPlains,
  getPlainsIndex,
  deepCopySendPlainModal,
  sendBackPlan,
  getPrice as getFrontPrice,
  setPriceContent
} from './js/releasePureFn.js'

export default {
  components: { commonModal, addTaskModal, crowdPortrait },
  data() {
    return {
      api: {},
      inputLink: '',
      liveInputLink: '',
      shortInputLink: '',
      shortLinkError: '',
      goodsLinkError: '',
      liveLinkError: '',
      addGoodsLinkLoading: false,
      addLiveLinkLoading: false,
      tabActiveIndex: 1,
      isLinkModal: false,
      isLiveLinkModal: false,
      isShortLinkModal: false,
      isLinkAdd: true,
      isTaskModal: false,
      isTopUpModal: false,
      isReleaseModal: false,
      isPayModal: false,
      isCrowdPortrait: false,
      plains: [],
      plainMobal: {},
      sendPlain: {},
      plainsProps: [],
      renderPlains: [],
      trafficType: 1,
      fanType: 1,
      residenceTime: 1,
      threeComparision: 1,
      tableProps: [],
      goodsInfo: {},
      goodsInfoProps: [],
      liveInfo: {},
      liveInfoProps: [],
      shortInfo: {},
      entryMode: { mode: null },
      modalFormOptions: {},
      modalFormProps: [],
      modalControlArea: {},
      modalAssignTabArray: [],
      // tableData: [],
      portraitConfig: {
        category: [],
        gender: [],
        age: [],
        buy: []
      },
      carryOutConfig: {},
      carryOutConfigList: [],
      twoAlgorithmNums: [],
      customArrayNums: [],
      carryOutModeNeedHour: false,
      priceContent: {
        priceList: [
          // {
          //   label: '搜索点击：',
          //   changePrice: { carryOutConfig: ['stayType', 'compare'] }, // 与外层的priceContent和this对象相对应key
          //   prop: 'clickPrice',
          // },
          // {
          //   label: '商品加购：',
          //   changePrice: { entryPrice: 'addCart' },
          //   prop: 'addCartPrice',
          // }
        ],
        carryOutConfig: {
          // stayType: { 1: 0.08, 2: 0.12, 3: 0.18 },
        },
        entryPrice: {
          // addCart: {
          //   0: 0.2,
          //   1: 0.3,
          // default: 0,
          // },
        }
      },
      priceMap: {
        clickTotal: 0,
        addBuyTotal: 0,
        collectionTotal: 0,
        attentionTotal: 0
      },
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
      accountInfo: {
        balance: 0,
        enough: false,
        payMoney: 0,
        ids: ''
      },
      payUrl: './#/recharge',
      // examineTask: './#/flow/myTask',
      // discount: 1,
      isSendSaveLoading: false,
      isSendReleaseLoading: false,
      isPayLoading: false
      // backprice: {}
    }
  },
  computed: {
    ...mapState(['carryOutModeLabel', 'discount', 'backprice']),
    shortInfoLabel() {
      if (this.carryOutConfig.jtkType) {
        return this.shortInfo[0].label
      }
      if (this.carryOutConfig.pttqzType) {
        return [6, 8, 9].includes(this.carryOutConfig.pttqzType) && this.shortInfo[this.carryOutConfig.pttqzType].label
      }
    },
    shortCheckObj() {
      if (this.carryOutConfig.jtkType) {
        return {
          error: {
            nullError: '请输入' + this.shortInfoLabel,
            regFailError: '<p>链接错误，参考格式：</p><p>https://u.jd.com/******</p>'
          },
          reg: 'https://u.jd.com/\\S+'
        }
      }
      if (this.carryOutConfig.pttqzType) {
        return {
          error: {
            nullError: '请输入' + this.shortInfoLabel,
            regFailError: [6, 8].includes(this.carryOutConfig.pttqzType)
              ? '<p>链接错误，参考格式：</p><p>https://******</p>'
              : '<p>直播口令错误，应为数字+字母组合，参考案例：</p><p>s45A0OvgntD</p>'
          },
          reg: [6, 8].includes(this.carryOutConfig.pttqzType) ? 'https://\\S+' : '\\w+'
        }
      }
    },
    addGoodsLinkText() {
      return this.addGoodsLinkLoading ? '加载中' : '添加'
    },
    addLiveLinkText() {
      return this.addLiveLinkLoading ? '加载中' : '添加'
    },
    renderTableProps() {
      if (this.entryMode && this.entryMode.mode === 0) {
        // console.log("this.entryMode.mode", this.entryMode.mode)
        return deepCopyDeleteArray(this.tableProps)
      } else {
        if (this.carryOutConfig.pttqzType) {
          if (this.carryOutConfig.pttqzType !== 1) return deepCopyDeleteArray(this.tableProps)
        }
        return this.tableProps
      }
    },
    renderCarryOutConfigList() {
      if (this.entryMode && this.entryMode.mode === 0) {
        return []
      } else {
        return this.carryOutConfigList
      }
    },
    sendModalFormProps() {
      if (this.entryMode && this.entryMode.mode === 0) {
        // console.log("this.entryMode.mode", this.entryMode.mode)
        return deepCopyDeleteArray(this.modalFormProps)
      } else {
        if (this.carryOutConfig.pttqzType) {
          if (this.carryOutConfig.pttqzType !== 1) return deepCopyDeleteArray(this.modalFormProps)
        }
        return this.modalFormProps
      }
    },
    //从priceList的某个changePrice.carryOutConfig拿到key 找出priceContent.carryOutConfig相应对象
    //再到this.carryOutConfig拿到值作为对象的key取值
    clickPrice() {
      // const _this = this //只要this有属性改变就会引起
      const priceMap = this.priceMap,
        priceContent = this.priceContent,
        frontCarryOutConfig = this.carryOutConfig
      // console.log('priceArray', this.priceArray('clickPrice'))
      //由priceList.changePrice.carryOutConfig来确定值
      if (this.priceArray('clickPrice')) {
        return function (changePrice) {
          // function changeCall() {
          let res = 0
          for (let key in changePrice) {
            if (key === 'carryOutConfig') {
              const backCarryOutConfig = priceContent[key]
              console.log('carryOutConfig', backCarryOutConfig)
              for (let value of changePrice[key]) {
                ![undefined, null].includes(frontCarryOutConfig[value])
                  ? (res += backCarryOutConfig[value][frontCarryOutConfig[value]])
                  : (res += backCarryOutConfig[value])
                console.log('changePrice', res)
              }
            }
          }
          priceMap['clickTotal'] = floatHandle(res)
          return floatHandle(res)
          // }
          // return changeCall.call(_this)
        }
      }
    },
    addCartPrice() {
      const entryMode = this.entryMode,
        priceContent = this.priceContent,
        params = this.$route.params,
        carryOutConfig = this.carryOutConfig,
        priceMap = this.priceMap
      if (this.priceArray('addCartPrice')) {
        return function (changePrice) {
          return getFrontPrice(
            changePrice,
            entryMode.mode,
            priceContent,
            'addBuyTotal',
            params.platForm,
            carryOutConfig,
            priceMap
          )
        }
      }
    },
    goodsAttentionPrice() {
      const entryMode = this.entryMode,
        priceContent = this.priceContent,
        params = this.$route.params,
        carryOutConfig = this.carryOutConfig,
        priceMap = this.priceMap
      if (this.priceArray('goodsAttentionPrice')) {
        return function (changePrice) {
          return getFrontPrice(
            changePrice,
            entryMode.mode,
            priceContent,
            'collectionTotal',
            params.platForm,
            carryOutConfig,
            priceMap
          )
        }
      }
    },
    shopAttentionPrice() {
      const entryMode = this.entryMode,
        priceContent = this.priceContent,
        params = this.$route.params,
        carryOutConfig = this.carryOutConfig,
        priceMap = this.priceMap
      if (this.priceArray('shopAttentionPrice')) {
        return function (changePrice) {
          return getFrontPrice(
            changePrice,
            entryMode.mode,
            priceContent,
            'attentionTotal',
            params.platForm,
            carryOutConfig,
            priceMap
          )
        }
      }
    },
    //做判断生成相应的price
    priceArray() {
      const pricePropArray = this.priceContent.priceList.map((item) => item.prop)
      return function (priceProp) {
        return pricePropArray.includes(priceProp)
      }
    },
    tableData: {
      get: function () {
        console.log('computed tableData')
        return this.renderPlains.map((item) => {
          // 只有renderPlains数组操作和priceMap变化才生效
          return setTableDataItem(JSON.parse(JSON.stringify(item)), this.priceMap)
        })
      },
      set: function ({ currentIndex, renderPlain }) {
        //只有深拷贝保存后重新赋值才能更新表格
        this.renderPlains[currentIndex] = renderPlain
        const newRenderPlains = JSON.parse(JSON.stringify(this.renderPlains))
        this.renderPlains = []
        this.$nextTick(function () {
          this.renderPlains = newRenderPlains
        })
      }
    },
    // 在渲染的plain中获取每个类型数组值来计算 折扣会影响到千分位
    vipTotal() {
      if (this.discount < 1) {
        console.log('vipTotal renderPlains', this.renderPlains)
        let allTypeVipPrice = 0
        if (this.renderPlains.length > 0) {
          this.renderPlains.map((item) => {
            for (let key in item.assignsDaysObj) {
              const vipPrice = this.priceMap[key + 'Total'] * this.discount
              // allTypeVipPrice += item.assignsDaysObj[key]
              //   .map((item) => floatHandle(vipPrice * item))
              //   .reduce((x, y) => x + y)
              const typePriceArray = item.assignsDaysObj[key].map((item) => floatHandle(vipPrice * item))
              allTypeVipPrice += typePriceArray.length > 0 ? typePriceArray.reduce((x, y) => x + y) : 0
              console.log('priceMap', this.priceMap[key + 'Total'])
            }
          })
        }
        console.log('allTypeVipPrice', allTypeVipPrice)
        return floatHandle(allTypeVipPrice)
        // return floatHandle(this.allTotal * this.discount)
      }
    },
    // 在支付信息表格的money来计算
    allTotal() {
      if (this.tableData.length > 0) {
        return this.tableData.reduce(function (total, currentValue) {
          console.log('allTotal all', total, Number(currentValue.money.split('￥')[1]))
          return floatHandle(total + Number(currentValue.money.split('￥')[1]))
        }, 0)
      } else {
        return 0
      }
    }
  },
  watch: {
    'carryOutConfig.pttqzType': {
      handler: function (newVal, oldVal) {
        console.log('carryOutConfig.pttqzType', newVal, oldVal)
        this.shortInputLink = ''
        this.shortLinkError = ''
        if (!(oldVal === 1 && [6, 8, 9].includes(newVal))) this.shortInfo.shortUrl = ''
        // 等到接收才有plains 而entryMode.mode请求函数下个函数改变，所以不影响
        // 优化，未获取oldVal时不用处理renderPlains，当判断前后都大于也不用
        if (oldVal === undefined || (newVal > 1 && oldVal > 1)) return
        this.$nextTick(function () {
          this.renderPlains = this.plains.map((item) => {
            console.log('carryOutConfig.pttqzType renderPlains', item)
            return deepCopyPlains(
              item,
              newVal + '',
              this.twoAlgorithmNums,
              this.customArrayNums,
              this.carryOutModeLabel,
              this.carryOutModeNeedHour,
              this.ratioObj
            )
          })
          console.log('carryOutConfig.pttqzType this.renderPlains', this.renderPlains)
        })
      }
    },
    $route: {
      handler: function (newVal) {
        console.log('entryMode', this.entryMode)
        const { query, params } = newVal
        this.entryMode = { mode: null } //entryMode.mode 引起 renderPlains tableData重新渲染
        this.plains = []
        this.renderPlains = []
        Object.keys(this.liveInfo).length > 0 && (this.liveInfo = {})
        Object.keys(this.shortInfo).length > 0 && (this.shortInfo = {})
        Object.keys(this.goodsInfo).length > 0 && (this.goodsInfo = {})
        // this.tableData = []
        console.log('$route', newVal)
        //不是直播页面不加载直播弹框避免使用到api的校验文字
        this.isLiveLinkModal = false
        this.inputLink = ''
        this.liveInputLink = ''
        this.shortInputLink = ''
        this.shortLinkError = ''
        this.goodsLinkError = ''
        this.liveLinkError = ''
        //防止京挑客任务到直播任务的责任链延长到short
        this.goodsChain && this.goodsChain.setNext(null)

        this.isCrowdPortrait = false
        this.carryOutConfig = {} //解决京东快车配置遗留进入方式导致其他页面进入方式错乱
        this.$nextTick(function () {
          //等清除缓存数据再渲染新的页面数据
          this.isTaskModal = false
          this.init(params.platForm, params.taskType, query.taskId, query.relatedId)
        })
        window.scrollTo(0, 0)
      },
      immediate: true
    },
    // 触发计划区域和表格区域更新
    'entryMode.mode': function (newVal) {
      console.log('entryMode', newVal)
      this.renderPlains = this.plains.map((item) => {
        console.log('renderPlains', item)
        return deepCopyPlains(
          item,
          newVal,
          this.twoAlgorithmNums,
          this.customArrayNums,
          this.carryOutModeLabel,
          this.carryOutModeNeedHour,
          this.ratioObj
        )
      })
      console.log('entryMode.mode this.renderPlains', this.renderPlains)
    },
    'carryOutConfig.jdKuaiCheType': function (newVal) {
      newVal === 5 ? (this.carryOutConfig.enterType = 1) : (this.carryOutConfig.enterType = 2)
    },
    backprice: {
      handler: async function (newVal) {
        console.log('backprice newVal', newVal)
        const { platForm, taskType } = this.$route.params
        const config = await getReleaseJson(platForm, taskType)
        const { priceList, backPriceProp } = config.index
        if (Object.keys(newVal).length > 0) {
          this.priceContent = setPriceContent(platForm, backPriceProp, JSON.parse(JSON.stringify(newVal)), priceList)
        }
      }, 
      immediate:true
    }
  },
  created() {
    // this.init()
    //链接校验错误提示
    this.pubSub = new PubSub()
    this.pubSub.subscriber('goodsLink', linkRegFn)
    this.pubSub.subscriber('liveLink', linkRegFn)
    this.pubSub.subscriber('shortLink', linkRegFn)
    console.log('pubSub', this.pubSub)
    //信息校验提醒 $message返回的是vueComponents 等同于true
    const $message = this.$message
    this.liveChain = new NextChain(function ({ liveName, text = '' }) {
      const res = liveName === ''
      console.log('liveChain  res', liveName, !res)
      return !(res && $message.error('请添加直播链接之后再点击' + text))
    })
    this.goodsChain = new NextChain(function ({ jdLiveType = 10, goodsTitle, text = '' }) {
      const res = jdLiveType > 1 && [null, ''].includes(goodsTitle)
      console.log('goodsChain  res', jdLiveType, goodsTitle, !res)
      return !(res && $message.error('请添加商品链接之后再点击' + text))
    })
    this.shortChain = new NextChain(function ({ shortInfo, shortInfoLabel, text = '' }) {
      const res = shortInfoLabel && shortInfo && shortInfo.shortUrl === ''
      console.log('shortChain  res', shortInfo, !res)
      return !(res && $message.error('请添加' + shortInfoLabel + '之后再点击' + text))
    })
    // this.getVip()
  },
  mounted() {},
  methods: {
    ...mapMutations([SET_RELATED]),
    inputMaleRatio(val) {
      const newVal = numberContext('numSymbol', val, ['+', '-', '.'])
      this.carryOutConfig.maleRatio = numberContext('minMax', newVal, 0, 100)
    },
    //显示对应的价格
    showPrice(prop, changePrice) {
      return this[prop](changePrice)
    },
    checkShortLinkError(val) {
      const res = this.pubSub.publish('shortLink', val, this.shortCheckObj.error, this.shortCheckObj.reg)
      this.shortLinkError = res[0]
    },
    checkGoodsLinkError(val) {
      console.log('checkGoodsLinkError', this.api.getGoodsInfo.refenceLinkText)
      const res = this.pubSub.publish(
        'goodsLink',
        val,
        {
          nullError: '请输入商品链接',
          regFailError: `<p>链接错误，参考格式：</p><p>${this.api.getGoodsInfo.refenceLinkText}</p>`
        },
        this.api.getGoodsInfo.goodsLinkReg
      )
      this.goodsLinkError = res[0]
      console.log('checkGoodsLinkError', res)
    },
    checkLiveLinkError(val) {
      console.log('checkLiveLinkError', this.api.getJdLiveInfo.refenceLinkText)
      const res = this.pubSub.publish(
        'goodsLink',
        val,
        {
          nullError: '请输入直播链接',
          regFailError: `<p>链接错误，参考格式：</p><p>${this.api.getJdLiveInfo.refenceLinkText}</p>`
        },
        this.api.getJdLiveInfo.liveLinkReg
      )
      this.liveLinkError = res[0]
      console.log('checkLiveLinkError', res)
    },
    async init(platForm, taskType, taskId, relatedId) {
      const configPromise = getReleaseJson(platForm, taskType)
      const config = await configPromise
      console.log('getReleaseJson', config)
      const {
        plainMobal,
        // plains,
        plain,
        plainsProps,
        short,
        live,
        goodsInfo,
        goodsInfoProps,
        entryMode,
        tableProps,
        radioGroup,
        controlArea,
        priceList,
        backPriceProp
      } = config.index
      const {
        options: modalFormOptions,
        formProps: modalFormProps,
        controlArea: modalControlArea,
        assignTabArray: modalAssignTabArray
      } = config.assignModal
      for (let key in controlArea) {
        this[key] = controlArea[key]
      }
      if (short !== undefined) {
        this.shortInfo = short.shortInfo
      }
      if (live !== undefined) {
        this.liveInfo = live.liveInfo
        this.liveInfoProps = live.liveInfoProps
      }
      this.goodsInfo = goodsInfo
      this.goodsInfoProps = goodsInfoProps
      console.log('goodsInfo', goodsInfo)

      this.modalFormOptions = modalFormOptions
      this.modalFormProps = modalFormProps
      this.modalControlArea = modalControlArea
      this.modalAssignTabArray = modalAssignTabArray

      this.carryOutConfig = radioGroup.carryOutConfig
      this.carryOutConfigList = radioGroup.carryOutConfigList

      this.plainMobal = JSON.parse(JSON.stringify(plainMobal))
      console.log('this.plainMobal', this.plainMobal)
      // this.plains = plains.map(item => {
      //   item.form.carryOutDate != undefined &&
      //     (item.form.carryOutDate = datePastHandle(item.form.carryOutDate))
      //   return { ...item, indexSymbol: Date.now() }
      // })
      this.api = config.api
      console.log('config.api', config.api)
      if (taskId !== undefined || relatedId !== undefined) {
        if ([''].includes(relatedId) || [''].includes(taskId)) {
          return this.$message.error('任务编号id或者关联任务id不能为空')
        }
        const { type, singleTaskDetailUrl, relatedTaskDetailUrl, params } = this.api.taskDetail
        let sendIdObj = {}
        let url = taskId ? singleTaskDetailUrl : relatedId && relatedTaskDetailUrl
        taskId && (sendIdObj = { taskId })
        relatedId && (sendIdObj = { relatedId })
        const res = await taskDetail(url, sendIdObj)
        const { code, data, msg } = res.data
        if (code === 200) {
          const receivePlans = data.planParams
          const { shortInfo, liveInfo, goodsInfo, plain, carryOutConfig, enterType, tag } = params
          if (shortInfo !== undefined) {
            if (this.carryOutConfig.jtkType) {
              this.shortInfo.shortUrl = data[shortInfo[0]]
            } else {
              ;[6, 8, 9].includes(data['pttqzType']) && (this.shortInfo.shortUrl = data[shortInfo[data.pttqzType]])
            }
          }
          if (liveInfo !== undefined) {
            for (let key in liveInfo) {
              this.liveInfo[liveInfo[key]] = data[key]
            }
          }
          for (let key in goodsInfo) {
            this.goodsInfo[goodsInfo[key]] = data[key]
          }
          console.log('oneTaskDetail goodsInfo', this.goodsInfo)
          for (let key in carryOutConfig) {
            ![null].includes(data[key]) && (this.carryOutConfig[carryOutConfig[key]] = data[key])
          }
          console.log('oneTaskDetail carryOutConfig', this.carryOutConfig)
          const frontPlainArray = receivePlans.map((item, i) => {
            return analysyPlan(
              item,
              plain,
              this.twoAlgorithmNums,
              this.customArrayNums,
              this.showDateNums,
              this.showTimeNums,
              i
            )
          })
          console.log('frontPlainArray', frontPlainArray)
          console.log('oneTaskDetail data', data)
          this.plains = frontPlainArray
          this.setIndexProps(enterType, entryMode, plainsProps, tableProps, enterType && data['enterType'] - 1)
          if (tag !== undefined) {
            data['tag'] && (this.portraitConfig = data['tag'])
          }
        } else {
          this.setIndexProps(null, entryMode, plainsProps, tableProps)
        }
      } else {
        this.setIndexProps(null, entryMode, plainsProps, tableProps)
      }
    },
    // 决定主页的渲染支付信息表格和计划区域
    setIndexProps(enterTypeProp, entryMode, plainsProps, tableProps, enterTypeData) {
      console.log('plains', this.plains)
      this.plainsProps = plainsProps
      this.setGoodsTitle()
      this.tableProps = tableProps
      // 判断配置json是否显示访问方式 控制plain渲染时机
      entryMode ? (this.entryMode = entryMode) : (this.entryMode = {})
      enterTypeProp && (this.entryMode.mode = enterTypeData)
      console.log('entryMode', this.entryMode)
    },
    //放在this.plainMobal this.plains 完全生成之后
    setGoodsTitle() {
      if (this.goodsInfo.title !== undefined) {
        const title = this.goodsInfo.title
        const observer = new Observer(this.plainMobal)
        const observerArray = new ObserverArray(this.plains)
        this.subject = new Subject()
        this.subject.addObserver(observer)
        this.subject.addObserver(observerArray)
        this.subject.notify({ type: 'goodsTitle', val: title })
      }
    },
    liveLinkCloseCb() {
      this.isLiveLinkModal = false
    },
    linkCloseCb() {
      this.isLinkModal = false
    },
    releaseCloseCb() {
      this.isReleaseModal = false
    },
    payCloseCb() {
      this.isPayModal = false
    },
    taskCloseCb() {
      this.isTaskModal = false
      this.sendPlain = {} // 操作两次同一计划时，让子组件监听sendPlain从而回到最初数据
    },
    // 添加计划弹框点击保存后的数据存入renderPlains和plains
    saveCb(plain) {
      // const currentSymbol = plain.indexSymbol
      // console.log('currentSymbol', currentSymbol)
      // console.log('saveCb plain.form.carryOutMode', plain.form.carryOutMode)
      const renderPlain = deepCopyPlains(
        plain,
        -1,
        this.twoAlgorithmNums,
        this.customArrayNums,
        this.carryOutModeLabel,
        this.carryOutModeNeedHour,
        this.ratioObj
      )
      console.log('saveCb plain', plain)
      console.log('saveCb renderPlain', renderPlain)
      // let currentIndex = null
      // this.plains.forEach((item, index) => {
      //   if (item.indexSymbol == currentSymbol) {
      //     currentIndex = index
      //   }
      // })
      const currentIndex = getPlainsIndex(this.plains, plain.indexSymbol)
      console.log('currentIndex', currentIndex)
      if (currentIndex !== null) {
        this.tableData = { currentIndex, renderPlain } //由于表格组件受到key影响
        this.plains[currentIndex] = plain
      } else {
        this.renderPlains.push(renderPlain)
        this.plains.push(plain)
        // this.tableData.push(renderPlain)
      }
      console.log('renderPlains', this.renderPlains)
    },
    checkInfo(text) {
      if (Object.keys(this.liveInfo).length > 0) {
        this.liveChain.setNext(this.goodsChain)
        const res = this.liveChain.handler({
          liveName: this.liveInfo.liveName,
          jdLiveType: this.carryOutConfig.jdLiveType,
          goodsTitle: this.plainMobal.goodsTitle,
          text
        })
        console.log('liveChain res', res)
        return res
      } else {
        this.goodsChain.setNext(this.shortChain)
        const res = this.goodsChain.handler({
          goodsTitle: this.plainMobal.goodsTitle,
          shortInfo: Object.keys(this.shortInfo).length > 0 && this.shortInfo,
          shortInfoLabel: this.shortInfoLabel,
          text
        })
        console.log('goodsChain res', res)
        return res
      }
    },
    addPlain() {
      if (!this.checkInfo('添加计划')) return
      if (this.plains.length === 5) {
        this.$message.warning('无法再添加，最多可添加5个计划')
        return
      }
      // this.sendPlain = JSON.parse(JSON.stringify(this.plainMobal)) //保证计划模板的固定，避免保存好的内容受其影响
      this.sendPlain = deepCopySendPlainModal(
        this.plainMobal,
        this.entryMode && this.entryMode.mode,
        this.carryOutConfig.pttqzType ? this.carryOutConfig.pttqzType === 1 : this.carryOutConfig.pttqzType
      )
      console.log('addPlain this.sendPlain', this.sendPlain)
      this.isTaskModal = true
    },
    editorPlain(currentSymbol) {
      if (!this.checkInfo('修改计划')) return
      const currentIndex = getPlainsIndex(this.plains, currentSymbol)
      this.sendPlain = deepCopySendPlainModal(this.plains[currentIndex], this.entryMode && this.entryMode.mode)
      // this.sendPlain = this.plains[currentIndex]
      console.log('editorPlain this.sendPlain', this.sendPlain)
      this.isTaskModal = true
    },
    deletePlain(currentSymbol) {
      this.$confirm('是否确认删除计划?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const currentIndex = getPlainsIndex(this.plains, currentSymbol)
        console.log('this.plains[currentIndex]', this.plains[currentIndex])
        this.renderPlains.splice(currentIndex, 1)
        this.plains.splice(currentIndex, 1)
      })
      // this.tableData.splice(currentIndex, 1)
    },
    addShortLink() {
      // const reg = 'https://u.jd.com/\\w+'
      this.checkShortLinkError(this.shortInputLink)
      if (this.shortLinkError === '') {
        this.isShortLinkModal = false
        this.shortInfo.shortUrl = this.shortInputLink
      }
    },
    addLiveLink() {
      // const reg = this.api.getJdLiveInfo.liveLinkReg
      this.checkLiveLinkError(this.liveInputLink)
      if (this.liveLinkError === '') {
        let sendData = {}
        for (let key in this.api.getJdLiveInfo.params) {
          sendData[key] = this.liveInputLink
        }
        this.addLiveLinkLoading = true
        if (this.api.getJdLiveInfo.type === 'get') {
          getGoodsInfo(this.api.getJdLiveInfo.url, sendData)
            .then((res) => {
              console.log('getJdLiveInfo', res)
              const { code, data, msg } = res.data
              if (code === 200) {
                this.liveInfo = { ...data, label: this.liveInfo.label }
                this.isLiveLinkModal = false
              }
            })
            .finally(() => {
              this.addLiveLinkLoading = false
            })
        }
      }
    },
    addGoodsLink() {
      // const reg = this.api.getGoodsInfo.goodsLinkReg
      this.checkGoodsLinkError(this.inputLink)
      if (this.goodsLinkError === '') {
        const taskType = this.$route.params.taskType
        console.log('addGoodsLink', taskType)
        let sendData = {}
        for (let key in this.api.getGoodsInfo.params) {
          sendData[key] = this.inputLink
        }
        this.addGoodsLinkLoading = true
        if (this.api.getGoodsInfo.type === 'get') {
          getGoodsInfo(this.api.getGoodsInfo.url, sendData)
            .then((res) => {
              console.log('getGoodsInfo', res)
              const { code, data, msg } = res.data
              if (code === 200) {
                this.goodsInfo = { ...data, label: this.goodsInfo.label }
                if (taskType === 'noTraffic-click' && data.shopName.includes('拼购')) {
                  this.$message.warning('无痕点击暂不支持京喜店铺商品')
                  return
                }
                if (data.title !== undefined) {
                  const { title } = data
                  this.subject.notify({ type: 'goodsTitle', val: title })
                }
                this.isLinkModal = false
              }
            })
            .finally(() => {
              this.addGoodsLinkLoading = false
            })
        }
      }
    },
    deleteLiveLink() {
      for (let key in this.liveInfo) {
        key !== 'label' && (this.liveInfo[key] = '')
      }
      this.liveInputLink = ''
    },
    deleteGoodsLink() {
      console.log('deleteGoodsLink')
      for (let key in this.goodsInfo) {
        key !== 'label' && (this.goodsInfo[key] = '')
      }
      this.inputLink = ''
      this.subject.notify({ type: 'goodsTitle', val: '' })
    },
    //点击保存 检查信息 前端转后端格式处理 发出保存请求
    async saveAllPlain() {
      if (!this.checkInfo('保存')) return
      if (this.plains.length === 0) {
        this.$message.error('请添加至少一个计划后点击保存')
        return
      }
      this.isSendSaveLoading = true
      const sendData = this.sendDataHandle()
      console.log('saveAllPlain sendData', JSON.stringify(sendData))
      const data = await this.postSaveTask(sendData)
      this.$route.query.relatedId && this.SET_RELATED({ path: this.$route.path, relatedId: data.relatedId })
      this.accountInfo = data
      console.log('saveAllPlain data', data)
      this.$message.success('保存成功')
      console.log('saveAllPlain this.plains[0]', this.plains[0])
    },
    //构建发布页面所有的内容的后端格式
    sendDataHandle() {
      let sendData = {}
      const goodsInfo = this.api.saveAllPlain.params.goodsInfo
      if (goodsInfo !== undefined) {
        for (let key in goodsInfo) {
          sendData[key] = this.goodsInfo[goodsInfo[key]]
        }
      }
      const liveInfo = this.api.saveAllPlain.params.liveInfo
      if (liveInfo !== undefined) {
        for (let key in liveInfo) {
          sendData[key] = this.liveInfo[liveInfo[key]]
        }
      }
      const shortInfo = this.api.saveAllPlain.params.shortInfo
      if (shortInfo !== undefined) {
        if (this.carryOutConfig.jtkType) {
          sendData[shortInfo[0]] = this.shortInfo.shortUrl
        }
        if (this.carryOutConfig.pttqzType && [6, 8, 9].includes(this.carryOutConfig.pttqzType)) {
          sendData[shortInfo[this.carryOutConfig.pttqzType]] = this.shortInfo.shortUrl
        }
      }
      const plainArray = this.plains.map((item) => {
        return sendBackPlan(
          item,
          this.api.saveAllPlain.params.plain,
          this.twoAlgorithmNums,
          this.customArrayNums,
          this.showDateNums,
          this.showTimeNums,
          this.carryOutModeNeedHour
        )
      })
      // let carryOutConfig = JSON.parse(JSON.stringify(this.carryOutConfig))
      // for (let key in carryOutConfig) {
      //   carryOutConfig[key] < 0 && delete carryOutConfig[key]
      // }
      console.log('sendDataHandle carryOutConfig', this.carryOutConfig)
      if ([null, undefined].includes(this.entryMode.mode)) {
        sendData = {
          planParams: plainArray,
          ...sendData,
          ...this.carryOutConfig
        }
      } else {
        // 只有选择了搜索才去发送配置项
        const enterType = this.entryMode.mode + 1
        const carryOutConfig = enterType > 1 && this.carryOutConfig
        console.log('sendDataHandle enterType carryOutConfig', carryOutConfig)
        sendData = {
          enterType,
          planParams: plainArray,
          ...sendData,
          ...carryOutConfig
        }
        console.log('sendDataHandle sendData', sendData)
      }
      const tag = this.api.saveAllPlain.params.tag
      if (tag !== undefined) {
        sendData['tag'] = this.portraitConfig
      }
      console.log('sendData', sendData)
      return sendData
    },
    //发送数据给后端保存
    postSaveTask(sendData) {
      return new Promise((resolve, reject) => {
        if (this.api.saveAllPlain.type === 'post') {
          saveTask(this.api.saveAllPlain.url, sendData)
            .then((res) => {
              const { code, data, msg } = res.data
              if (code === 200) {
                resolve(data)
              }
            })
            .finally(() => {
              this.isSendSaveLoading = false
              this.isSendReleaseLoading = false
            })
        }
      })
    },
    //点击发布 检查信息 前端转后端格式处理 发出保存请求 根据余额是否充足来显示不同的弹框
    async releaseAllTask() {
      if (!this.checkInfo('去发布')) return
      if (this.plains.length === 0) {
        this.$message.error('请添加至少一个计划后点击去发布')
        return
      }
      this.isSendReleaseLoading = true
      const sendData = this.sendDataHandle()
      console.log('releaseAllTask sendData', JSON.stringify(sendData))
      const data = await this.postSaveTask(sendData)
      this.$route.query.relatedId && this.SET_RELATED({ path: this.$route.path, relatedId: data.relatedId })
      this.accountInfo = data
      this.$message.success('保存成功')
      console.log('releaseAllTask this.plains[0]', this.plains[0])
      console.log('accountInfo', data)
      if (this.accountInfo.enough) {
        this.isReleaseModal = true
      } else {
        this.isTopUpModal = true
      }
    },
    onGetPayMoney() {
      this.isPayLoading = true
      const sendData = {
        taskIds: this.accountInfo.ids
      }
      if (this.api.payMoney.type === 'get') {
        payMoney(this.api.payMoney.url, sendData)
          .then((res) => {
            const { code, data, msg } = res.data
            if (code === 200) {
              this.isReleaseModal = false
              this.isPayModal = true
            }
            console.log('onGetPayMoney', data)
          })
          .finally(() => {
            this.isPayLoading = false
          })
      }
    },
    onJumpMyTask() {
      this.$router.push({ path: '/flow/myTask', query: { flowType: 2 } })
      this.isPayModal = false
      window.scroll(0, 0)
    }
  }
}
</script>

<style lang="scss" scoped>
$operation-color: #60a2fb;
$area-header-bgcolor: #ececec;
@mixin baseSection {
  padding: 20px 34px 12px;
  background: white;
  margin-bottom: 10px;
  border-radius: 10px;
  box-shadow: 0px 3px 24px 0px rgba(200, 200, 200, 0.22);
  .title {
    font-weight: bold;
    font-size: 16px;
  }
}
@mixin backgroundButton {
  &.el-button {
    color: white;
    background-color: $theme-color;
    border-radius: 15px;
    padding: 9px 14px;
  }
}
@mixin borderButton {
  &.el-button {
    color: $theme-color;
    border: 1px solid $theme-color;
    border-radius: 15px;
    padding: 9px 14px;
  }
}
.release-traffic {
  background: rgb(244, 244, 244);
  // min-height: 100vh;
  color: #333333;
  font-size: 14px;
  .star {
    font-size: 18px;
    color: #ff0000;
    vertical-align: middle;
  }
  .container {
    width: 100%;
    margin: 0 auto;
    .task-header {
      padding-left: 38px;
      background-color: white;
      span {
        position: relative;
        line-height: 300%;
        font-size: 14px;
        cursor: pointer;
        &.--active {
          color: $theme-color;
          font-weight: bold;
        }
        &.--active::before {
          position: absolute;
          content: '';
          top: 150%;
          left: 50%;
          transform: translateX(-50%);
          width: 75%;
          height: 2px;
          background: $theme-color;
        }
      }
      span:nth-child(2) {
        margin-left: 72px;
      }
    }
    .task-order {
      font-size: 14px;
      line-height: 150%;
      .order-introdution {
        @include baseSection;
        background: #fdfdfd;
        box-shadow: inset 0px 3px 24px 0px #f8f8f8;
        .no-markedness {
          display: flex;
          width: 890px;
          .title {
            font-size: 14px;
            width: 9%;
          }
          .explain {
            width: 81%;
          }
        }
        .markedness {
          font-weight: bold;
          color: $theme-color;
        }
      }
      .shop-link {
        @include baseSection;
        .live-goods {
          margin-top: 10px;
          .add-link {
            margin-left: 22px;
          }
        }
        /deep/ .add-link {
          @include backgroundButton;
          margin-left: 10px;
          margin-bottom: 10px;
        }
        .link {
          display: flex;
          justify-content: space-between;
          align-items: center;
          /deep/ .detele {
            @include borderButton;
            &.el-button {
              padding: 7px 23px;
            }
          }
        }
        .flex {
          display: flex;
          width: 900px;
          .label {
            // width: 100px;
            flex: 1;
            // text-align: right;
            .nbsp {
              font-size: 18px;
            }
          }
          .content {
            flex: 8;
            // width: 800px;
          }
        }
        .entry-mode {
          .content {
            // line-height: 250%;
            // margin-top: 10px;
            display: flex;
            align-items: center;
          }
          .el-radio-group {
            width: 60%;
            margin-left: 15px;
            label {
              width: 20%;
            }
          }
          /deep/ .el-radio__inner {
            width: 16px;
            height: 16px;
          }
          /deep/ .el-radio__inner:after {
            width: 8px;
            height: 8px;
          }
        }
        .task-type {
          .content {
            // line-height: 250%;
            // margin-top: 10px;
            display: flex;
            align-items: center;
            .el-select {
              margin-left: 5px;
              width: 30%;
            }
          }
        }
      }
      .carryout-plain {
        @include baseSection;
        padding: 20px 20px 12px;
        .header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 6px;
          margin-left: 14px;
          .max {
            color: #999999;
            font-size: 12px;
          }
          /deep/ .add-plain {
            @include borderButton;
            &.el-button {
              padding: 7px 12px;
              border-radius: 13px;
            }
          }
        }
        .plain-description {
          margin-bottom: 10px;
          .title {
            display: flex;
            font-weight: bold;
            justify-content: space-between;
            align-items: center;
            padding-left: 14px;
            background: $area-header-bgcolor;
            border-radius: 10px 10px 0 0;
            /deep/ .editor {
              &.el-button {
                color: $operation-color;
              }
            }
            /deep/ .delete {
              &.el-button {
                color: $operation-color;
                margin-right: 20px;
              }
            }
          }
          .content {
            display: flex;
            flex-wrap: wrap;
            padding: 10px 20px;
            background-color: #fafafa;
            border-radius: 0 0 10px 10px;
            span {
              width: 33%;
              line-height: 180%;
            }
            span:empty {
              width: 0;
            }
          }
        }
      }
      .carryout-config {
        @include baseSection;
        .title {
          margin-bottom: 10px;
        }
        .flex-group {
          display: flex;
          line-height: 250%;
          .label {
            margin-right: 5px;
          }
          .group {
            width: 87%;
            .group-item {
              display: flex;
              align-items: center;
              width: 100%;
              /deep/ .el-radio-group {
                width: 100%;
                span {
                  line-height: 250%;
                }
                label {
                  width: 15%;
                }
                .el-radio__inner {
                  width: 16px;
                  height: 16px;
                  vertical-align: middle;
                }
                .el-radio__inner:after {
                  width: 8px;
                  height: 8px;
                }
              }
              .input-group-item {
                display: flex;
                &:first-child {
                  margin-right: 75px;
                }
                .input-group-item_span {
                  width: 45px;
                }
                .input-group-item_input {
                  width: 60px;
                  position: relative;
                  &::after {
                    position: absolute;
                    content: '%';
                    top: 0;
                    right: 5px;
                  }
                }
              }
            }
          }
        }
        // .content {
        //   display: flex;
        //   line-height: 250%;
        //   align-items: center;
        // }
        // .el-radio-group {
        //   width: 60%;
        //   label {
        //     width: 20%;
        //   }
        // }
      }
      .character-portrait {
        @include baseSection;
        padding: 20px 20px 12px;
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
          margin-left: 14px;
          .title {
            vertical-align: middle;
          }
          .spread {
            @include borderButton;
            border-radius: 13px;
            padding: 7px 19px;
          }
          .pack-up {
            @include borderButton;
          }
          i {
            color: $theme-color;
            font-size: 16px;
          }
        }
      }
      .one-price {
        @include baseSection;
        .title {
          margin-bottom: 20px;
        }
        .content {
          margin-bottom: 16px;
        }
      }
      /deep/ .payment-information {
        @include baseSection;
        padding: 20px 20px 12px;
        .title {
          margin-left: 14px;
          margin-bottom: 10px;
        }
        .table {
          width: 100%;
          border-bottom: 0px;
          &.el-table::before {
            background-color: white;
          }
          td {
            border: 0;
          }
          .el-table__header-wrapper {
            border-radius: 10px 10px 0 0;
          }
          .has-gutter tr th {
            color: #999999;
            background-color: $area-header-bgcolor;
          }
          tbody {
            color: #333333;
            .el-table__row--striped {
              background-color: #f8f8f8;
            }
          }
        }
        .calculation {
          text-align: end;
          margin: 20px 0 30px;
          .text {
            margin-left: 15px;
          }
          .num {
            color: $theme-color;
          }
        }
        .operation {
          text-align: end;
          /deep/ .save {
            @include borderButton;
            vertical-align: middle;
            &.el-button {
              padding: 9px 16px;
            }
          }
          /deep/ .release {
            @include backgroundButton;
            &.el-button {
              padding: 9px 16px;
            }
          }
        }
      }
    }
  }
}
</style>
