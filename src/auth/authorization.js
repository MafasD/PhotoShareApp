//This is the file with authentication methods (register, login, logout)
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import auth from '@react-native-firebase/auth';

const Authorization = () => {
  //Initializing state variables for managing email and password input fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  //Register function, maybe should make a separate file/screen for it later
  const register = async () => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      console.log('User registered successfully!');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };
  
  //Login function
  const login = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      console.log('User logged in successfully!');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  //UI for the register and login functions
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

//Logout function
export async function logout() {
  try {
    await auth().signOut();
    console.log('User logged out successfully!');
  } catch (error) {
    console.error('Logout error:', error);
  }
}


export default Authorization;

