<template>
    <div>
        <h1>HOME</h1>
        <hr />
        <div class="player">
            <div v-for="(musica, index) of musicas" :key="musica.id" class="song">
                <div class="index">{{ index + 1 }}</div>
                <button @click="PLAY(index)" class="icon-btn"><font-awesome-icon icon="play" /></button>
                <div class="info">
                    <div class="song-title">
                        {{ musica.nome }}
                    </div>
                    <div class="sub-info">
                        <div class="song-album">{{ musica.album }}</div>
                        <div class="song-artist">{{ musica.artista }}</div>
                    </div>
                </div>
                <button @click="ADICIONAR_BIBLIOTECA(musica)" class="icon-btn"><font-awesome-icon icon="heart" /></button>
            </div>
        </div>
        <div class="bottom">
            <div class="display">
                <div class="display-name">{{ musica_atual.nome }}</div>
                <div class="display-artist">{{ musica_atual.artista }}</div>
                {{ musica_atual.album }}
            </div>
            <div class="control">
                <button @click="VOLTAR" class="control-btn"><font-awesome-icon icon="backward" /></button>
                <button @click="PAUSAR" class="control-btn"><font-awesome-icon icon="pause" /></button>
                <button @click="AVANCAR" class="control-btn"><font-awesome-icon icon="forward" /></button>
            </div>
        </div>
    </div>
</template>

<script>
import * as fb from "../firebase";
export default {
    data() {
        return {
            musicas: [],
            musica_atual: {},
            fila: 0,
            uid: "",
        };
    },
    mounted() {
        this.uid = fb.auth.currentUser.uid;
        this.LISTAR_MUSICAS();
    },
    methods: {
        PLAY(index) {
            this.musica_atual = {
                nome: this.musicas[index].nome,
                artista: this.musicas[index].artista,
                album: this.musicas[index.artista],
            };

            this.fila = index;
        },
        VOLTAR() {
            this.fila--;
            if (this.fila == -1) {
                this.fila = this.musicas.length - 1;
            }
            this.musica_atual = {
                nome: this.musicas[this.fila].nome,
                artista: this.musicas[this.fila].artista,
                album: this.musicas[this.fila.artista],
            };
        },
        AVANCAR() {
            this.fila++;
            if (this.fila == this.musicas.length) {
                this.fila = 0;
            }
            this.musica_atual = {
                nome: this.musicas[this.fila].nome,
                artista: this.musicas[this.fila].artista,
                album: this.musicas[this.fila.artista],
            };
        },
        PAUSAR() {},

        async LISTAR_MUSICAS() {
            this.musicas = [];
            const MUSICAS = await fb.DB_MUSICAS.where("owner", "==", "MUSIC_SERVER").get();
            for (const doc of MUSICAS.docs) {
                this.musicas.push({
                    artista: doc.data().artista,
                    nome: doc.data().nome,
                    album: doc.data().album,
                    data: doc.data().data,
                    genero: doc.data().genero,
                    id: doc.id,
                });
            }
        },

        async ADICIONAR_BIBLIOTECA(musica) {
            await fb.DB_BIBLIOTECA.add({
                artista: musica.artista,
                nome: musica.nome,
                album: musica.album,
                data: musica.data,
                genero: musica.genero,
                explicito: false,
                id: musica.id,
                owner: this.uid,
            });
        },
    },
    computed: {},
};
</script>

<style>
body {
    font-family: Arial, Helvetica, sans-serif;
}

.song {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 2px;
    padding: 10px;
    background-color: rgba(212, 212, 212, 0.247);
    transition-duration: 0.5s;
}
.song:hover {
    background-color: rgba(255, 255, 255, 0.247);
}
.index {
    font-size: 3rem;
}
.info {
    display: flex;
    flex-direction: column;
    margin-right: auto;
    margin-left: 50px;
}
.song-title {
    font-weight: bolder;
    width: 100%;
}
.icon-btn {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: white;
    border: none;

    transition-duration: 0.5s;
}
.icon-btn:hover {
    background-color: rgb(247, 247, 247);
}
</style>
