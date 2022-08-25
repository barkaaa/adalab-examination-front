const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    devServer: {
        proxy: {
            '/api':{
                target:'http://localhost:8080',
                changeOrigin:true,
                ws:true,
            }
        },
        port: 8001
    },
    transpileDependencies: true,
    lintOnSave: false
})
