import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    // 登录
    {
        path: "/",
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
    
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;