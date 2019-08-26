import Vue from 'vue';
import VueRouter from 'vue-router';
// import menus from '@/config/menu-config';

Vue.use(VueRouter);

const routes = [];

routes.push({
    path: '/',
    redirect: `/${menus[0].subs[0].componentName}`
});

// menus.forEach((menu) => {
//     menu.subs.forEach(sub => {
//         routes.push({
//             path: `/${sub.componentName}`,
//             name: sub.componentName,
//             component: () => import(`@/views/${sub.componentName}`)
//         });
//     })
// });

routes.push({
    path: '*',
    component: () => import(`@/views/404`)
});

const router = new VueRouter({ routes });

router.beforeEach((to, from, next) => {
    next();
})

export default router;
