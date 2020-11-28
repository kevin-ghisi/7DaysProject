import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyD4nvUvlYzyLBpwa58GDQGWMM5rgyuwkCg",
    authDomain: "days-55d07.firebaseapp.com",
    databaseURL: "https://days-55d07.firebaseio.com",
    projectId: "days-55d07",
    storageBucket: "days-55d07.appspot.com",
    messagingSenderId: "202178166416",
    appId: "1:202178166416:web:8b67a9d53713db63692215"
};

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire;