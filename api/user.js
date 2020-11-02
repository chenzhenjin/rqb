import {
  ajaxGet,
  ajaxPost
} from "../assets/js/ajax";
import config from "../commonComponent/config";
import {
  addCookie,
  removeCookie
} from "../assets/js/cookie";

/**
 * 登录接口
 * @params String phoneNumber
 * @params String username
 * @params String password
 * @params String verificationCode
 * @params String shareId
 */
export const login = (params = {}) => {
  return new Promise((resolve, reject) => {
    ajaxPost(config.serverUrl + 'yushu-server/login', params)
      .then(res => {
        if (res.data.code === 200) {
          addCookie('token', res.data.data.token, 9999);
          addCookie('username', res.data.data.username, 9999);
        }
        resolve(res);
      })
      .catch(err => reject(err))
  })
};
/**
 * 手机登录接口
 * @params String phoneNumber
 * @params String username
 * @params String password
 */
export const loginPhone = (params = {}) => {
  return new Promise((resolve, reject) => {
    ajaxPost(config.serverUrl + 'yushu-server/newLogin', params)
      .then(res => {
        if (res.data.code === 200) {
          addCookie('token', res.data.data.token, 9999);
          addCookie('username', res.data.data.username, 9999);
        }
        resolve(res);
      })
      .catch(err => reject(err))
  })
};
/**
 * 用户注册
 * @params password
 * @params phoneNumber
 * @params invitationCode
 * @params shareId
 * @params shopUrl
 * @params username
 * @params verificationCode
 */
export const register = ( params = {} ) => {
  return ajaxPost(config.serverUrl + 'yushu-server/rqbRegister', params);
};
/**
 * 检查登陆
 */
export const checkLogin = () => {
  return ajaxGet(config.serverUrl + 'yushu-server/checkLogin');
};

/**
 * 登出接口
 */
export const logout = () => {
  return new Promise((resolve, reject) => {
    ajaxGet(config.serverUrl + 'yushu-server/logout').then(res => {
      if (res.data.code === 200 || res.data.code === 2003) {
        removeCookie('token');
        removeCookie('username');
      }
      resolve(res);
    }).catch(err => reject(err))
  })
};

/**
 * 获取短信验证码
 * @params String phoneNumber
 */
export const getVerificationCode = (params = {}) => {
  return ajaxGet(config.serverUrl + 'yushu-server/msg/getVerificationCode', params);
};

/**
 * 校验验证码
 * @params String phoneNumber
 * @params Number code
 */
export const checkVerificationCode = (params = {}) => {
  return ajaxPost(config.serverUrl + 'yushu-server/checkVerificationCodeForPassword', params);
};
/**
 * 找回密码,验证码接口
 * @params String phoneNumber
 */
export const getFindPasswordCode = (params = {}) => {
  return ajaxGet(config.serverUrl + 'yushu-server/msg/getFindPasswordCode', params);
};

/**
 * 找回密码接口
 * @params String phoneNumber
 * @params String verificationCode
 * @params String newPassword
 */
export const findPassword = (params = {}) => {
  return ajaxPost(config.serverUrl + 'yushu-server/findPassword', params);
};

/**
 * 获取用户会员折扣
 * @params String phoneNumber
 * @params String verificationCode
 * @params String newPassword
 */
export const getVipUser = (params = {}) => {
  return ajaxGet(config.serverUrl + 'yushu-server/getVipUser', params);
};

/**
 * 获取运营展示二维码
 */
export const getQRCode = (params = {}) => {
  return ajaxGet(config.serverUrl + 'yushu-operation/qrCode/getQRCode', params);
};

/**
 * 获取BD二维码图片
 */
export const getQRCodeInvication = (params = {}) => {
  return ajaxGet(config.serverUrl + 'yushu-operation/qrCodeInvication/getQRCodeInvication', params);
};

/**
 * 阿明工具跳转
 */
export const redirectMingTool = (params = {}) => {
  return ajaxGet(config.serverUrl + 'yushu-server/general/redirectMingTool', params);
};

/**
 * 获取人气宝个人中心信息
 */
export const getRqbUserInfo = (params = {}) => {
  return ajaxGet(config.serverUrl + 'yushu-server/getRqbUserInfo', params);
};

/**
 * 获取人气宝个人中心信息
 */
export const updateBindShop = (params = {}) => {
  return ajaxPost(config.serverUrl + 'yushu-server/updateBindShop', params);
};
