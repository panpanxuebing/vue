import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';
import router from './router';
import store from './store';
// import { Button, Select, Option, Row, Menu, Submenu, Col } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/styles/index.css';

Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };
Vue.use(ElementUI);
// Vue.use(Button);
// Vue.use(Select);
// Vue.use(Option);
// Vue.use(Row);
// Vue.use(Menu);
// Vue.use(Col);

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');