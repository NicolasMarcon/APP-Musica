<template>
    <div class="biblioteca">
        <h2>BIBLIOTECA</h2>
        <hr />
        <div class="player">
            <div v-for="(musica, index) of biblioteca" :key="musica.id" class="song">
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
            biblioteca: [],
            musica_atual: {},
            configs: {},
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
                nome: this.biblioteca[index].nome,
                artista: this.biblioteca[index].artista,
                album: this.biblioteca[index.artista],
            };

            this.fila = index;
        },
        VOLTAR() {
            this.fila--;
            if (this.fila == -1) {
                this.fila = this.biblioteca.length - 1;
            }
            if (this.configs.explicit == true && this.musica_atual.explicito == true) {
                this.fila--;
            }
            this.musica_atual = {
                nome: this.biblioteca[this.fila].nome,
                artista: this.biblioteca[this.fila].artista,
                album: this.biblioteca[this.fila.artista],
            };
        },
        AVANCAR() {
            this.fila++;
            if (this.fila == this.biblioteca.length) {
                this.fila = 0;
            }
            if (this.configs.explicit == true && this.musica_atual.explicito == true) {
                this.fila++;
            }
            this.musica_atual = {
                nome: this.biblioteca[this.fila].nome,
                artista: this.biblioteca[this.fila].artista,
                album: this.biblioteca[this.fila.artista],
            };
        },
        PAUSAR() {},
        async LISTAR_MUSICAS() {
            this.biblioteca = [];
            const BIBLIOTECA = await fb.DB_BIBLIOTECA.where("owner", "==", this.uid).get();
            for (const doc of BIBLIOTECA.docs) {
                this.biblioteca.push({
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
            await fb.DB_BIBLIOTECA.doc(idd).delete();
            this.LISTAR_MUSICAS();
        },
    },
};
</script>

<style>
.bottom {
    position: fixed;
    display: flex;
    flex-direction: column;
    bottom: 0;
    right: 40%;

    display: flex;
}

.control-btn {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: white;
    border: none;
    font-size: 2rem;

    transition-duration: 0.5s;
}
.control-btn:hover {
    background-color: rgba(212, 212, 212, 0.87);
}
.display-name {
    font-weight: bolder;
    text-align: center;
}
.display-artist {
    font-weight: lighter;
    text-align: center;
}
</style>
