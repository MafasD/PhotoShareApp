//This is the Login screen, which uses the login method from authorization.js
import React, { useEffect } from 'react';
import { View, Button, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Authorization from '../auth/authorization';

const LoginScreen = () => {
  const navigation = useNavigation();

//This disables the device's "back" button for login and register screens.
useEffect(() => {
  const backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    () => {
      return true; 
    }
  );
  return () => backHandler.remove();
  }, []);

  return (
    <View>
      <Authorization isRegistration={false} />
      <Button
        title="Create an account"
        onPress={() => navigation.navigate('Registration')}
      />
    </View>
  );
};

export default LoginScreen;
