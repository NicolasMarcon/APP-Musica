<template>
    <div class="user">
        <div class="sidebar">
            <router-link v-for="i of sidebar" :key="i.to" :to="i.to" class="sidebar-item">
                <font-awesome-icon :icon="i.icon" class="sidebar-icon" />
                <div class="sidebar-title">{{ i.title }}</div>
            </router-link>
        </div>

        <router-view class="main"></router-view>
    </div>
</template>

<script>
export default {
    data() {
        return {
            sidebar: [
                {
                    icon: "home",
                    to: "/home",
                    title: "HOME",
                },
                {
                    icon: "music",
                    to: "/biblioteca",
                    title: "BIBLIOTECA",
                },
                {
                    icon: "user",
                    to: "/perfil",
                    title: "PERFIL",
                },
                {
                    icon: "sign-out-alt",
                    to: "/login",
                    title: "SAIR",
                },
            ],
        };
    },
};
</script>

<style>
body {
    margin: 0;
    font-family: Arial, Helvetica, sans-serif;
}
.user {
    display: flex;
    flex-direction: row;
}
.main {
    /* border: solid 1px; */
    padding: 25px;
    width: 100%;
}
.sidebar {
    background-color: rgba(212, 212, 212, 0.247);
    display: flex;
    flex-direction: column;

    height: 100vh;
    width: 250px;
}
.sidebar-item {
    display: flex;
    flex-direction: row;

    text-decoration: none;
    color: black;
    font-weight: bold;
    padding: 25px;
    transition-duration: 0.5s;
}
.sidebar-item:hover {
    background-color: rgb(235, 233, 233);
}
.sidebar-icon {
    font-size: 1.3rem;
}
.sidebar-title {
    margin: 5px;
    margin-left: 10px;
}
</style>
