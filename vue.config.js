const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    devServer: {
        proxy: {
            '/api':{
                target:'http://localhost:9080',
                changeOrigin:true,
                ws:true,
            }
        },
        port: 9000
    },
    transpileDependencies: true,
    lintOnSave: false
})
