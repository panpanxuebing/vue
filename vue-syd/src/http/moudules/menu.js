import axios from '../axios'

/**
 * 菜单管理模块
 */

export const findMenuTree = () => {
    return axios({
        url: '/getMenus.jspa',
        method: 'get'
    })
}