import firebase from 'firebase/app';
import 'firebase/auth';

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyCmYBxE4FZlbXewyGIn6xuoovgiSt_GWlo",
    authDomain: "let-s-chat-88a97.firebaseapp.com",
    projectId: "let-s-chat-88a97",
    storageBucket: "let-s-chat-88a97.appspot.com",
    messagingSenderId: "445172591999",
    appId: "1:445172591999:web:2897d5d64aa8d9a5057e4a"
  }).auth();