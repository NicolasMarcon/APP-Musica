import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDnwRAXhk7DCM3o3fMkKExvGcYzuaXcOjI",
    authDomain: "spotifyclone-d8ad0.firebaseapp.com",
    projectId: "spotifyclone-d8ad0",
    storageBucket: "spotifyclone-d8ad0.appspot.com",
    messagingSenderId: "928714495255",
    appId: "1:928714495255:web:d5d77b6630f2316b7f1352",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

const DB_PERFILS = db.collection("perfils");
const DB_MUSICAS = db.collection("musicas");
const DB_BIBLIOTECA = db.collection("biblioteca");
const DB_CONFIGURACOES = db.collection("configurações");

export {db, auth, DB_PERFILS, DB_MUSICAS, DB_BIBLIOTECA, DB_CONFIGURACOES};
