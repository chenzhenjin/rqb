/*
 * @Author: chenzhenjin
 * @email: BrotherStudy@163.com
 * @Date: 2020-07-03 16:54:08
 * @LastEditTime: 2020-10-29 16:49:51
 * @Descripttion: 完善线上环境域名又有新增项目目录访问json
 */

 //为了让json走url-loader处理，并不直接使用，处理好的文件是放在static/json目录下，axios.get请求时注意
import '@/assets/json/jd/jd-choose-guest.json';
import '@/assets/json/jd/jd-express-train.json';
import '@/assets/json/jd/jd-goods-addBuy.json';
import '@/assets/json/jd/jd-goods-collection.json';
import '@/assets/json/jd/jd-goods-pre.json';
import '@/assets/json/jd/jd-live-stream.json';
import '@/assets/json/jd/jd-noTraffic-click.json';
import '@/assets/json/jd/jd-popular-rank.json';
import '@/assets/json/jd/jd-shop-attention.json';
import '@/assets/json/jd/jd-spike-reminder.json';
import '@/assets/json/jd/jd-traffic-click.json';
import '@/assets/json/pdd/pdd-goods-collection.json';
import '@/assets/json/pdd/pdd-popular-rank.json';
import '@/assets/json/pdd/pdd-shop-attention.json';
import '@/assets/json/pdd/pdd-traffic-click.json';
import '@/assets/json/tb/tb-goods-addBuy.json';
import '@/assets/json/tb/tb-goods-collection.json';
import '@/assets/json/tb/tb-ordinary-naughty.json';
import '@/assets/json/tb/tb-popular-rank.json';
import '@/assets/json/tb/tb-receive-coupons.json';
import '@/assets/json/tb/tb-shop-attention.json';
import '@/assets/json/tb/tb-traffic-click.json';

import axios from 'axios'
/**
 * @description: 获取本地对发布流量不同平台json获取后处理回相应任务的json配置
 * @param {string} platForm
 * @param {string} taskType
 * @return {Function} Promise
 */

export const getReleaseJson = function(platForm, taskType) {
  return new Promise((resolve, reject) => {
    let rootPath = './' //当前访问的域名+项目目录
    axios({
      method: 'get',
      url: rootPath + 'json/' + platForm + '-' + taskType + '.json?random='+new Date().getTime(),
      dataType: "json",
      crossDomain: true,
      cache: false
    }).then(res => {
      const { data, status } = res
      if (status === 200) {
        resolve(data)
      }
    })
  })
}
