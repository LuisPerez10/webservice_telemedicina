importScripts('https://www.gstatic.com/firebasejs/8.9.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.9.1/firebase-messaging.js');
// importScripts('https://www.gstatic.com/firebasejs/8.9.1/firebase-analytics.js');
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyCd4lZjWAeRDkToMpGZBKFiXrjbZEPF3OI",
    authDomain: "topicos-telemedicina.firebaseapp.com",
    projectId: "topicos-telemedicina",
    storageBucket: "topicos-telemedicina.appspot.com",
    messagingSenderId: "439041510953",
    appId: "1:439041510953:web:980a811698fc23b204d638",
    measurementId: "G-M3QLRZQVVB"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

const messaging = firebase.messaging();