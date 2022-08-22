import Challenge from "@/views/Challenge";
import Login from "@/views/Login";
import {createRouter, createWebHashHistory} from "vue-router"

const routes = [
    {
        path: "/login",
        name: "login",
        component: Login
    }, {
        path: "/challenge",
        name: "Challenge",
        component: Challenge
    },
]
const router = createRouter({
    routes, history: createWebHashHistory(),
})
export default router