import Challenge from "@/views/Challenge";
import Login from "@/views/Login";
import CommonChallengem from "@/views/CommonChallenge";
import MarkdownChallenge from "@/views/MarkdownChallenge";
import {createRouter, createWebHashHistory} from "vue-router"

const routes = [
    {
        path: "/login",
        name: "login",
        component: Login
    },
    {
        path: "/challenge",
        name: "Challenge",
        component: Challenge,
        // redirect:"/challenge/common",
        children: [
            {
                path: 'common',
                component: CommonChallengem,
            },
            {
                path: 'markdown',
                component: MarkdownChallenge,
            },
        ],
    },
]
const router = createRouter({
    routes, history: createWebHashHistory(),
})
export default router