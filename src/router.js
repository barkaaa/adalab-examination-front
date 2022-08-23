import Challenge from "@/views/Challenge";
import Login from "@/views/Login";
import CommonChallengem from "@/views/CommonChallenge";
import MarkdownChallenge from "@/views/MarkdownChallenge";
import Ranking from "@/views/Ranking"
import {createRouter, createWebHashHistory} from "vue-router"
import BackTemplateVue from "@/hubaba/BackTemplate";

const routes = [
    {
        path: "/login",
        name: "login",
        component: Login
    },{
        path: "/ranking",
        name: "Ranking",
         component: Ranking
    },{
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
    },{
        path: "/backTemplate",
        name: "BackTemplate",
        component: BackTemplateVue
    },
]
const router = createRouter({
    routes, history: createWebHashHistory(),
})
export default router