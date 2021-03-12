import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
     //公共首页
     {
        path: "/",
        name: "publicHome",
        component: () =>
            import ("@/views/publicHome.vue"),
        hidden:true,
     },
    // 登录
    {
        path: "/login",
        name: "login",
        component: () =>
            import ("@/views/login.vue"),
        hidden: true
    },
    // 注册
    {
        path: "/register",
        name: "register",
        component: () =>
            import ("@/views/register.vue"),
        hidden: true
    },
    // 房间详情 
    {
        path:"/houseDetails",
        name:"houseDetails",
        component:() => 
            import ("@/views/houseDetails.vue"),
        hidden:true
    },
    // 个人中心 
    {
        path:"/personalCenter",
        name:"personalCenter",
        component:() => 
            import ("@/views/config/personalCenter.vue"),
        hidden:true
    }
    
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;