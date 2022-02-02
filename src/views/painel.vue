<template>
    <div class="app">
        <div class="add">
            <input type="text" placeholder="Nome da musica" v-model="musica.nome" />
            <input type="text" placeholder="Artista" v-model="musica.artista" />
            <input type="text" placeholder="Álbum" v-model="musica.album" />
            <input type="text" placeholder="Data de lançamento" v-model="musica.data" />
            <input type="text" placeholder="Gênero" v-model="musica.genero" />
            <input type="checkbox" v-model="musica.explicito" /> <span>MARCAR COMO EXPLICITO</span>
        </div>
        <div class="btn-group">
            <button @click="ADICIONAR_MUSICA">ADICIONAR</button>
        </div>

        <div class="player">
            <div v-for="(musica, index) of musicas" :key="musica.id" class="song">
                <h2 class="index">
                    {{ index }}
                </h2>
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
                <button @click="DELETAR_DA_BIBLIOTECA(musica.id)" class="icon-btn"><font-awesome-icon icon="trash" /></button>
            </div>
        </div>
    </div>
</template>

<script>
import * as fb from "../firebase";
export default {
    data() {
        return {
            musica: {explicito: false},
            musicas: [],
        };
    },
    mounted() {
        this.LISTAR_MUSICAS();
    },
    methods: {
        async ADICIONAR_MUSICA() {
            await fb.DB_MUSICAS.add({
                artista: this.musica.artista,
                nome: this.musica.nome,
                album: this.musica.album,
                data: this.musica.data,
                genero: this.musica.genero,
                explicito: this.musica.explicito,
                owner: "MUSIC_SERVER",
            });
            this.LISTAR_MUSICAS();
        },
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
                    explicito: doc.data().explicito,
                    id: doc.id,
                });
            }
        },
        async DELETAR_DA_BIBLIOTECA(idd) {
            await fb.DB_MUSICAS.doc(idd).delete();
            this.LISTAR_MUSICAS();
        },
    },
};
</script>

<style>
body {
    font-family: Arial, Helvetica, sans-serif;
}
.add {
    display: flex;
    justify-content: space-around;
    padding: 30px;
}

.song {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    padding: 10px;
}
.info {
    display: flex;
    flex-direction: column;
    margin-right: auto;
    margin-left: 50px;
}
.song-title {
    border: solid 1px;
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
