import React from 'react';
import { View } from 'react-native';
import Authorization from './authorization';
import useAuthState from './userAuthState';
import { useNavigation } from '@react-navigation/native';

const AuthCheck = () => {
  const user = useAuthState(); //Taking the auth status of user from useAuthState
  const navigation = useNavigation(); //Initializing the navigation object

  //Checking if user is authenticated and navigating to homescreen if true
  if (user) {
    navigation.navigate('Home');
  }

  return (
    //If user is logged in, this will render null and nothing changes, 
    //if user is logged out, it will render the authorization file(login/registration screen)
    <View>
      {user ? null : <Authorization />}
    </View>
  );
};

export default AuthCheck;
