import Challenge from "@/views/Challenge";
import Login from "@/views/Login";
import CommonChallengem from "@/views/CommonChallenge";
import MarkdownChallenge from "@/views/MarkdownChallenge";
import Ranking from "@/views/Ranking";
import Student from "@/views/StudentLogin";
import {createRouter, createWebHistory} from "vue-router";
import RankingKai from "./hubaba/RankingKai.vue";
import UserManagement from "@/hubaba/UserManagement";
import Test1 from "@/hubaba/TestOne";
import BackTemplate from "@/hubaba/BackTemplate";
import TestTwo from "@/hubaba/TestTwo";
import MarkdownEdit from "@/hubaba/MarkdownEdit";

const routes = [
    {
        path: "/",
        redirect: "/login",
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/student",
        name: "StudentLogin",
        component: Student,
    },
    {
        path: "/ranking",
        name: "Ranking",
        component: Ranking,
    },
    {
        path: "/challenge",
        name: "Challenge",
        component: Challenge,
        redirect: "/challenge/common",
        children: [
            {
                path: "common",
                component: CommonChallengem,
            },
            {
                path: "markdown",
                component: MarkdownChallenge,
            },
        ],
    }, {
        path: "/backpanel",
        component: BackTemplate,
        children: [{
            path: "two", component: TestTwo
        }, {
            name: "mdedit",
            path: "mdedit", component: MarkdownEdit
        }]
    }
    ,
    {
        path: "/userManagement",
        name: "userManagement",
        component: UserManagement,
    },
    {
        path: "/mission",
        name: "mission",
        component: Test1,
    },
    {
        path: "/rankingkai",
        name: "rankingkai",
        component: RankingKai,
    },
];
const router = createRouter({
    routes,
    history: createWebHistory(),
});
export default router;
