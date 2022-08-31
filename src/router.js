import Home from "@/views/Home";
import Login from "@/views/Login";

import Ranking from "@/views/Ranking";
import Student from "@/views/StudentLogin";
import {createRouter, createWebHistory} from "vue-router";
import RankingKai from "./backPanel/RankingList.vue";
import UserManagement from "@/backPanel/UserManagement";
import CommonEdit from "@/backPanel/CommonEdit";
import BackTemplate from "@/backPanel/BackTemplate";
import image from "@/backPanel/imageManager";
import MissionManagement from "./backPanel/MissionManagement";
import MarkdownEdit from "@/backPanel/MarkdownEdit";
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
        redirect: "/backpanel/rankingkai",
        children: [{
            path: "challengeSetting", component: MissionManagement
        },
            {
                path: "mission",
                name: "mission",
                component: CommonEdit,
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
