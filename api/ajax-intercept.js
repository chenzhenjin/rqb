/*
 * @Author: chenzhenjin
 * @email: BrotherStudy@163.com
 * @Date: 2020-09-04 10:35:40
 * @LastEditTime: 2020-09-14 15:44:08
 * @Descripttion: axios拦截器
 */
import axios from 'axios';
import $message from './message.js'
let pendingAjax = []
const fastClickTip = "数据正在请求，请勿重复点击/页面加载周期内有相同请求"
const CancelToken = axios.CancelToken
const removePendingAjax = (url, type) => {
  const index = pendingAjax.findIndex(i=> i.url === url)
  if(index> -1){
    //取消i上个请求
    type === 'req' && pendingAjax[index].c(fastClickTip)
    pendingAjax.splice(index, 1)
  }
}
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // console.log('interceptors config', config)
  const url = config.url
  //如果遇到重复请求，取消上个请求，同时加入这次请求进入pendingAjax中，就是确保最后一次请求执行
  removePendingAjax(url, 'req')
  config.cancelToken = new CancelToken(c=>{
    pendingAjax.push({
      url, c
    })
  }) 
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  removePendingAjax(response.config.url, 'resp')
  const { code, msg } = response.data
  // console.log('response', response)
  if(code !== undefined && ![200, 2003].includes(code)){
    msg && $message.error(msg)
  }
  return response;
}, function (error) {
  // 对响应错误做点什么
  console.log('response error', error)
  error.message !== fastClickTip && $message.error('网络异常')
  return Promise.reject(error);
});
export default axios;