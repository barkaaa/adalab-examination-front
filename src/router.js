import Home from "@/views/Home";
import Login from "@/views/Login";

import Ranking from "@/views/Ranking";
import Student from "@/views/StudentLogin";
import {createRouter, createWebHistory} from "vue-router";
import RankingKai from "./hubaba/RankingKai.vue";
import UserManagement from "@/hubaba/UserManagement";
import Test1 from "@/hubaba/TestOne";
import BackTemplate from "@/hubaba/BackTemplate";
import image from "@/hubaba/imageManager";
import TestTwo from "@/hubaba/TestTwo";
import MarkdownEdit from "@/hubaba/MarkdownEdit";
import Test from "@/components/episodeMaker"
import Challenge from "@/views/Challenge";
import Success from "@/components/Success";

const routes = [
    {
        path: "/",
        redirect: "/login",
    },
    {
        path: "/success",
        component: Success
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
        path: "/home",
        name: "Home",
        component: Home,
        redirect: "/home/challenge",
        children: [
            {
                path: "challenge",
                component: Challenge,
            },
        ],
    }, {
        path: "/backpanel",
        component: BackTemplate,
        children: [{
            path: "two", component: TestTwo
        },
            {
                path: "mission",
                name: "mission",
                component: Test1,
            }, {
                name: "mdedit",
                path: "mdedit", component: MarkdownEdit
            }, {
                path: "test",
                name: "test",
                component: Test,
            },
            {
                path: "userManagement",
                name: "userManagement",
                component: UserManagement,
            },
            {
                path: "rankingkai",
                name: "rankingkai",
                component: RankingKai,
            },{
                path: "image",
                name: "image",
                component: image,
            }]
    }
    ,

];
const router = createRouter({
    routes,
    history: createWebHistory(),
});
export default router;
