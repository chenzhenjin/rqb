/*
 * @Author: chenzhenjin
 * @email: BrotherStudy@163.com
 * @Date: 2020-06-08 16:02:14
 * @LastEditTime: 2020-09-04 10:37:29
 * @Descripttion: 增强axios
 */
import axios from './ajax-intercept.js';
import config from "../../commonComponent/config";
import {getCookie} from "./cookie";
const CryptoJS = require('crypto-js');
import {Encrypt} from "./secret";
const SecurityKey = CryptoJS.MD5(Math.round(new Date() / 1000).toString().slice(1)).toString();
axios.defaults.withCredentials = true;
export const ajaxGet = (url = "", params = {},) => {
    let token = getCookie('token') ? getCookie('token') : '';
    return axios({
        method: "GET",
        url,
        params,
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "token": token,
            "os-type": config.osType,
            SecurityKey,
            SecurityCode:Encrypt(SecurityKey),
        },
    })
};

export const ajaxPost = (url, params) => {
    let token = getCookie('token') ? getCookie('token') : '';
    return axios({
        method: "POST",
        url,
        data: params,
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "token": token,
            "os-type": config.osType,
            SecurityKey,
            SecurityCode:Encrypt(SecurityKey),
        },
    })
};
