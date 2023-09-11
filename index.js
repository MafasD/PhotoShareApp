import React from 'react';
import { AppRegistry } from 'react-native';
import Authorization from './auth/authorization'; //Here we import the main component of the app, in this case authorization component
import firebaseApp from './firebaseConfig'; //Here we import the Firebase configuration file

const PhotoShareApp = () => {
    //Probably will add more stuff here later
    return <Authorization />;
  };
  
  AppRegistry.registerComponent('PhotoShareApp', () => PhotoShareApp);