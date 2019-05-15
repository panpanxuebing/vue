import Vue from "vue";
import Router from "vue-router";
import { notification } from "ant-design-vue";
import findLast from "lodash/findLast";
import NotFound from "./views/404";
import Forbidden from "./views/403";
import NProgess from "nprogress";
import "nprogress/nprogress.css";
import { check, isLogin } from "./util/auth";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/user",
      hideInMenu: true,
      component: () =>
        import(/* webpackChunkName: "layout" */ "./layouts/UserLayout.vue"),
      children: [
        {
          path: "/user",
          redirect: "/user/login"
        },
        {
          path: "/user/login",
          name: "login",
          component: () =>
            import(/* webpackChunkName: "login" */ "./views/User/Login.vue")
        },
        {
          path: "/user/register",
          name: "register",
          component: () =>
            import(/* webpackChunkName: "register" */ "./views/User/Register.vue")
        }
      ]
    },
    {
      path: "/",
      meta: { authority: ["user", "admin"] },
      component: () =>
        import(/* webpackChunkName: "dashboard" */ "./layouts/BasicLayout.vue"),
      children: [
        {
          path: "/",
          redirect: "/dashboard/analysis"
        },
        {
          path: "/dashboard",
          name: "dashboard",
          meta: { icon: "dashboard", title: "仪表盘" },
          component: { render: h => h("router-view") },
          children: [
            {
              path: "/dashboard/analysis",
              name: "analysis",
              meta: { title: "分析页" },
              component: () =>
                import(/* webpackChunkName: "dashboard" */ "./views/Dashboard/Analysis.vue")
            }
          ]
        }
      ]
    },
    {
      path: "/form",
      name: "form",
      meta: { icon: "form", title: "表单", authority: ["admin"] },
      component: () =>
        import(/* webpackChunkName: "dashboard" */ "./layouts/BasicLayout.vue"),
      children: [
        {
          path: "/form/basic-form",
          name: "basicForm",
          meta: { title: "基础表单" },
          component: () =>
            import(/* webpackChunkName: "basicForm" */ "./views/Forms/BasicForm.vue")
        },
        {
          path: "/form/step-form",
          name: "stepform",
          hideChildrenInMenu: true,
          meta: { title: "分布表单" },
          component: () =>
            import(/* webpackChunkName: "form" */ "./views/Forms/StepForm"),
          children: [
            {
              path: "/form/step-form",
              redirect: "/form/step-form/info"
            },
            {
              path: "/form/step-form/info",
              name: "info",
              component: () =>
                import(/* webpackChunkName: "form" */ "./views/Forms/StepForm/Step1.vue")
            },
            {
              path: "/form/step-form/confirm",
              name: "confirm",
              component: () =>
                import(/* webpackChunkName: "form" */ "./views/Forms/StepForm/Step2.vue")
            },
            {
              path: "/form/step-form/result",
              name: "result",
              component: () =>
                import(/* webpackChunkName: "form" */ "./views/Forms/StepForm/Step3.vue")
            }
          ]
        }
      ]
    },
    {
      path: "/403",
      name: "403",
      hideInMenu: true,
      component: Forbidden
    },
    {
      path: "*",
      name: "404",
      hideInMenu: true,
      component: NotFound
    }
  ]
});

router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  if (to.path !== from.path) {
    NProgess.start();
  }
  const record = findLast(to.matched, record => record.meta.authority);
  if (record && !check(record.meta.authority)) {
    if (!isLogin() && record.path !== "/user/login") {
      next({
        path: "/user/login"
      });
    } else {
      next({
        path: "/403"
      });
      notification.error({
        message: "403",
        description: "您没有访问权限，请联系管理员。"
      });
    }
    NProgess.done();
  }
  next();
});

router.afterEach(() => {
  NProgess.done();
});

export default router;
