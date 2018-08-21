import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app.vue';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import Routers from './router/router.js';
import 'babel-polyfill';
import Vuex from 'vuex';
import store from './store/store.js';
import 'babel-polyfill';
import $ from 'jquery';
Vue.use(VueRouter);
Vue.use(iView);
// The routing configuration
const RouterConfig = {
    // 使用 HTML5 的 History 路由模式
    routes: Routers
};
const router = new VueRouter(RouterConfig);
router.beforeEach((to, from, next) => {
    window.document.title = '天华星航备份软件';
    next();
});

router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
});
new Vue({
    el: '#app',
   router:router,
   store:store, 
    render: h => h(App)
});