import Vue from "vue";
import VueRouter from "vue-router";
import {auth} from "./firebase";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        component: () => import("./layouts/user"),
        meta: {
            requiresAuth: true,
        },
        children: [
            {
                path: "home",
                name: "home",
                component: () => import("./views/home.vue"),
            },
            {
                path: "/perfil",
                name: "perfil",
                component: () => import("./views/perfil.vue"),
            },
            {
                path: "/biblioteca",
                name: "biblioteca",
                component: () => import("./views/biblioteca.vue"),
            },
        ],
    },
    {
        path: "/",
        component: () => import("./layouts/admin"),
        children: [
            {
                path: "/painel",
                name: "painel",
                component: () => import("./views/painel.vue"),
            },
        ],
    },
    {
        path: "/",
        component: () => import("./layouts/blank"),
        children: [
            {
                path: "/login",
                name: "login",
                component: () => import("./views/login.vue"),
            },
        ],
    },
];
const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);

    if (requiresAuth && !auth.currentUser) {
        next("/login");
    } else {
        next();
    }
});

export default router;
