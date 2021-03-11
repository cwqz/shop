import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Axios from "axios";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import echarts from "echarts";

Vue.use(ElementUI);
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;

// axios引用
import { postRequest } from "./utils/request";
import { putRequest } from "./utils/request";
import { deleteRequest } from "./utils/request";
import { getRequest } from "./utils/request";
import { postKeyValueRequest } from "./utils/request";
Vue.prototype.getRequest = getRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.postRequest = postRequest;
Vue.prototype.postKeyValueRequest = postKeyValueRequest;
// 导入阿里矢量图标库
import "./assets/icon/iconfont.css";

// 动态路由初始化
import { initMenu } from "./utils/menu";

// 公共样式
import './assets/css/common.css';

// 文件上传下载
import "./vendor/Blob.js";
import "./vendor/Export2Excel.js"

// 加载动画
import pageLoading from "./loading/pageLoading"
import tableLoading from "./loading/tableLoading"
Vue.component("pageLoading",pageLoading);
Vue.component("tableLoading",tableLoading)

// 时间戳转换为时间
Vue.prototype.formatDate = function(row, column, cellValue){
    if(cellValue!=null){
        var date = new Date(cellValue);
        var YY = date.getFullYear() + '-';
        var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
        var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        return YY + MM + DD +" "+hh + mm + ss;
    }else {
        return
    }
}


// 路由导航守卫
router.beforeEach((to, from, next) => {
        // 要跳转到登录页
        if (to.path === '/' || to.path === '/register') {
            next();
            return;
        } else {
            if (window.sessionStorage.getItem("token")) {
                if (from.path !== to.path) {
                    initMenu(router, store);
                }
                next();
            } else {
                //  next("/?redirect=" + to.path);
                next('/');
            }
        }
    }),

    new Vue({
        router,
        store,
        render: h => h(App)
    }).$mount("#app");