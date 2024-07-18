import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBmCRpwyyhA5Ft0NCnSlD9qWH20_HX2wuE",
  authDomain: "lista-facil-app.firebaseapp.com",
  projectId: "lista-facil-app",
  storageBucket: "lista-facil-app.appspot.com",
  messagingSenderId: "263407488278",
  appId: "1:263407488278:web:b6be50d6799a525331d437"
};

// app => objeto com todas as configurações do firebase
export const app = initializeApp(firebaseConfig);
// auth => objeto com as configurações de authentication
export const auth = getAuth(app);
// db => objeto com as configurações do firestore
export const db = getFirestore(app);