import Vue from 'vue'
import VueRouter from 'vue-router'
import api from '@/http/api'
import Home from '@/views/Home'
import NotFound from '@/views/Error/404'
// import menus from '@/config/menu-config'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [{
        path: '/',
        name: '首页',
        component: Home,
        children: []
    }, {
        path: '/404',
        name: 'notFound',
        component: NotFound
    }]
});

// menus.forEach((menu) => {
//     menu.subs.forEach(sub => {
//         routes.push({
//             path: `/${sub.componentName}`,
//             name: sub.componentName,
//             component: () => import(`@/views/${sub.componentName}`)
//         })
//     })
// })

router.beforeEach((to, from, next) => {
    // 加载动态菜单和路由
    addDynamicMenuAndRoutes(to, from)
    next()
})


/**
* 加载动态菜单和路由
*/
function addDynamicMenuAndRoutes(to, from) {
    api.menu.findMenuTree()
    .then(res => {
        // 处理菜单树
        const menuList = handleMenuTree(res);
        console.log(menuList)
        // 添加动态路由
        let dynamicRoutes = addDynamicRoutes(menuList)

        debugger
        router.options.routes[0].children = router.options.routes[0].children.concat(dynamicRoutes)
        router.addRoutes(router.options.routes)
        // 保存菜单树
        store.commit('saveMenuTree', menuList);
    })
    .catch(res => {})
}

/**
 * 处理菜单数据
 * @param {Array} menuList 菜单列表
 */
function handleMenuTree(menuList = []) {
    if(menuList.length === 0) return;
    
    
    const parentMenus = menuList.filter(item => !item.pid)
    const childMenus = menuList.filter(item => item.pid)

    childMenus.forEach(item => {
        const pMenu = parentMenus.find(menu => item.pid === menu.id)

        if(!pMenu.children) {
            pMenu.children = []
        }

        if(pMenu) {
            const url = item.url.replace(/(^view\/)|(\.html$)/g, '')

            pMenu.children.push({
                name: item.text,
                url
            })
        }
    })
    
    const menus = parentMenus.map(item => {
        return {
            id: item.id,
            name: item.text,
            children: item.children
        }
    })

    return menus
}

/**
* 添加动态(菜单)路由
* @param {*} menuList 菜单列表
* @param {*} routes 递归创建的动态(菜单)路由
*/
function addDynamicRoutes(menuList = [], routes = []) {
    let temp = []

    for(let item of menuList) {
        if(item.children && item.children.length >= 1) {
            temp = [...item.children]
        } else if(item.url && /\S/.test(item.url)) {
            const route = {
                path: item.url,
                component: null,
                name: item.name,
                meta: {
                    icon: item.icon,
                    index: item.id
                }
            }

            route.component = resolve => require([`@/views/${url}`], resolve)
            routes.push(route)
        }

        if(temp.length > 0) {
            addDynamicRoutes(temp, routes)
        }

        return routes
    }
}

export default router
