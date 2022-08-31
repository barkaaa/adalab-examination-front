import Home from "@/views/Home";
import Login from "@/views/Login";

import Ranking from "@/views/Ranking";
import Student from "@/views/StudentLogin";
import {createRouter, createWebHistory} from "vue-router";
import RankingList from "./backPanel/RankingList.vue";
import UserManagement from "@/backPanel/UserManagement";
import CommonEdit from "@/backPanel/CommonEdit";
import BackTemplate from "@/backPanel/BackTemplate";
import image from "@/backPanel/imageManager";
import MissionManagement from "./backPanel/MissionManagement";
import MarkdownEdit from "@/backPanel/MarkdownEdit";
import Test from "@/components/episodeMaker"
import Challenge from "@/views/Challenge";
import Success from "@/components/Success";
import YAYTest from "@/components/popOver"

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
        path: "/setRepo",
        name: "setRepo",
        component: YAYTest,
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
        redirect: "/backpanel/rankingList",
        children: [{
            path: "missionManagement", component: MissionManagement
        },
            {
                path: "cmedit",
                name: "cmedit",
                component: CommonEdit,
            }, {
                name: "mdedit",
                path: "mdedit",
                component: MarkdownEdit
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
                path: "rankingList",
                name: "rankingList",
                component: RankingList,
            }, {
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
