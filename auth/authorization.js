//This is the authorization file, which is currently used for login and register methods.

import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import auth from '@react-native-firebase/auth';

const Authorization = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register = async () => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      console.log('User registered successfully!');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const login = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      console.log('User logged in successfully!');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Register" onPress={register} />
      <Button title="Login" onPress={login} />
    </View>
  );
};

export default Authorization;
