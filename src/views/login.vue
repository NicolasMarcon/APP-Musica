<template>
    <div class="login">
        <h1>Login</h1>
        <div class="login-container">
            <div class="login-input-group">
                <input type="email" placeholder="EMAIL" v-model="user.email" />
                <input type="password" placeholder="SENHA" v-model="user.password" />
            </div>
            <div class="login-btn-group">
                <button class="login-btn" @click="LOGIN">LOGIN</button>
                <button class="login-btn" @click="LIMPAR">LIMPAR</button>
                <button class="login-btn" @click="ADMIN">ADMIN</button>
            </div>
        </div>
    </div>
</template>

<script>
import * as fb from "../firebase.js";
export default {
    data() {
        return {
            user: {},
            uid: "",
        };
    },
    methods: {
        async LOGIN() {
            try {
                await fb.auth.signInWithEmailAndPassword(this.user.email, this.user.password);
                this.uid = fb.auth.currentUser.uid;
                this.CRIAR_PERFIL();
                this.$router.push({name: "home"});
            } catch (error) {
                const errorCode = error.code;
                switch (errorCode) {
                    case "auth/wrong-password":
                        alert("erro");
                        this.LIMPAR();
                        break;
                    case "auth/invalid-email":
                        alert("erro");
                        this.LIMPAR();
                        break;
                    case "auth/user-not-found":
                        this.CRIAR_NOVA_CONTA();
                        break;
                    default:
                        alert("erro");
                        break;
                }
            }
        },
        async CRIAR_NOVA_CONTA() {
            await fb.auth.createUserWithEmailAndPassword(this.user.email, this.user.password);

            this.LOGIN();
        },

        async CRIAR_PERFIL() {
            await fb.DB_PERFILS.add({uid: this.uid, email: this.user.email});
        },

        LIMPAR() {
            this.user = {};
        },
        ADMIN() {
            this.$router.push({name: "painel"});
        },
    },
};
</script>

<style scoped>
body {
    font-family: Arial, Helvetica, sans-serif;
    margin: 0;
}
.login-btn {
    height: 40px;
    width: 75px;
    padding: 2px;
    border: solid 0;
    border-radius: 5px;
    color: white;
    background-color: cornflowerblue;
    transition-duration: 0.5s;
}
input {
    padding: 10px;
    outline: none;
    border: solid 1px;
    margin: 10px;
}
.login-btn:hover {
    background-color: rgb(60, 128, 255);
    cursor: pointer;
}
.login {
    height: 90vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
}
.login-container {
    padding: 10px;
    border-radius: 5px;
    background-color: rgba(238, 238, 238, 0.521);
    margin: auto;
    height: 300px;
    width: 500px;
    box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.45);
}

.login-input-group {
    display: flex;
    flex-direction: column;
    padding: 10px;
}
.login-btn-group {
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    padding: 10px;
}
</style>
