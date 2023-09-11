import { initializeApp } from 'firebase/app';

//These are configurations from the Firebase project
const firebaseConfig = {
    apiKey: 'AIzaSyDkPew4JZtpVtMSe80P_Z5chEVSkwvaPaE',
    authDomain: 'photoshare-8f5a9.firebaseapp.com',
    projectId: 'photoshare-8f5a9',
    storageBucket: 'photoshare-8f5a9.appspot.com',
    messagingSenderId: '68556638110',
    appId: '1:68556638110:android:8175e7b6c7bcc5de13f88f',
  };

//Initializing Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
