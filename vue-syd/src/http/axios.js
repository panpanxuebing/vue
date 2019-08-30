import axios from 'axios'
import config from './config'

export default function $axios(options) {
    return new Promise((resolve, reject) => {
        const instance = axios.create({
            baseURL: config.baseUrl,
            headers: config.headers,
            timeout: config.timeout,
            withCredentials: config.withCredentials
        })
        
        // request 拦截器
        instance.interceptors.request.use(
            config => {
                if(config.method === 'post') {

                }
                return config
            },
            error => {
                // 1. 判断请求超时
                if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
                    console.log('timeout请求超时')
                    // return service.request(originalRequest)// 再重复请求一次
                }
                // 2. 需要重定向到错误页面
                const errorInfo = error.response
                console.log(errorInfo)
                if (errorInfo) {
                    // 页面那边catch的时候就能拿到详细的错误信息,看最下边的Promise.reject
                    error = errorInfo.data 
                    // 404 403 500 ...
                    const errorStatus = errorInfo.status
                    router.push({
                        path: `/error/${errorStatus}`
                    })
                }
                // 在调用的那边可以拿到(catch)你想返回的错误信息
                return Promise.reject(error)
            }
        )

        // request 拦截器
        instance.interceptors.response.use(
            response => {
                let data
                // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
                if (response.data == undefined) {
                    data = JSON.parse(response.request.responseText)
                } else {
                    data = response.data
                }

                return data
            },
            err => {
                if(err && err.response) {
                    switch (err.response.status) {
                        case 400:
                            err.message = '请求错误'
                            break
                        case 401:
                            err.message = '未授权，请登录'
                            break
                        case 403:
                            err.message = '拒绝访问'
                            break
                        case 404:
                            err.message = `请求地址出错: ${err.response.config.url}`
                            break
                        case 408:
                            err.message = '请求超时'
                            break
                        case 500:
                            err.message = '服务器内部错误'
                            break
                        case 501:
                            err.message = '服务未实现'
                            break
                        case 502:
                            err.message = '网关错误'
                            break
                        case 503:
                            err.message = '服务不可用'
                            break
                        case 504:
                            err.message = '网关超时'
                            break
                        case 505:
                            err.message = 'HTTP版本不受支持'
                            break
                        default:
                    }
                }
                console.error(err)
                // 返回接口返回的错误信息
                return Promise.reject(err)
            }
        )

        // 请求处理
        instance(options).then(res => {
            resolve(res)
            return false
        }).catch(error => {
            reject(error)
        })
    })

}