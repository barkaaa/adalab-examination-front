import {defineStore} from "pinia"

export const useChallengeStore = defineStore('challenge', {
    // 其它配置项
    state: () => {
        return {
            cur: 1
        }
    },
})