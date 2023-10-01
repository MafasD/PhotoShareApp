//This is the Registration screen, which uses the register method from authorization.js
import React from 'react';
import { View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Authorization from '../auth/authorization';

const RegisterScreen = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Authorization isRegistration={true} />
      <Button
        title="Already have an account? -> Login"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};

export default RegisterScreen;
