let proxyObj = {};
proxyObj["/ws"] = {
    ws: true,
    target: "ws://localhost:8081"
};
proxyObj["/"] = {
    ws: false,
    // 配置自己的后台地址和端口
    target: "http://192.168.0.153:8888",
    changeOrigin: true,
    pathRewrite: {
        "^/": ""
    }
};
module.exports = {
    lintOnSave: "warning",
    devServer: {
        port: 8088,
        open: true,
        proxy: proxyObj
    }
};