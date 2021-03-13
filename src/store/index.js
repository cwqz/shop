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
       
        isSale: false,
        isPersonal: false,
        saleOrPersonal: false,
        searchFlag: false,

    },
    mutations: {
        // 修改token
        INIT_CURRENTHR(state, token) {
            state.currentUser = token;
        },
        // 修改路由
        initRoutes(state, data) {
            state.routes = data;
        },
        CHANGE_IS_SALE(state, isSale) {
            state.isSale = isSale
            state.saleOrPersonal = isSale
        },
        CHANGE_IS_PERSONAL(state, isPersonal) {
            state.isPersonal = isPersonal
            state.saleOrPersonal = !isPersonal
        },
        CHANGE_SEARCH_FLAG(state,searchFlag){
            state.searchFlag = searchFlag
        }

    },
    actions: {},
    modules: {}
});
