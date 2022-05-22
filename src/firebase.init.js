// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_apiKey,
//     authDomain: process.env.REACT_APP_authDomain,
//     projectId: process.env.REACT_APP_projectId,
//     storageBucket: process.env.REACT_APP_storageBucket,
//     messagingSenderId: process.env.REACT_APP_messagingSenderId,
//     appId: process.env.REACT_APP_appId,
//     measurementId: process.env.REACT_APP_measurementId,
// };

const firebaseConfig = {
    apiKey: "AIzaSyD9nCCahjKBirrXSz7ZIliOGI4EF1gXHe4",
    authDomain: "electool-84d55.firebaseapp.com",
    projectId: "electool-84d55",
    storageBucket: "electool-84d55.appspot.com",
    messagingSenderId: "109338995255",
    appId: "1:109338995255:web:cab66d9565ce2768772db2",
    measurementId: "G-9RLF9HVMD4"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export default auth;