import firebase from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyBSbLl5XpLNs2CIgkabi79qB3Y4upBiM8g",
    authDomain: "brithday-2d065.firebaseapp.com",
    databaseURL: "https://brithday-2d065-default-rtdb.firebaseio.com",
    projectId: "brithday-2d065",
    storageBucket: "brithday-2d065.appspot.com",
    messagingSenderId: "902022675699",
    appId: "1:902022675699:web:905943da773d119bbccb86"
}; 

export default firebase.initializeApp( firebaseConfig )