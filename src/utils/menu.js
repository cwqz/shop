// get请求
import { getRequest } from "./request";

export const initMenu = (router, store) => {
    if (store.state.routes.length > 0) {
        return;
    }
    // 获取动态路由
    getRequest("/user/menu").then(resp => {
        if (resp) {
            let fmtRoutes = formatRoutes(resp.data);
            router.addRoutes(fmtRoutes);
            store.commit('initRoutes', fmtRoutes);
        }
    });
   
};
export const formatRoutes = (routes) => {
    let fmRoutes = [];
    // 后台数据
    routes.forEach(router => {
        let {
            id,
            path,
            iconCls,
            keepAlive,
            children,
            name,
            component,
        } = router;
        if (children && children instanceof Array) {
            children = formatRoutes(children);
        }
        // 前端路由
        let fmRouter = {
            index: id,
            path: path,
            name: name,
            icon: iconCls,
            children: children,
            active: keepAlive,
            component(resolve) {
                require([`@/views/${component}`], resolve);
            },
        };
        fmRoutes.push(fmRouter);
    });
    return fmRoutes;
};