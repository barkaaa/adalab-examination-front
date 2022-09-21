const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    devServer: {
        proxy: {
            '/api':{
                target:'http://localhost:9000',
                changeOrigin:true,
                ws:true,
                pathRewrite: {'^/api' : ''}
            }
        },
        port: 8001
    },
    transpileDependencies: true,
    lintOnSave: false
})
