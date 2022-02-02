<template>
    <div>
        <h2>PERFIL</h2>
        <hr />
        <div class="profile-form">
            <input type="name" placeholder="NOME " v-model="nome" class="input-profile" />
            <input type="email" placeholder="EMAIL" v-model="email" class="input-profile" />
        </div>

        <div class="profile-options">
            <button @click="SALVAR_PERFIL" class="login-btn">SALVAR</button>
            <button @click="SAIR" class="login-btn">SAIR</button>
        </div>
    </div>
</template>

<script>
import * as fb from "../firebase";
export default {
    data() {
        return {
            nome: "",
            email: "",
            uid: "",
            temPerfil: false,
        };
    },
    mounted() {
        this.uid = fb.auth.currentUser.uid;
        this.BUSCAR_PERFIL();
    },
    methods: {
        async BUSCAR_PERFIL() {
            const PERFIL = await fb.DB_PERFILS.where("uid", "==", this.uid).get();
            if (PERFIL.docs.length > 0) {
                this.temPerfil = true;
                const perfil = PERFIL.docs[0];
                this.profileId = perfil.id;

                this.nome = perfil.data().nome;
                this.email = perfil.data().email;
            }
        },

        async SALVAR_PERFIL() {
            if (this.temPerfil) {
                await fb.DB_PERFILS.doc(this.profileId).update({
                    nome: this.nome,
                    email: this.email,
                });
            } else {
                await fb.DB_PERFILS.add({
                    uid: this.uid,
                    nome: this.nome,
                    email: this.email,
                });
            }
        },
        SAIR() {
            this.$router.push({name: "login"});
        },
    },
};
</script>

<style>
.profile-options {
    display: flex;
    width: 500px;
    justify-content: space-around;
}
.profile-form {
    width: 500px;
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
.input-profile {
    padding: 10px;
    outline: none;
    border: solid 1px;
    margin: 10px;
    width: 100%;
}
.login-btn:hover {
    background-color: rgb(60, 128, 255);
    cursor: pointer;
}
</style>
