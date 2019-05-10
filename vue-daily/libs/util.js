import axios from 'axios';

// 基本配置
const Util = {
    imgPath: 'http://127.0.0.1:8011/img/',
    apiPath: 'http://127.0.0.1:8010/'
}

// 获取前一天的日期
Util.getTodayTime = function() {
    const date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date.getTime();
}

// 日期补0
function zeroize(v) {
    return v < 10 ? '0' + v : v;
}

// 获取前一天的日期
Util.getPrevDay = function(timestamp = (new Date()).getTime()) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = zeroize(date.getMonth() + 1);
    const day = zeroize(date.getDate());
    return year + '' + month + '' + day;
}

// Ajax 通用配置
Util.ajax = axios.create({
    baseURL: Util.apiPath
})

// 添加响应拦截器
Util.ajax.interceptors.response.use(res => {
    return res.data;
})

export default Util;