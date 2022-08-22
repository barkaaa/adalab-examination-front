import Home from "@/views/Home";
import Login from "@/views/Login";
import {createRouter, createWebHashHistory} from "vue-router"

const routes = [
    {
        path: "/login",
        name: "login",
        component: Login
    }, {
        path: "/home",
        name: "home",
        component: Home
    },
]
const router = createRouter({
    routes, history: createWebHashHistory(),
})
export default router