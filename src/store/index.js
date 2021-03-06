import Vue from "vue";
import Vuex from "vuex";

// 使用Vuex
Vue.use(Vuex);

export default new Vuex.Store({
    // 初始状态的值
    state: {
        // 路由
        routes: [],
        // 存储token，读取当前的token值,跳转路由时确保有token存在
        currentUser: JSON.parse(window.sessionStorage.getItem("token")),
        topLoginName: '登录',
    },
    mutations: {
        // 修改token
        INIT_CURRENTHR(state, token) {
            state.currentUser = token;
            state.topLoginName = '欢迎您，' + token.username
        },
        // 修改路由
        initRoutes(state, data) {
            state.routes = data;
        }
    },
    actions: {},
    modules: {}
});